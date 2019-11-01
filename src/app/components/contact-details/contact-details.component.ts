import { Contact } from './../../model/contact';
import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contactEmail: string;
  contact: Contact;
  constructor(private route: ActivatedRoute, private contactService: ContactService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.contactEmail = params.contactId;
      if (this.contactEmail) {
        this.contact = this.contactService.getContactByEmail(this.contactEmail);
      }
    });
  }

}
