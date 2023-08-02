import { describe, expect, it } from "vitest";
import { init, login } from "../src";
import {
  getAvailableMatches,
  getCompletedMatches,
  getLiveMatches,
} from "../src/actions/match";

describe("getAvailableMatches", () => {
  it("returns list of matches", async () => {
    expect.assertions(1);
    init(import.meta.env.VITE_API_URL);
    const { token } = await login(
      import.meta.env.VITE_TEST_EMAIL,
      import.meta.env.VITE_TEST_PASSWORD
    );
    const result = await getAvailableMatches(token);
    expect(Array.isArray(result));
  });
});

describe("getAcceptedMatches", () => {
  it("returns list of accepted matches", async () => {
    expect.assertions(1);
    init(import.meta.env.VITE_API_URL);
    const { token } = await login(
      import.meta.env.VITE_TEST_EMAIL,
      import.meta.env.VITE_TEST_PASSWORD
    );
    const result = await getLiveMatches(token);
    expect(Array.isArray(result));
  });
});

describe("getCompletedMatches", () => {
  it("returns list of completed matches", async () => {
    expect.assertions(1);
    init(import.meta.env.VITE_API_URL);
    const { token } = await login(
      import.meta.env.VITE_TEST_EMAIL,
      import.meta.env.VITE_TEST_PASSWORD
    );

    const result = await getCompletedMatches(token);
    expect(Array.isArray(result));
  });
});

// TODO: Need to mock response from getMatch
// describe("getMatch", () => {
//   it("returns match", async () => {
//     expect.assertions(1);
//     init(import.meta.env.VITE_API_URL);
//     const { token } = await login(
//       import.meta.env.VITE_TEST_EMAIL,
//       import.meta.env.VITE_TEST_PASSWORD
//     );
//     const result = await getMatch(
//       token,
//       "3be78271-9edc-4c02-9078-66faa9b9035b"
//     );
//     expect(result).toBeTruthy();
//   });
// });
