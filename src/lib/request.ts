import axios from "axios";
import { apiUrl } from "..";
import { Nullable } from "../types/Nullable";

function defaultConfig() {
  return {
    baseURL: apiUrl,
    timeout: 30000,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

export function unauthorizedRequest() {
  return axios.create(defaultConfig());
}

export function authorizedRequest(token: Nullable<string>) {
  if (!token) throw new Error("Please provide header token for HTTP requests");

  return axios.create({
    ...defaultConfig(),
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}
