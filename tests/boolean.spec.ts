import { decodeOrUndefined as decode, booleanFrom } from "../lib";

describe("boolean", () => {
  test("from both values", () => {
    const BooleanFrom01 = booleanFrom({ true: "1", false: "0" });
    expect(decode(BooleanFrom01, "1")).toEqual(true);
    expect(decode(BooleanFrom01, " 1  ")).toEqual(true);
    expect(decode(BooleanFrom01, "0")).toEqual(false);
    expect(decode(BooleanFrom01, " 0   ")).toEqual(false);

    expect(BooleanFrom01.encode(true)).toEqual(true);
    expect(BooleanFrom01.encode(false)).toEqual(false);
  });

  test("from only true value", () => {
    const BooleanFrom01 = booleanFrom({ true: 1 });
    expect(decode(BooleanFrom01, 1)).toEqual(true);
    expect(decode(BooleanFrom01, "1")).toEqual(false);
    expect(decode(BooleanFrom01, "0")).toEqual(false);
  });

  test("from strict only true value", () => {
    const BooleanFrom01 = booleanFrom({ true: 1, strict: true });
    expect(decode(BooleanFrom01, 1)).toEqual(true);
    expect(decode(BooleanFrom01, 0)).toEqual(undefined);
    expect(decode(BooleanFrom01, "1")).toEqual(undefined);
    expect(decode(BooleanFrom01, "0")).toEqual(undefined);
  });

  test("from only false value", () => {
    const BooleanFrom01 = booleanFrom({ false: 0 });
    expect(decode(BooleanFrom01, 0)).toEqual(false);
    expect(decode(BooleanFrom01, 1)).toEqual(true);
    expect(decode(BooleanFrom01, "1")).toEqual(true);
    expect(decode(BooleanFrom01, "0")).toEqual(true);
  });

  test("from strict only false value", () => {
    const BooleanFrom01 = booleanFrom({ false: 0, strict: true });
    expect(decode(BooleanFrom01, 0)).toEqual(false);
    expect(decode(BooleanFrom01, 1)).toEqual(undefined);
    expect(decode(BooleanFrom01, "1")).toEqual(undefined);
    expect(decode(BooleanFrom01, "0")).toEqual(undefined);
  });
});
