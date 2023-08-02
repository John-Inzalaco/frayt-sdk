import { authorizedRequest } from "../lib/request";
import { DriverLocation } from "../types/GeoLocation";
import { BarcodeReading, FileParams, Match } from "../types/match";

export const getAvailableMatches = async (
  token: string
): Promise<{ matches: Match[] }> => {
  const http = await authorizedRequest(token);
  const request = await http.get("driver/matches/available");
  return { matches: request.data.response.results };
};

export const getLiveMatches = async (
  token: string
): Promise<{ matches: Match[] }> => {
  const http = await authorizedRequest(token);
  const request = await http.get("driver/matches/live");
  return { matches: request.data.response.results };
};

export const getCompletedMatches = async (
  token: string,
  page = 0,
  perPage = 6
): Promise<{ matches: Match[]; total_pages: number }> => {
  const http = await authorizedRequest(token);
  const request = await http.get("driver/matches/completed", {
    params: { cursor: page, per_page: perPage },
  });
  return {
    matches: request.data.response.results,
    total_pages: request.data.response.total_pages,
  };
};

export const getMatch = async (
  token: string,
  matchId: string
): Promise<Match> => {
  const http = await authorizedRequest(token);
  const request = await http.get(`driver/matches/${matchId}`);
  return request.data.response;
};

export const acceptMatch = async (
  token: string,
  matchId: string,
  location: DriverLocation
): Promise<Match> => {
  const http = await authorizedRequest(token);
  const request = await http.patch(`driver/matches/${matchId}/`, {
    state: "accepted",
    location: location,
  });
  return request.data.response;
};

export const arriveAtPickup = async (
  token: string,
  matchId: string,
  location: DriverLocation
): Promise<Match> => {
  const http = await authorizedRequest(token);
  const request = await http.put(`driver/matches/${matchId}/`, {
    state: "arrived_at_pickup",
    location: location,
  });
  return request.data.response;
};

export const arriveAtReturn = async (
  token: string,
  matchId: string,
  location: DriverLocation
): Promise<Match> => {
  const http = await authorizedRequest(token);
  const request = await http.put(`driver/matches/${matchId}/`, {
    state: "arrived_at_return",
    location: location,
  });
  return request.data.response;
};

export const returned = async (
  token: string,
  matchId: string,
  location: DriverLocation
): Promise<Match> => {
  const http = await authorizedRequest(token);
  const request = await http.put(`driver/matches/${matchId}/`, {
    state: "returned",
    location: location,
  });
  return request.data.response;
};

export const arriveAtDropoff = async (
  token: string,
  matchId: string,
  stopId: string,
  location: DriverLocation
): Promise<Match> => {
  const http = await authorizedRequest(token);
  const request = await http.patch(
    `driver/matches/${matchId}/stops/${stopId}`,
    {
      state: "arrived",
      location: location,
    }
  );
  return request.data.response;
};

export const signMatch = async (
  token: string,
  matchId: string,
  stopId: string,
  signature: string,
  printedName: string,
  location: DriverLocation
): Promise<Match> => {
  const http = await authorizedRequest(token);
  const request = await http.patch(
    `driver/matches/${matchId}/stops/${stopId}`,
    {
      state: "signed",
      location: location,
      receiver_name: printedName,
      image: {
        filename: matchId + "_signature.png",
        contents: signature,
      },
    }
  );
  return request.data.response;
};

export const sendBarcodes = async (
  token: string,
  matchId: string,
  barcodeReadings: BarcodeReading[]
): Promise<Match> => {
  await Promise.all(
    barcodeReadings.map(async (barcodeReading) => {
      const params = {
        barcode: barcodeReading.barcode,
        type: barcodeReading.type,
        state: barcodeReading.state,
        photo:
          typeof barcodeReading.photo === "string"
            ? null
            : barcodeReading.photo?.data,
      };

      const http = await authorizedRequest(token);
      await http.post(
        `driver/matches/${matchId}/stops/${barcodeReading.item.stop_id}/items/${barcodeReading.item.id}/barcode_readings`,
        params
      );
    })
  );

  const http = await authorizedRequest(token);
  const request = await http.get(`driver/matches/${matchId}`);
  return request.data.response;
};

export const pickupMatch = async (
  token: string,
  matchId: string,
  userId: string,
  location: DriverLocation,
  originPhoto?: string,
  billOfLading?: string
): Promise<Match> => {
  const params: {
    match: string;
    user: string;
    state: string;
    origin_photo?: FileParams;
    bill_of_lading_photo?: FileParams;
    location?: DriverLocation;
  } = {
    match: matchId,
    user: userId,
    state: "picked_up",
    location: location,
  };

  if (originPhoto) {
    params.origin_photo = {
      filename: `${matchId}_origin_photo.jpg`,
      contents: originPhoto,
    };
  }

  if (billOfLading) {
    params.bill_of_lading_photo = {
      filename: `${matchId}_bill_of_lading.jpg`,
      contents: billOfLading,
    };
  }

  const http = await authorizedRequest(token);
  const request = await http.put(`driver/matches/${matchId}/`, params);
  return request.data.response;
};

export const deliver = async (
  token: string,
  matchId: string,
  stopId: string,
  userId: string,
  location: DriverLocation,
  destinationPhoto?: string
): Promise<Match> => {
  const params: {
    match: string;
    user: string;
    state: string;
    location: DriverLocation;
    destination_photo?: FileParams;
  } = {
    match: matchId,
    user: userId,
    state: "delivered",
    location: location,
  };

  if (destinationPhoto) {
    params.destination_photo = {
      filename: `${matchId}_destination_photo.jpg`,
      contents: destinationPhoto,
    };
  }

  const http = await authorizedRequest(token);
  const request = await http.put(
    `driver/matches/${matchId}/stops/${stopId}`,
    params
  );
  return request.data.response;
};

export const stopUndeliverable = async (
  token: string,
  matchId: string,
  stopId: string,
  location: DriverLocation,
  reason?: string
): Promise<Match> => {
  const http = await authorizedRequest(token);
  const request = await http.put(`driver/matches/${matchId}/stops/${stopId}`, {
    state: "undeliverable",
    location: location,
    reason: reason,
  });
  return request.data.response;
};

export const cancel = async (
  token: string,
  matchId: string,
  location: DriverLocation,
  reason?: string
): Promise<Match> => {
  const http = await authorizedRequest(token);
  const request = await http.put(`driver/matches/${matchId}`, {
    state: "cancel",
    location: location,
    reason: reason,
  });
  return request.data.response;
};

export const unableToPickup = async (
  token: string,
  matchId: string,
  location: DriverLocation,
  reason?: string
): Promise<Match> => {
  const http = await authorizedRequest(token);
  const request = await http.put(`driver/matches/${matchId}`, {
    state: "unable_to_pickup",
    location: location,
    reason: reason,
  });
  return request.data.response;
};

export const rejectMatch = async (
  token: string,
  matchId: string,
  location: DriverLocation
): Promise<Match> => {
  const http = await authorizedRequest(token);
  const request = await http.put(`driver/matches/${matchId}`, {
    state: "rejected",
    location: location,
  });
  return request.data.response;
};

export const toggleEnRouteToPickup = async (
  token: string,
  matchId: string,
  location: DriverLocation
): Promise<Match> => {
  const http = await authorizedRequest(token);
  const request = await http.put(`driver/matches/${matchId}/toggle_en_route`, {
    location: location,
  });
  return request.data.response;
};

export const toggleEnRouteToDropoff = async (
  token: string,
  matchId: string,
  stopId: string,
  location: DriverLocation
): Promise<Match> => {
  const http = await authorizedRequest(token);
  const request = await http.put(
    `driver/matches/${matchId}/stops/${stopId}/toggle_en_route`,
    {
      location: location,
    }
  );
  return request.data.response;
};
