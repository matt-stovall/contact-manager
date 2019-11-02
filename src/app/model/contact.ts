import { ContactImages } from './contact-images';
import {Address} from './address';
import {Name} from './name';
export class Contact {
  name: Name;
  address: Address;
  images: ContactImages;
  phone: string;
  email: string;

  constructor(name?: Name, address?: Address, images?: ContactImages, phone?: string, email?: string) {
    this.name = !!name ? new Name(name.first, name.last) : new Name();
    this.address = !!address ? new Address(address.street, address.city, address.state, address.zip) : new Address();
    this.images = !!images ? new ContactImages(images.large, images.medium, images.thumbnail) : new ContactImages();
    this.phone = phone;
    this.email = email;
  }

  getCopy(): Contact {
    return new Contact(this.name, this.address, this.images, this.phone, this.email);
  }
}
