export class ContactImages {
  large: string;
  medium: string;
  thumbnail: string;

  constructor(large?: string, medium?: string, thumbnail?: string){
    this.large = large;
    this.medium = medium;
    this.thumbnail = thumbnail;
  }
}
