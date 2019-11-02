import { Address } from './../model/address';
import { Name } from './../model/name';
import { ContactQueryResponse } from './../model/contact-response';
import { Contact } from './../model/contact';
import { Injectable } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { ContactImages } from '../model/contact-images';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  Contacts: Subject<Contact[]> = new BehaviorSubject<Contact[]>([]);
  contactsLoading: Subject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.getDummyContacts();
  }

  getDummyContacts() {
    // uses https://randomuser.me/ to generate initial users
    // specifies version 1.2 because the model fits a simple demo better than 1.3
    const dummyUrl = 'https://randomuser.me/api/1.2/?inc=name,location,phone,email,picture&format=json&results=50&nat=us';
    this.contactsLoading.next(true);
    this.http.get<ContactQueryResponse>(dummyUrl).subscribe(result => {
      this.Contacts.next(result.results.map(p => {
        const contact = new Contact();

        const titleCase = new TitleCasePipe();

        contact.name = new Name(titleCase.transform(p.name.first), titleCase.transform(p.name.last));
        contact.address =
          new Address(
            titleCase.transform(p.location.street),
            titleCase.transform(p.location.city),
            titleCase.transform(p.location.state),
            p.location.postcode.toString()
          );
        contact.images = new ContactImages(p.picture.large, p.picture.medium, p.picture.thumbnail);
        contact.email = p.email;

        // this mess is dumb, but it comes from using random sample data
        // since the phone formatting library requires a valid number,
        // and US area codes can't start with 0 or 1, we need to replace
        // invalid starting characters with valid ones
        p.phone = p.phone.replace(/\D/g, '');
        if (p.phone[0] === '0' || p.phone[0] === '1') {
          const newChar = (Math.floor(Math.random() * (9 - 2)) + 2).toString();
          p.phone = p.phone.replace(p.phone[0], newChar);
        }
        contact.phone = p.phone;

        return contact;
      }));
      this.contactsLoading.next(false);
    });
  }

  getContactByEmail(contactEmail: string): Contact {
    const localContacts = (this.Contacts as BehaviorSubject<Contact[]>).value;
    const contact = localContacts.find(p => p.email === contactEmail);
    return contact;
  }

  updateContact(currentEmail: string, update: Contact): Promise<Contact> {
    return new Promise<Contact>((resolve, reject) => {
      // traditionally this would be a db call, rather than just a local replacement,
      // hence the promise return type, plus that it allows for guaranteed timing for
      // post-update actions
      const localContacts = (this.Contacts as BehaviorSubject<Contact[]>).value;
      const idx = localContacts.findIndex(p => p.email === currentEmail);
      if (idx > -1) {
        localContacts.splice(idx, 1, update);
        this.Contacts.next(localContacts);
        resolve(update);
      } else {
        localContacts.push(update);
        this.Contacts.next(localContacts);
        resolve(update);
      }
    });
  }
}
