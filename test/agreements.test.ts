import { describe, it, expect } from "vitest";
import { getAgreements } from "../src/actions/user";
import { init } from "../src";
import { AgreementType } from "../src/types/Agreements";

describe("agreements", () => {
  it("should return list of driver documents when passed with driver enum", async () => {
    expect.assertions(1);
    init(import.meta.env.VITE_API_URL);
    await expect(getAgreements(AgreementType.DRIVER)).toBeTruthy();
  });

  it("should return list of shipper documents when passed with shipper enum", async () => {
    expect.assertions(1);
    init(import.meta.env.VITE_API_URL);
    await expect(getAgreements(AgreementType.SHIPPER)).toBeTruthy();
  });
});
