interface VenueFormData {
  name: string;
  description: string;
  price: number;
  maxGuests: number;
  rating?: number;
  media?: { url: string; alt: string }[];
  meta?: { wifi: boolean; parking: boolean; breakfast: boolean; pets: boolean };
  location?: {
    address?: string;
    city?: string;
    zip?: string;
    country?: string;
    continent?: string;
    lat?: number;
    lng?: number;
  };
}
