import { Name } from './name';

describe('Name', () => {
  const firstName: string = 'matt';
  const lastName: string = 'stovall';
  it('should create an instance', () => {
    expect(new Name()).toBeTruthy();
  });
  it('should exercise constructor', () => {
    const name = new Name(firstName, lastName);
    expect(name.first).toBe(firstName);
    expect(name.last).toBe(lastName);
  });
  it('should return formatted DisplayName', () => {
    const name = new Name(firstName, lastName);
    expect(name.displayName()).toBe('Matt Stovall');
  });
});
