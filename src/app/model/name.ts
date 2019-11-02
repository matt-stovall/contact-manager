import { TitleCasePipe } from '@angular/common';

export class Name {
  first: string;
  last: string;


displayName(): string {
  if (!this.first && !this.last) {
    return '';
  }
  return new TitleCasePipe().transform(`${this.first} ${this.last}`);
}

  constructor(first?: string, last?: string) {
    this.first = first;
    this.last = last;
  }
}
