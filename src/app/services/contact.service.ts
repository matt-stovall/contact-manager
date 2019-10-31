import { Address } from './../model/address';
import { Name } from './../model/name';
import { ContactResponse } from './../model/contact-response';
import { Contact } from './../model/contact';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, concat } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  Contacts: Subject<Contact[]> = new BehaviorSubject<Contact[]>([]);
  constructor(private http: HttpClient) {
    this.getDummyContacts();
  }

  getDummyContacts() {
    // uses https://randomuser.me/ to generate initial users
    // specifies version 1.2 because the model fits a simple demo better than 1.3
    const dummyUrl = 'https://randomuser.me/api/1.2/?inc=name,location,phone,email,id&format=json&results=50&nat=us';
    this.http.get<ContactResponse>(dummyUrl).subscribe(result => {
      this.Contacts.next(result.results.map(p => {
        console.log(p);
        const contact = new Contact();

        const name: Name = new Name(p.name.first, p.name.last);
        const address: Address = new Address(p.location.street, p.location.city, p.location.state, p.location.zip);
        contact.name = name;
        contact.address = address;
        contact.email = p.email;
        contact.phone = p.phone;

        return contact;
      }));
    });
  }

  testUpdate() {
    const localContacts = (this.Contacts as BehaviorSubject<Contact[]>).value;
    console.dir(localContacts);
  }
}
