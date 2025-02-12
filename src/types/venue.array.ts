export interface Media {
  url: string;
  alt: string;
}

export interface Meta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

export interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

export interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: Customer;
}

export interface Customer {
  name: string;
  email: string;
  bio: string;
  avatar: AvatarBanner;
  banner: AvatarBanner;
}

export interface AvatarBanner {
  url: string;
  alt: string;
}

export interface Owner {
  name: string;
  email: string;
  bio: string;
  avatar: AvatarBanner;
  banner: AvatarBanner;
}

export interface Venues {
  id: string;
  name: string;
  description: string;
  media: Media[];
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: Meta;
  location: Location;
  owner: Owner;
  bookings: Booking[];
}
