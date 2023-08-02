import { AgreementDocument } from "../Agreements";
import { DriverLocation, GeoAddress } from "../GeoLocation";
import { dateIsExpired } from "../../lib/utils";

export interface DriverData {
  vehicle: Vehicle | null;
  default_device_id: string;
  devices: Device[];
  images: Document[];
  address: GeoAddress;
  current_location: DriverLocation;
  can_load: boolean;
  id: string;
  fountain_id: string | null;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  profile_image: string | null;
  wallet_state: string | null;
  schedule_opt_state: ScheduleOptState;
  accepted_schedules: Schedule[];
  rejected_schedules: Schedule[];
  password_reset_code: false;
  state: UserState;
  rating: number;
  shipper_rating: number;
  activity_rating: number;
  fulfillment_rating: number;
  sla_rating: number;
  pending_agreements: AgreementDocument[];
  license_number: string | null;
}
export class Driver {
  vehicle: Vehicle | null = null;
  default_device_id = "";
  devices: Device[] = [];
  images: Document[] = [];
  address?: GeoAddress;
  current_location?: DriverLocation;
  can_load = false;
  id = "";
  fountain_id: string | null = null;
  email = "";
  first_name = "";
  last_name = "";
  phone_number: string | null = null;
  profile_image: string | null = null;
  wallet_state: WalletState = WalletState.Unclaimed;
  schedule_opt_state: ScheduleOptState = ScheduleOptState.Pending;
  accepted_schedules: Schedule[] = [];
  rejected_schedules: Schedule[] = [];
  password_reset_code = false;
  state: UserState = UserState.Applying;
  rating = 0;
  shipper_rating = 0;
  activity_rating? = 0;
  fulfillment_rating = 0;
  sla_rating = 0;
  pending_agreements: AgreementDocument[] = [];
  license_number: string | null = null;
  constructor(data: DriverData) {
    Object.assign(this, data);
  }

  needsUpdatedDocuments(): boolean {
    const vehicleDocs = this.vehicle?.images || [];
    const driverDocs = this.images || [];
    const docs = [...vehicleDocs, ...driverDocs];
    const docsMap = docs.reduce((acc, doc) => {
      return acc.set(doc.type, doc);
    }, new Map<string, Document>());

    const insurance = docsMap.get(DocumentType.Insurance);
    const registration = docsMap.get(DocumentType.Registration);
    const license = docsMap.get(DocumentType.License);

    return (
      dateIsExpired(insurance?.expires_at) ||
      dateIsExpired(registration?.expires_at) ||
      dateIsExpired(license?.expires_at) ||
      docs.some((d) => d.state === "rejected")
    );
  }

  documentsAwaitingApproval(): boolean {
    const vehicleDocs = this.vehicle?.images || [];
    const driverDocs = this.images || [];
    const docs = [...vehicleDocs, ...driverDocs];

    return docs.some((d) => d.state === "pending_approval");
  }

  getProfileImage() {
    if (this.images && this.images.length > 0) {
      const profile_image = this.images.find((image) => {
        return (
          image.type === DocumentType.Profile && image.state !== "rejected"
        );
      });

      if (profile_image && profile_image.document) {
        return profile_image.document;
      }
    }
    return null;
  }
}

export interface PersonalValues {
  birthdate: string;
  first_name: string;
  last_name: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface IdentityValues {
  licenseNumber: string;
  licensePhoto: string;
  licenseExpirationDate: string;
  ssn: string;
  profilePhoto: string;
}

export type ProfileValues = {
  email: string;
  phone: string;
  address: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
};

export interface DriverDocument {
  data: string;
  height: number;
  width: number;
  mime: string;
  modificationDate: string;
  path: string;
  size: number;
}

export interface VehicleValues {
  make: string;
  model: string;
  year: string;
  license_plate: string;
  vin: string;
  vehicle_class: number;
  insurance_photo: string;
  registration_photo: string;
  insurance_expiration_date: Date | string;
  registration_expiration_date: Date | string;
}

export interface VehiclePhotosValues {
  drivers_side: DriverDocument;
  back: DriverDocument;
  passengers_side: DriverDocument;
  front: DriverDocument;
  cargo_area: DriverDocument;
}

export interface Vehicle {
  id: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
  vehicle_class: 1 | 2 | 3 | 4;
  lift_gate: boolean;
  pallet_jack: boolean;
  images: Document[];
  capacity_dismissed_at: number | null;
  capacity_between_wheel_wells: number | null;
  capacity_door_height: number | null;
  capacity_door_width: number | null;
  capacity_height: number | null;
  capacity_length: number | null;
  capacity_weight: number | null;
  capacity_width: number | null;
  license_plate: string | null;
}

export interface CargoCapacityMeasurements {
  capacity_between_wheel_wells: number | null;
  capacity_door_height: number | null;
  capacity_door_width: number | null;
  capacity_height: number;
  capacity_length: number;
  capacity_weight: number | null;
  capacity_width: number;
  lift_gate?: boolean | null;
  pallet_jack?: boolean | null;
}

export interface Device {
  id: string;
  device_uuid: string;
  device_model: string;
  player_id: string;
  os: string;
  os_version: string;
  is_tablet: boolean;
  is_location_enabled: boolean;
  driver_id: string;
}

export interface Document {
  id?: string;
  document?: string;
  expires_at?: string;
  notes?: string;
  state?: DocumentState;
  type: DocumentType;
}

export enum ScheduleOptState {
  Out = "opted_out",
  In = "opted_in",
  Pending = "pending_approval",
}

export interface Schedule {
  id: string;
  sla: number;
  sunday: string | null;
  monday: string | null;
  tuesday: string | null;
  wednesday: string | null;
  thursday: string | null;
  friday: string | null;
  saturday: string | null;
  location: DriverLocation | null;
}

export enum DocumentState {
  Approved = "approved",
  Rejected = "rejected",
  Pending = "pending_approval",
}

export enum DocumentType {
  License = "license",
  Registration = "registration",
  Insurance = "insurance",
  Profile = "profile",
  PassengersSide = "passengers_side",
  DriverSide = "drivers_side",
  CargoArea = "cargo_area",
  Front = "front",
  Back = "back",
  VehicleType = "vehicle_type",
  CarrierAgreement = "carrier_agreement",
}

export enum WalletState {
  Unclaimed = "UNCLAIMED",
  Pending = "PENDING",
  Active = "ACTIVE",
  NotCreated = "NOT_CREATED",
}

export enum UserState {
  Registered = "registered",
  Approved = "approved",
  Rejected = "rejected",
  Disabled = "disabled",
  Applying = "applying",
  Screening = "screening",
  Pending = "pending_approval",
}
