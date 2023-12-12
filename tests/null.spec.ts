import { decodeOrUndefined as decode, nullFrom } from "../lib";

describe("nullFrom", () => {
  test("All kind of things can become nothing", () => {
    const codec = nullFrom({ match: ["", "Null", 0, false] });

    expect(decode(codec, "")).toEqual(null);
    expect(decode(codec, "Null")).toEqual(null);
    expect(decode(codec, 0)).toEqual(null);
    expect(decode(codec, undefined)).toEqual(null);
    expect(decode(codec, null)).toEqual(null);
    expect(decode(codec, false)).toEqual(null);

    expect(codec.encode(null)).toEqual(null);

    expect(decode(codec, "null")).toEqual(undefined);
  });

  test("case inensitive", () => {
    const codec = nullFrom({ match: ["null"], caseSensitive: false });

    expect(decode(codec, "null")).toEqual(null);
    expect(decode(codec, "Null")).toEqual(null);
    expect(decode(codec, undefined)).toEqual(null);
    expect(decode(codec, null)).toEqual(null);
  });
});
