import { type Moment } from "moment";
import { GeoAddress } from "../GeoLocation";
import { type Image } from "react-native-image-crop-picker";

export class Match {
  eta: MatchETA | null = null;
  shortcode = "";
  pickup_notes: string | null = null;
  id = "";
  completed_at: string | Moment | null = null;
  shipper: Shipper = { name: "", phone: "", company: null };
  fees: MatchFee[] = [];
  origin_photo: string | null = null;
  origin_address: GeoAddress | null = null;
  cancel_reason: string | null = null;
  vehicle_class = "Car";
  vehicle_class_id = 1;
  total_weight = 0;
  scheduled = false;
  created_at: string | Moment = new Date().toDateString();
  po: string | null = null;
  pickup_at: string | Moment | null = null;
  self_sender = true;
  service_level = 1;
  total_volume = 0;
  distance = 0.0;
  bill_of_lading_photo: string | null = null;
  driver_id: string | null = null;
  sender: Contact | null = null;
  driver_total_pay = 0.0;
  dropoff_at: string | Moment | null = null;
  bill_of_lading_required: boolean | null = null;
  accepted_at: string | Moment | null = null;
  picked_up_at: string | Moment | null = null;
  origin_photo_required = false;
  state: MatchState = MatchState.AssigningDriver;
  rating = 0.0;
  driver_email: string | null = null;
  unload_method: UnloadMethod | null = null;
  stops: MatchStop[] = [];
  slas: MatchSLA[] = [];
  preferred_driver_id: string | null = null;

  constructor(data: any) {
    Object.assign(this, data);
  }

  getPickups() {
    return this.stops.filter((stop) => stop.type === MatchStopType.Pickup);
  }

  getDropoffs() {
    return this.stops.filter((stop) => stop.type !== MatchStopType.Pickup);
  }

  getDestinationAddress() {
    const dropoffs = this.getDropoffs();
    if (dropoffs.length <= 0) {
      throw new Error("Could not find at least one dropoff.");
    }
    return dropoffs[dropoffs.length - 1].destination_address;
  }

  isEnRoute(): boolean {
    return (
      this.stops?.some((stop) => stop.state === "en_route") ||
      EnRouteStates.includes(this.state)
    );
  }

  isLive(): boolean {
    return LiveStates.includes(this.state);
  }

  isComplete(): boolean {
    return DeliveredStates.includes(this.state);
  }

  isCanceled(): boolean {
    return CanceledStates.includes(this.state);
  }

  getPriority() {
    if (!this.slas?.length) {
      return { status: false, message: "No Matching Slas Available" };
    }
    const pickupEndTime = this.getSLAEndTime("pickup");
    let deliveryEndTime = this.getSLAEndTime("delivery");
    if (this.service_level == ServiceLevel.SameDay) {
      deliveryEndTime = "5pm";
    }
    return {
      pickupTime: pickupEndTime,
      deliveryTime: deliveryEndTime,
      serviceLevel: this.service_level,
      status: true,
    };
  }

  getSLAEndTime(type: SLAType) {
    return this.slas
      .find((sla) => sla.type === type)
      ?.end_time?.toLocaleString();
  }

  isPreferredDriver(id: string) {
    return this.preferred_driver_id === id;
  }
}

export type SLAType = "acceptance" | "pickup" | "delivery";

export enum ServiceLevel {
  Dash = 1,
  SameDay = 2,
}

export type MatchETA = {
  id: string;
  arrive_at: string | Moment;
};

export type Shipper = {
  name: string;
  phone: string;
  company: string | null;
};

export type MatchFee = {
  amount: number;
  description: string | null;
  id: string;
  name: string;
  type: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  notify: boolean;
};

export enum UnloadMethod {
  DockToDock = "dock_to_dock",
  LiftGate = "lift_gate",
}

/**
 *
 * @enum {string} All possible match states
 * @property {string} UnableToPickup the driver was unable to pick up all items.
 * @property {string} DriverCanceled the driver has removed himself from a Match. The Match itself is not canceled and will be sent out to other available drivers.
 * @property {string} AdminCanceled has been canceled by the Frayt team
 * @property {string} Canceled was canceled by the shipper
 * @property {string} Pending has been estimated, but not authorized
 * @property {string} Inactive is awaiting action from the Frayt team before it can be sent out to drivers
 * @property {string} Scheduled is currently scheduled for a future time, and has not been sent to drivers
 * @property {string} AssigningDriver we are in the process of finding an available driver to assign to this Match
 * @property {string} Accepted has been accepted by a driver, but is not yet on the way
 * @property {string} EnRouteToPickup the driver is on the way to the pickup location
 * @property {string} ArrivedAtPickup the driver has arrived at the pickup location
 * @property {string} PickedUp the driver has picked up all items. Details updates on individual stops can be found under the stops state.
 * @property {string} EnRouteToReturn the driver is returning back to the pick up point.
 * @property {string} ArrivedAtReturn the driver has reached the pickup point.
 * @property {string} Completed all stops have been completed, but not yet charged
 * @property {string} Charged the Match has been completed and charged
 */
export enum MatchState {
  UnableToPickup = "unable_to_pickup",
  DriverCanceled = "driver_canceled",
  AdminCanceled = "admin_canceled",
  Canceled = "canceled",
  Pending = "pending",
  Inactive = "inactive",
  Scheduled = "scheduled",
  AssigningDriver = "assigning_driver",
  Accepted = "accepted",
  EnRouteToPickup = "en_route_to_pickup",
  ArrivedAtPickup = "arrived_at_pickup",
  PickedUp = "picked_up",
  EnRouteToReturn = "en_route_to_return",
  ArrivedAtReturn = "arrived_at_return",
  Completed = "completed",
  Charged = "charged",
}

export enum MatchStopType {
  Pickup = "pickup",
  Dropoff = "dropoff",
}

export type MatchStop = {
  type: MatchStopType;
  delivery_notes: string | null;
  destination_address: GeoAddress;
  destination_photo: string | null;
  destination_photo_required: boolean;
  driver_tip: number;
  dropoff_by: string | Moment | null;
  eta: MatchETA | null;
  has_load_fee: boolean;
  id: string;
  identifier: string | null;
  index: number;
  items: MatchItem[];
  needs_pallet_jack: boolean;
  po: string | null;
  recipient: Contact | null;
  self_recipient: boolean;
  signature_instructions: string | null;
  signature_name: string | null;
  signature_photo: string | null;
  signature_required: boolean;
  signature_type: MatchSignature.Electronic | MatchSignature.Photo;
  state: StopState;
  state_transition: StateTransition | null;
};

export type StateTransition = {
  notes: string;
  updated_at: string | Moment;
  from: StopState;
  to: StopState;
};

export enum MatchSignature {
  Electronic = "electronic",
  Photo = "photo",
}

export enum BarcodeType {
  Pickup = "pickup",
  Delivery = "delivery",
}

export enum BarcodeState {
  Captured = "captured",
  Missing = "missing",
}

export enum MatchItemType {
  Item = "item",
  Pallet = "pallet",
}

export type BarcodeReading = {
  type: BarcodeType;
  state: BarcodeState;
  photo?: Image;
  barcode: string;
  item: MatchItem;
};

export interface FileParams {
  filename: string;
  contents?: string | null;
}

export type MatchItem = {
  barcode: string | null;
  barcode_delivery_required: boolean;
  barcode_pickup_required: boolean;
  barcode_readings: BarcodeReading[];
  declared_value: number;
  description: string;
  height: number;
  stop_id: string;
  id: string;
  length: number;
  pieces: number;
  type: MatchItemType.Item;
  volume: number;
  weight: number;
  width: number;
};

/**
 * @enum {string}
 * @property {string} Unserved the driver was unable to pick up all items.
 * @property {string} Undeliverable the driver was unable to deliver this stop. A reason will be provided.
 * @property {string} Pending the driver is not yet en route. This is the starting state.
 * @property {string} EnRoute the driver is en route to the stop.
 * @property {string} Arrived the driver has arrived at the stop.
 * @property {string} Signed the recipient has signed for the delivery of the items.
 * @property {string} Delivered the driver has completed the delivery of all items.
 * @property {string} Returned the driver has returned the package.
 */
export enum StopState {
  Unserved = "unserved",
  Undeliverable = "undeliverable",
  Pending = "pending",
  EnRoute = "en_route",
  Arrived = "arrived",
  Signed = "signed",
  Delivered = "delivered",
  Returned = "returned",
}

export enum MatchSLAType {
  Acceptance = "acceptance",
  Pickup = "pickup",
  Delivery = "delivery",
}

export type MatchSLA = {
  completed_at: string | Moment | null;
  end_time: string | Moment | null;
  start_time: string | Moment | null;
  type: MatchSLAType;
};

export const LiveStates: MatchState[] = [
  MatchState.Accepted,
  MatchState.EnRouteToPickup,
  MatchState.ArrivedAtPickup,
  MatchState.PickedUp,
  MatchState.EnRouteToReturn,
  MatchState.ArrivedAtReturn,
];

export const DeliveredStates: MatchState[] = [
  MatchState.Completed,
  MatchState.Charged,
];
export const PickedUpStates: MatchState[] = [
  MatchState.PickedUp,
  MatchState.Completed,
  MatchState.Charged,
];
export const EnRouteStates: MatchState[] = [
  MatchState.EnRouteToPickup,
  MatchState.EnRouteToReturn,
];

export const CanceledStates: MatchState[] = [
  MatchState.Canceled,
  MatchState.AdminCanceled,
  MatchState.DriverCanceled,
];
