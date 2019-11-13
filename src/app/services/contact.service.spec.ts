import { Address } from './../model/address';
import { Name } from './../model/name';
import { Contact } from './../model/contact';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;
  let contact: Contact;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    const contactName =
      new Name('Matt', 'Stovall');
    const contactAddress =
      new Address('1234 Sesame St', 'Sesame', 'New York', '12345');
    contact =
      new Contact(
        contactName,
        contactAddress,
        null,
        '4055552424',
        'matt@stovall.com'
      );
    service = TestBed.get(ContactService);
  });

  function insertContact(){
    return service.updateContact(null, contact);
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('gets dummy list', () => {
    return service.getDummyContacts().then(res => {
      expect(res.length).toBe(50);
    });
  });
  it('saves and returns contact', async () => {
    return insertContact().then(() => {
      expect(service.getContactByEmail(contact.email)).toBe(contact);
    });
  });
  it('returns list of contacts', async () => {
    return insertContact().then(() => {
      expect(service.getContactList()[0]).toBe(contact);
    });
  });
  it('identifies unique email addresses', async () => {
    return insertContact().then(() => {
      expect(service.isEmailUnique(contact.email)).toBeFalsy();
    });
  });
  it('deletes the contact', async () => {
    return insertContact().then(() => {
      return service.deleteContact(contact.email).then(() => {
        expect(service.getContactByEmail(contact.email)).toBeFalsy();
      });
    });
  });
  it('errors when trying to delete a contact that doesn\'t exist', () => {
    return insertContact().then(() => {
      return service.deleteContact('notarealemail').then(() => {
        throw new Error('Should have errored');
      }).catch(err => {
        expect(err).toBeTruthy();
      });
    });
  });
});
