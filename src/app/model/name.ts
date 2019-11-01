export class Name {
  first: string;
  last: string;

  private _displayName: string;

  get displayName(): string {
    if (!this.first && !this.last) {
      return '';
    }

    return !!this.first && !!this.last ?
      `${this.first[0].toUpperCase()}${this.first.slice(1)} ${this.last[0].toUpperCase()}${this.last.slice(1)}` :
      !!this.first ?
      this.first :
      this.last;
  }

  set displayName(value: string){
    console.error('Invalid attempt to set computed property Name.DisplayName');
    console.trace();
  }

  constructor(first: string, last: string) {
    this.first = first;
    this.last = last;
  }
}
