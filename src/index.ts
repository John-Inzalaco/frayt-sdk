export { type AgreementDocument, AgreementType } from "./types/Agreements";
export { type GeoAddress, type GPSCoordinates } from "./types/GeoLocation";
export { type Market } from "./types/Market";
export { type Nullable } from "./types/Nullable";
export { type BackgroundCheckResult } from "./types/PaymentMethod";
export { type Photo } from "./types/Photo";
export { type Modify } from "./types/TypeHelpers";
export {
  type UserInfo,
  type UserDeviceInfo,
  type UserDeviceResult,
} from "./types/user/UserInfo";
export { type UserAddress } from "./types/user/UserAddress";
export {
  Driver,
  type Vehicle,
  type Device,
  type Document,
  DocumentState,
  DocumentType,
  type Schedule,
  ScheduleOptState,
  UserState,
  type VehicleValues,
  type VehiclePhotosValues,
  type PersonalValues,
  type IdentityValues,
  WalletState,
} from "./types/user/Driver";

export {
  Match,
  type MatchETA,
  type Shipper,
  type MatchFee,
  type Contact,
  UnloadMethod,
  MatchState,
  type MatchStop,
  MatchStopType,
  type StateTransition,
  MatchSignature,
  BarcodeType,
  BarcodeState,
  MatchItemType,
  type BarcodeReading,
  type FileParams,
  type MatchItem,
  StopState,
  MatchSLAType,
  type MatchSLA,
} from "./types/match";

export let apiUrl = "";

export const init = (url: string) => {
  apiUrl = url;
};
export * from "./actions/user";
export * from "./actions/match";
