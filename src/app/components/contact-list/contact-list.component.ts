import { Subject, BehaviorSubject, bindCallback } from 'rxjs';
import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  filteredContacts: Contact[] = [];
  contacts: Contact[] = [];
  contactsLoading: boolean;
  filter: string;
  currentSort = null;
  sortOptions = [
    {
      label: "First Name",
      field: "name.first",
      direction: null
    },
    {
      label: "Last Name",
      field: "name.last",
      direction: null
    }
  ];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.Contacts.subscribe(contacts => {
      this.contacts = contacts;
      this.filterContacts();
    });
    this.contactService.contactsLoading.subscribe(isLoading => {
      this.contactsLoading = isLoading;
    });
  }

  filterContacts() {
    let local: Contact[] = [];
    if (!this.filter || !this.contacts || this.contacts.length  === 0) {
      local = Array.from(this.contacts);
    } else {
      local = this.contacts.filter(p => {
        return JSON.stringify(p).toLowerCase()
        .indexOf(this.filter.toLowerCase()) > -1;
      });
    }

    if (this.currentSort) {
      local = local.sort((a, b) => {
        const aVal = this.currentSort.field.split('.').reduce((p, prop) => {
          return p[prop];
        }, a).toUpperCase();
        const bVal = this.currentSort.field.split('.').reduce((p, prop) => {
          return p[prop];
        }, b).toUpperCase();

        const res = aVal > bVal ? 1 :
          aVal < bVal ? -1 :
          0;
        return res * (this.currentSort.direction === true ? 1 : this.currentSort.direction === false ? -1 : 0);
      });
    }

    this.filteredContacts = local;
  }
  sortContacts(sort: any) {
    this.sortOptions.filter(p => p.field !== sort.field).forEach(p => p.direction = null);
    switch (sort.direction) {
      case true:
        sort.direction = false;
        break;
      case false:
        sort.direction = null;
        break;
      default:
        sort.direction = true;
        break;
    }
    if (sort.direction !== null){
      this.currentSort = sort;
    } else {
      this.currentSort = null;
    }
    this.filterContacts();
  }
}
