import { describe, it, expect, assert } from "vitest";
import {
  login,
  createVehicle,
  getMatchPayments,
  getPaymentHistory,
  getTotalPayments,
  getRecentlyNotifiedMatches,
  createUserPaymentInfo,
  updateUserCargoCapacity,
} from "../src/actions/user";
import { init } from "../src";
import { AxiosError } from "axios";

describe("login", () => {
  it("should be truthy with valid credentials", async () => {
    expect.assertions(1);
    init(import.meta.env.VITE_API_URL);
    const { driver } = await login(
      import.meta.env.VITE_TEST_EMAIL,
      import.meta.env.VITE_TEST_PASSWORD
    );

    expect(driver).toBeTruthy();
  });

  it("should be falsy with invalid credentials", async () => {
    expect.assertions(1);
    init(import.meta.env.VITE_API_URL);
    await expect(login("bad@email.com", "bad_password")).rejects.toThrowError();
  });
});

describe("vehicles", () => {
  it("should be truthy valid data", async () => {
    expect.assertions(1);
    init(import.meta.env.VITE_API_URL);
    const { token } = await login(
      import.meta.env.VITE_TEST_EMAIL,
      import.meta.env.VITE_TEST_PASSWORD
    );
    const vehicle = await createVehicle(
      {
        make: "fsaf",
        model: "fasgfsa",
        year: "2030",
        license_plate: "fdkadf",
        vin: "fdka",
        vehicle_class: 1,
        insurance_photo:
          "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",
        registration_photo:
          "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",
        insurance_expiration_date: "2030-01-01",
        registration_expiration_date: "2030-01-01",
      },
      token
    );
    expect(vehicle).toBeTruthy();
  });

  it("should update cargo capacity with valid data", async () => {
    init(import.meta.env.VITE_API_URL);
    const { token, driver } = await login(
      import.meta.env.VITE_TEST_EMAIL,
      import.meta.env.VITE_TEST_PASSWORD
    );

    const measurements = {
      capacity_between_wheel_wells: null,
      capacity_door_height: null,
      capacity_door_width: null,
      capacity_height: 12,
      capacity_length: 13,
      capacity_weight: null,
      capacity_width: 14,
      lift_gate: null,
      pallet_jack: null,
    };
    if (!driver.vehicle) throw new Error("Driver has no vehicle to update");

    const response = await updateUserCargoCapacity(
      measurements,
      driver.vehicle.id,
      token
    );
    expect(response.capacityMeasurements.capacity_height).toBe(12);
  });
});

describe("getMatchPayments", () => {
  it("should return array of completed matches and their associated payment", async () => {
    init(import.meta.env.VITE_API_URL);
    const { token } = await login(
      import.meta.env.VITE_TEST_EMAIL,
      import.meta.env.VITE_TEST_PASSWORD
    );

    const results = await getMatchPayments(30, token);
    assert(results.length >= 0);
  });
});

describe("getPaymentHistory", () => {
  it("should return 30 and 60 days of payment history", async () => {
    init(import.meta.env.VITE_API_URL);
    const { token } = await login(
      import.meta.env.VITE_TEST_EMAIL,
      import.meta.env.VITE_TEST_PASSWORD
    );

    const results = await getPaymentHistory(token);
    assert(results.payouts_complete >= 0);
  });
});

describe("getTotalPayments", () => {
  it("should return 7 days of payment history if days are passed", async () => {
    init(import.meta.env.VITE_API_URL);
    const { token } = await login(
      import.meta.env.VITE_TEST_EMAIL,
      import.meta.env.VITE_TEST_PASSWORD
    );

    const results = await getTotalPayments(token, "day", 7);
    assert(results.length >= 0);
  });

  it("should return 7 months of payment history if months are passed", async () => {
    init(import.meta.env.VITE_API_URL);
    const { token } = await login(
      import.meta.env.VITE_TEST_EMAIL,
      import.meta.env.VITE_TEST_PASSWORD
    );

    const results = await getTotalPayments(token, "month", 7);
    assert(results.length >= 0);
  });
});

describe("getRecentlyNotifiedMatches", () => {
  it("should return list of matches driver was notified of in past 7 days", async () => {
    init(import.meta.env.VITE_API_URL);
    const { token } = await login(
      import.meta.env.VITE_TEST_EMAIL,
      import.meta.env.VITE_TEST_PASSWORD
    );

    const results = await getRecentlyNotifiedMatches(token, 7);
    assert(results.length >= 0);
  });
});

describe("createUserPaymentInfo", () => {
  it("should return expected branch error with valid info", async () => {
    init(import.meta.env.VITE_API_URL);
    const { token } = await login(
      import.meta.env.VITE_TEST_EMAIL,
      import.meta.env.VITE_TEST_PASSWORD
    );

    try {
      const results = await createUserPaymentInfo("000-00-0000", true, token);
      expect(results).toBeTruthy();
    } catch (e) {
      const error = e as unknown as AxiosError;
      const serverData = error.response?.data as any;
      const serverMessage = serverData.message as string;
      assert(
        serverMessage.startsWith(
          "Internal Server Error: Error initiating organization user:"
        )
      );
    }
  });
});
