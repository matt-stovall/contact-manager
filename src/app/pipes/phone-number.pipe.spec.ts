import { PhoneNumberPipe } from './phone-number.pipe';

describe('PhoneNumberPipe', () => {
  it('create an instance', () => {
    const pipe = new PhoneNumberPipe();
    expect(pipe).toBeTruthy();
  });
  it('transforms', () => {
    const pipe = new PhoneNumberPipe();
    const phone = '4055552424';
    const expected = '(405) 555-2424';
    expect(pipe.transform(phone, 'US')).toBe(expected);
  });
});
