import { describe, expect, it } from "vitest";
import { Driver } from "../src";

describe("driver", () => {
  it("driver class can be created", () => {
    const driver = new Driver({ first_name: "test" } as any);
    expect(driver).toBeTruthy();
  });

  it("needsUpdatedDocuments returns true if docs are out of date", () => {
    const driver = new Driver({ first_name: "test" } as any);
    const result = driver.needsUpdatedDocuments();
    expect(result).toBeTruthy();
  });

  it("getProfileImage returns null if driver has no profile photo", () => {
    const driver = new Driver({ first_name: "test" } as any);
    const result = driver.getProfileImage();
    expect(result).toBeNull();
  });

  // TODO: getProfileImage with a valid profile photo
});
