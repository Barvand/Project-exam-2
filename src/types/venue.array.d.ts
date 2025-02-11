interface Media {
  url: string;
  alt: string;
}

interface Meta {
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  pets: boolean;
}

interface Location {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
  lat: number;
  lng: number;
}

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
  customer: Customer;
}

interface Customer {
  name: string;
  email: string;
  bio: string;
  avatar: AvatarBanner;
  banner: AvatarBanner;
}

interface AvatarBanner {
  url: string;
  alt: string;
}

interface Owner {
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
