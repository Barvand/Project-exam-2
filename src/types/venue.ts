import { Location } from "./venue.array";
import { AvatarBanner } from "./venue.array";
export interface Media {
  url: string;
  alt: string; // Ensure this is present
}

interface Avatar {
  url: string;
  alt: string;
}

interface Owner {
  name: string;
  email: string;
  bio: string;
  avatar: Avatar; // Avatar object containing URL and ALT text
  banner: AvatarBanner;
}

export interface Venue {
  id: string;
  name: string;
  description: string;
  media: Media[]; // Now, media will be typed as Media[]
  meta: { wifi: boolean; breakfast: boolean };
  owner: Owner;
  rating: number;
  price: number;
  location: Location;
}
