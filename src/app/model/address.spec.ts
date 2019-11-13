import { Address } from './address';

describe('Address', () => {
  it('should create an instance', () => {
    expect(new Address()).toBeTruthy();
  });
  it('should exercise constructor', () => {
    const street = '1234 Sesame Street';
    const city = 'Brooklyn';
    const state = 'New York';
    const zip = '12345';
    const address = new Address(street, city, state, zip);
    expect(address.street).toBe(street);
    expect(address.city).toBe(city);
    expect(address.state).toBe(state);
    expect(address.zip).toBe(zip);
  });
});
