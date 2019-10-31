import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!args || !args[0]) {return value; }
    // tslint:disable-line
    const re = new RegExp(args, 'gi');
    return value.replace(re, '<span class=\'highlight\'>' + args + '</span>');
  }

}
