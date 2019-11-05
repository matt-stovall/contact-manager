import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: any, args: string): any {
    if (args && value) {
      value = String(value); // make sure its a string
      const startIndex = value.toLowerCase().indexOf(args.toLowerCase());
      if (startIndex !== -1) {
        const matchingString = value.substr(startIndex, args.length);
        return value.replace(matchingString, '<span class=\'highlight\'>' + matchingString + '</span>');
      }

    }
    return value;
  }

}
