import { Pipe, PipeTransform } from '@angular/core';
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js/min';

@Pipe({
  name: 'phone'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(phoneValue: number | string, country: string): any {
    if (!phoneValue) {
      return '';
    }
    try {
      const phoneNumber = parsePhoneNumber(phoneValue.toString(), country as CountryCode);
      return phoneNumber.formatNational();
    } catch (error) {
      console.error(error);
      return phoneValue;
    }
  }

}
