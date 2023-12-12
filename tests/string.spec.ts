import { decodeOrUndefined as decode, TrimmedString } from "../lib";

describe("string", () => {
  test("TrimmedString", () => {
    expect(decode(TrimmedString, "")).toEqual("");
    expect(decode(TrimmedString, "  ")).toEqual("");
    expect(decode(TrimmedString, " value ")).toEqual("value");

    expect(TrimmedString.encode("value")).toEqual("value");
  });
});
