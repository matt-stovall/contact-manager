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
  isDeleting: boolean;
  isEditing: boolean;
  isSaving: boolean;
  stateList: string[];
  validationErrors: string[];

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

  isValid(): boolean{
    this.validationErrors = [];
    let res = true;

    if (!this.contact.email) {
      res = false;
      this.validationErrors.push('Contact must have an email.');
    }
    if (!this.contactService.isEmailUnique(this.contact.email)) {
      res = false;
      this.validationErrors.push(`Email must be unique - ${this.contact.email} is already in use.`);
    }

    return res;
  }

  deleteContact() {
    const originalEmail = this.originalContact && this.originalContact.email;
    this.isDeleting = true;
    this.contactService.deleteContact(originalEmail)
      .then(res => {
        this.router.navigate(['contacts'], {
          replaceUrl: true
        });
        this.isDeleting = false;
      })
      .catch((err: Error) => {
        this.validationErrors = [];
        this.validationErrors = [err.message];
      });
  }

  saveContact() {
    this.isSaving = true;
    if (this.isValid()) {
      const originalEmail = this.originalContact && this.originalContact.email;
      this.contactService.updateContact(originalEmail, this.contact).then(res => {
        if (originalEmail !== res.email) {
          // if this is true, then we've updated the email - it's the closest we have to a primary key,
          // but it can still change so we have to account for those changes - easiest way is to reload the page
          // with the correct value

          this.router.navigate(['contacts', res.email], {
            replaceUrl: true // make it tougher to navigate back to a now-nonexistent url
          });
        } else {
          this.getContactByEmail(res.email);
        }
        this.isEditing = false;
        this.isSaving = false;
      });
    } else {

      this.isSaving = null;
    }
  }


}
