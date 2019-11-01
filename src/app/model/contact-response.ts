export class ContactQueryResponse {
  results: ContactResponse[];
}

export class ContactResponse {
  email: string;
  phone: string;
  name: ContactResponseName;
  location: ContactResponseLocation;
}

export class ContactResponseName {
  title: string;
  first: string;
  last: string;
}

export class ContactResponseLocation {
  street: string;
  city: string;
  state: string;
  postcode: string;
}
