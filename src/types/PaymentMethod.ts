import { DriverData } from "./user/Driver";

export type BackgroundCheckResult = {
  payment_intent_error: string;
  requires_action: string;
  payment_intent_client_secret: string;
  driver: DriverData;
};
