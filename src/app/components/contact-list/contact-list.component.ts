import { Subject, BehaviorSubject } from 'rxjs';
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
  filter: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.Contacts.subscribe(contacts => {
      this.contacts = contacts;
      this.filterContacts();
    });
  }

  filterContacts() {
    if (!this.filter || !this.contacts || this.contacts.length  === 0) {
      this.filteredContacts = this.contacts;
      return;
    }
    const local = this.contacts.filter(p => {
      return JSON.stringify(p.name).toLowerCase()
        .indexOf(this.filter.toLowerCase()) > -1;
    });
    this.filteredContacts = local;
  }
}
