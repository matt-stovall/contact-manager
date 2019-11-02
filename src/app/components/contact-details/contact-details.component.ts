import { LookupService } from './../../services/lookup.service';
import { Contact } from './../../model/contact';
import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contactEmail: string;
  contact: Contact;
  originalContact: Contact;
  isCreating: boolean;
  isEditing: boolean;
  isSaving: boolean;
  stateList: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private location: Location,
    private lookupService: LookupService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.contactId === 'create') {
        this.contact = new Contact();
        this.isCreating = true;
        this.isEditing = true;
      } else {
        this.getContactByEmail(params.contactId);
      }
    });
    this.stateList = this.lookupService.getStateList();
  }

  getContactByEmail(email: string) {
    this.contactEmail = email;
    console.log(email);
    if (this.contactEmail) {
      this.originalContact = this.contactService
        .getContactByEmail(this.contactEmail);
      if (this.originalContact) {
        this.setContactToOriginal();
      }
    }
  }

  setContactToOriginal() {
    this.contact = this.originalContact.getCopy();
    console.dir(this.contact);
  }

  cancelEdit() {
    if (this.isCreating) {
      this.location.back();
    } else {
      this.isEditing = false;
      this.setContactToOriginal();
    }
  }
  startEdit() {
    this.isEditing = true;
  }

  saveContact() {
    this.isSaving = true;
    const originalEmail = this.originalContact && this.originalContact.email;
    this.contactService.updateContact(originalEmail, this.contact).then(res => {
      if (originalEmail !== res.email) {
        // if this is true, then we've updated the email - it's the closest we have to a primary key,
        // but it can still change so we have to account for those changes - easiest way is to reload the page
        // with the correct value
        this.router.navigate(['contacts', res.email], {
          skipLocationChange: true // make it tougher to navigate back to a now-nonexistent url
        });
      } else {
        console.log(2);
        this.getContactByEmail(res.email);
      }
      this.isEditing = false;
      this.isSaving = false;
    });
  }


}
