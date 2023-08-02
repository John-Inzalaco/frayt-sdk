import { authorizedRequest, unauthorizedRequest } from "../lib/request";
import { Image } from "react-native-image-crop-picker";
import { Moment } from "moment";
import { AxiosRequestConfig } from "axios";
import { UserAddress } from "../types/user/UserAddress";
import { Photo } from "../types/Photo";
import {
  UserDeviceInfo,
  UserDeviceResult,
  UserInfo,
} from "../types/user/UserInfo";
import { BackgroundCheckResult } from "../types/PaymentMethod";
import { Market } from "../types/Market";
import { AgreementDocument, AgreementType } from "../types/Agreements";
import {
  CargoCapacityMeasurements,
  DriverData,
  IdentityValues,
  PersonalValues,
  ProfileValues,
  Schedule,
  Vehicle,
  VehiclePhotosValues,
  VehicleValues,
} from "../types/user/Driver";
import {
  MatchPaymentsResult,
  PaymentHistoryResult,
  RecentlyNotifiedMatchesResult,
  TotalPaymentsResult,
} from "../types/user/Reports";

export const login = async (
  email: string,
  password: string
): Promise<{ token: string; driver: DriverData }> => {
  const http = await unauthorizedRequest();
  const request = await http.post("sessions/drivers", {
    email: email,
    password: password,
  });

  const { token, driver } = request.data.response;

  return { token, driver };
};

export const requestResetPassword = async (email: string) => {
  const http = await unauthorizedRequest();
  const request = await http.post("/forgot_password", {
    email,
  });

  const data = request.data.response;

  return data;
};

export const saveAccountUpdates = async (
  parameters:
    | PersonalValues
    | IdentityValues
    | { vehicle_photos: VehiclePhotosValues }
    | ProfileValues
    | { state: "registered" | "pending_approval" },
  token: string
): Promise<DriverData> => {
  const http = await authorizedRequest(token);
  const request = await http.put("driver", parameters);

  const data = request.data.response;

  return data;
};

export const updateUserProfilePhoto = async (
  photo: Photo,
  token: string
): Promise<string> => {
  const http = await authorizedRequest(token);

  const request = await http.put("driver", {
    profile_photo: photo.data,
  });

  const { profile_image } = request.data.response;
  return profile_image;
};

export const updateUserDocument = async (
  img: Image,
  expiration_date: Moment | null,
  type: DocumentType,
  user_id: string,
  token: string
) => {
  const http = await authorizedRequest(token);

  const request = await http.put(`drivers/${user_id}/photo`, {
    photo: {
      document: img.data,
      type,
      expiration_date,
    },
  });

  return request.data;
};

export const saveLocationUpdates = async (
  latitude: string,
  longitude: string,
  token: string
) => {
  const http = await authorizedRequest(token);
  const request = await http?.post("driver/locations", {
    latitude,
    longitude,
  });

  return request.data.response;
};

export const updateAddress = async (address: UserAddress, token: string) => {
  const http = await authorizedRequest(token);
  const request = await http?.put("driver", address);

  return request.data.response;
};

export const updatePhone = async (phone_number: string, token: string) => {
  const http = await authorizedRequest(token);
  const request = await http.put("driver", {
    phone_number,
  });

  return request.data.response;
};

export const getReport = async (
  days: number,
  token: string
): Promise<{ days_30: number; days_90: number }> => {
  const http = await authorizedRequest(token);
  const request = await http.get("driver/reports/driver_payout_report", {
    days: days,
  } as AxiosRequestConfig);

  const { days_30, days_90 } = request.data.response;

  return {
    days_30,
    days_90,
  };
};

export const getMatchPayments = async (
  days: number,
  token: string
): Promise<MatchPaymentsResult[]> => {
  const http = await authorizedRequest(token);
  const request = await http.get("driver/reports/driver_match_payments", {
    params: { days: days },
  } as AxiosRequestConfig);
  const response = request.data.response;

  return response;
};

export const sendResetPassword = async (
  resetCode: string,
  password: string,
  passwordConfirmation: string,
  token: string
) => {
  const http = await authorizedRequest(token);
  await http.post("/reset_password", {
    password_reset_code: resetCode,
    password: password,
    password_confirmation: passwordConfirmation,
  });

  return true;
};

/**
 * Returns total payments driver has received
 * @param token - Session token for driver
 * @returns - {@link PaymentHistoryResult} wrapped in a Promise
 */
export const getPaymentHistory = async (
  token: string
): Promise<PaymentHistoryResult> => {
  const http = await authorizedRequest(token);
  const request = await http.get("driver/reports/driver_payment_history");

  const { payouts_complete, payouts_future } = request.data.response;
  return {
    payouts_complete,
    payouts_future,
  };
};

/**
 * Returns total payments per day/month within specified range of days/months
 * @param token - Session token for driver
 * @param type - Whether to return total payments by day or month
 * @param range - Range of days/months
 * @returns - {@link TotalPaymentsResult} wrapped in a Promise
 */
export const getTotalPayments = async (
  token: string,
  type: "day" | "month",
  range: number
): Promise<TotalPaymentsResult[]> => {
  const http = await authorizedRequest(token);
  const request = await http.get("driver/reports/driver_total_payments", {
    params: { type: type, range: range },
  });

  const results = request.data.response;
  return results;
};

export const getRecentlyNotifiedMatches = async (
  token: string,
  range: number
): Promise<RecentlyNotifiedMatchesResult[]> => {
  const http = await authorizedRequest(token);
  const request = await http.get("driver/reports/driver_notified_matches", {
    params: { days: range },
  });

  const results = request.data.response;
  return results;
};

export const updateAcceptingScheduleOpportunities = async (
  accepting: boolean,
  token: string
) => {
  const http = await authorizedRequest(token);

  await http.put("driver", {
    schedule_notifications_opt_in: accepting.toString(),
  });

  return true;
};

export const getSchedule = async (
  scheduleId: string,
  token: string
): Promise<{ schedule: Schedule }> => {
  const http = await authorizedRequest(token);
  const request = await http.get(`schedules/${scheduleId}`);

  const { response } = request.data;

  return {
    schedule: response,
  };
};

export const getAvailableSchedules = async (
  token: string
): Promise<{ availableSchedules: Schedule[] }> => {
  const http = await authorizedRequest(token);
  const request = await http.get("driver/schedules/available");

  const { response } = request.data;

  return {
    availableSchedules: response,
  };
};

export const acceptScheduleOpportunity = async (
  scheduleId: string,
  token: string
): Promise<{ schedule: Schedule }> => {
  const http = await authorizedRequest(token);
  const request = await http.put(`schedules/${scheduleId}`, {
    opt_in: "true",
  });

  const schedule = request.data.response;

  return {
    schedule,
  };
};

export const rejectScheduleOpportunity = async (
  scheduleId: string,
  token: string
): Promise<{ schedule: Schedule }> => {
  const http = await authorizedRequest(token);
  const request = await http.put(`schedules/${scheduleId}`, {
    opt_in: "false",
  });
  const schedule = request.data.response;

  return {
    schedule,
  };
};

export const sendTestNotification = async (token: string) => {
  const http = await authorizedRequest(token);
  await http.post("driver/send_test_notification", {});

  return true;
};

export const chargeBackgroundCheck = async (
  token: string | null,
  paymentMethod?: any,
  paymentIntent?: any
): Promise<BackgroundCheckResult> => {
  const http = await authorizedRequest(token);

  const { data } = await http.post("driver/background_checks", {
    method_id: paymentMethod?.id,
    intent_id: paymentIntent?.id,
  });
  const { payment_intent_error } = data;

  if (payment_intent_error) {
    throw Error(payment_intent_error);
  }

  return data as BackgroundCheckResult;
};

export const createVehicle = async (
  params: VehicleValues,
  token: string
): Promise<Vehicle> => {
  const http = await authorizedRequest(token);
  const request = await http.post("driver/vehicles", { vehicle: params });
  const result = request.data.response;
  return result;
};

export const updateVehicle = async (
  id: string,
  vehicle: VehicleValues,
  token: string
): Promise<Vehicle> => {
  const http = await authorizedRequest(token);
  const request = await http.put(`driver/vehicles/${id}`, { vehicle });
  const result = request.data.response;
  return result;
};

export const setUserPassword = async (
  password: string,
  password_confirmation: string,
  token: string
) => {
  const http = await authorizedRequest(token);
  await http.put("driver", {
    password,
    password_confirmation,
  });

  return true;
};

export const updateUserPassword = async (
  current_password: string,
  password: string,
  password_confirmation: string,
  token: string
): Promise<DriverData> => {
  const http = await authorizedRequest(token);

  const request = await http.put("driver", {
    current_password,
    password,
    password_confirmation,
  });
  const result = request.data.response;

  return result;
};

export const updateUserLoadUnload = async (
  can_load: boolean,
  token: string
): Promise<DriverData> => {
  const http = await authorizedRequest(token);
  const request = await http.put("driver", {
    can_load,
  });
  const result = request.data.response;
  return result;
};

export const updateUserCargoCapacity = async (
  capacityMeasurements: CargoCapacityMeasurements,
  vehicleId: string,
  token: string
) => {
  const http = await authorizedRequest(token);

  await http.put(`driver/vehicles/${vehicleId}`, {
    ...capacityMeasurements,
  });

  return {
    capacityMeasurements,
  };
};

export const updateAgreements = async (
  agreements: string[],
  token: string
): Promise<{ pending_agreements: AgreementDocument[] }> => {
  const http = await authorizedRequest(token);

  const request = await http?.post("agreement_documents/driver", {
    agreements: agreements.map((agreement) => ({
      document_id: agreement,
      agreed: true,
    })),
  });

  const { agreement_documents } = request.data;

  return {
    pending_agreements: agreement_documents,
  };
};

export const createUserPaymentInfo = async (
  ssn: string | null,
  agree_to_tos: boolean,
  token: string
) => {
  const http = await authorizedRequest(token);
  const request = await http.put("driver", {
    ssn: ssn,
    agree_to_tos: agree_to_tos,
  });

  const { wallet_state } = request.data.response;

  return {
    wallet_state,
  };
};

export const dismissUserCargoCapacity = async (
  vehicleId: string,
  token: string
) => {
  const http = await authorizedRequest(token);
  const request = await http.patch(
    `driver/vehicles/${vehicleId}/dismiss_capacity`
  );

  const { capacity_dismissed_at } = request.data.response;

  return {
    capacity_dismissed_at,
  };
};

export const completeUserRegistration = async (
  token: string
): Promise<DriverData> => {
  const http = await authorizedRequest(token);
  const request = await http.put("driver", { state: "registered" });

  const result = request.data.response;

  return result;
};

export const getUser = async (
  token: string
): Promise<{ userData: DriverData }> => {
  const http = await authorizedRequest(token);
  const request = await http.get("driver");

  const { response: userData } = request.data;

  return {
    userData,
  };
};

export const signInUser = async (
  email: string,
  password: string
): Promise<{ token: string; userData: DriverData }> => {
  const http = await unauthorizedRequest();
  const request = await http.post("sessions/drivers", {
    email: email,
    password: password,
  });

  const { token, driver: userData } = request.data.response;

  return {
    token,
    userData,
  };
};

export const registerUser = async (
  email: string,
  code: string
): Promise<{ token: string; userData: DriverData }> => {
  const http = await unauthorizedRequest();
  const request = await http.post("sessions/drivers", {
    email,
    code,
  });
  const { token, driver: userData } = request.data.response;

  return {
    token,
    userData,
  };
};

export const createUnapprovedUser = async (
  userInfo: UserInfo
): Promise<{ token: string; userData: DriverData }> => {
  const http = await unauthorizedRequest();
  const request = await http.post("drivers", userInfo);
  const { token, driver: userData } = request.data.response;

  return {
    token,
    userData,
  };
};

export const getMarkets = async (): Promise<Market[]> => {
  const http = await unauthorizedRequest();
  const request = await http?.get("markets");

  const markets: Market[] = request.data.response;
  return markets;
};

export const getAgreements = async (
  type: AgreementType
): Promise<AgreementDocument[]> => {
  const http = await unauthorizedRequest();
  const request = await http?.get(`agreement_documents/${type}`);
  const agreements: AgreementDocument[] = request.data.agreement_documents;
  return agreements;
};

export const updateOneSignalId = async (
  token: string,
  deviceInfo: UserDeviceInfo
): Promise<UserDeviceResult> => {
  const http = await authorizedRequest(token);
  const request = await http.post("driver/devices", { device: deviceInfo });
  return request.data.response;
};
