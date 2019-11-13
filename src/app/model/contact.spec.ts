import { ContactImages } from './contact-images';
import { Address } from './address';
import { Name } from './name';
import { Contact } from './contact';

describe('Contact', () => {
  const firstName: string = 'Matt';
  const lastName: string = 'Stovall';
  const street: string = '1234 Sesame Street';
  const city: string = 'Brooklyn';
  const state: string = 'New York';
  const zip: string = '12345';
  const phone: string = '4055552424';
  const email: string = 'matt@stovall.com';
  let name: Name;
  let address: Address;
  let images: ContactImages;
  let contact: Contact;
  beforeEach(() => {
    name = new Name(firstName, lastName);
    address = new Address(street, city, state, zip);
    images = new ContactImages();
    contact = new Contact(name, address, images, phone, email);
  });
  it('should create an instance', () => {
    expect(new Contact()).toBeTruthy();
  });
  it ('should exercise constructor', () => {
    expect(contact.name.first).toBe(firstName);
    expect(contact.name.last).toBe(lastName);
    expect(contact.address.street).toBe(street);
    expect(contact.address.city).toBe(city);
    expect(contact.address.state).toBe(state);
    expect(contact.address.zip).toBe(zip);
    expect(contact.phone).toBe(phone);
    expect(contact.email).toBe(email);
  });
  it('should create a distinct copy', () => {
    const copy = contact.getCopy();
    expect(copy).not.toBe(contact);
  });
});
