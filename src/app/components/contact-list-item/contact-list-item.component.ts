import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/model/contact';

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss']
})
export class ContactListItemComponent implements OnInit {
  @Input() contact: Contact;
  @Input() highlight: string;
  constructor() { }

  ngOnInit() {
  }

}
