export class Name {
  first: string;
  last: string;

  displayName(): string {
    return `${this.first[0].toUpperCase()}${this.first.slice(1)} ${this.last[0].toUpperCase()}${this.last.slice(1)}`;
  }

  constructor(first: string, last: string) {
    this.first = first;
    this.last = last;
  }
}
