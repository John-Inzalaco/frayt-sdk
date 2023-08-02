import { Moment } from "moment";

export type GeoAddress = {
  formatted_address: string;
  lat: number;
  lng: number;
  address: string;
  address2: string | null;
  city: string;
  state: string;
  state_code: string;
  neighborhood: string;
  zip: string;
  country: string;
  name: string | null;
};

export type GPSCoordinates = {
  latitude: number;
  longitude: number;
};

export type DriverLocation = {
  id?: string;
  created_at?: Moment | null;
  lat: number;
  lng: number;
};
