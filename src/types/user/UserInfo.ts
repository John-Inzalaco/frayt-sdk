export type UserInfo = {
  user?: {
    password?: string;
    email?: string;
  };
};

export interface UserDeviceInfo {
  device_uuid: string;
  device_model: string;
  player_id: string;
  os: string;
  os_version: string;
  is_tablet: boolean;
  is_location_enabled: boolean;
  app_version: string;
  app_revision: string | null;
  app_build_number: string;
}

export interface UserDeviceResult {
  id: string;
  driver_id: string;
  device_uuid: string;
  device_model: string;
  player_id: string;
  os: string;
  os_version: string;
  is_tablet: boolean;
  is_location_enabled: boolean;
}
