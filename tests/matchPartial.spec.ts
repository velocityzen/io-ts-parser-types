import { TypeOf, OutputOf, InputOf, type, literal } from "io-ts";
import { describe, test, expect } from "vitest";
import { Equal, Expect } from "@type-challenges/utils";
import { NumberFromString, BooleanFromString } from "io-ts-types";

import { decode } from "../lib/helpers";
import { matchPartial, codecTypeFromString } from "../lib";

const match = codecTypeFromString(
  {
    case: {
      position: [0, 1],
      codec: NumberFromString,
    },
  },
  "Match",
);

const case1 = type({
  case: literal(1),
});

const case1Codec = codecTypeFromString(
  {
    value: {
      position: [4, 5],
      codec: NumberFromString,
    },
  },
  "Case1",
);

const case2 = type({
  case: literal(2),
});

const case2Codec = codecTypeFromString(
  {
    value: {
      position: [5, 9],
      codec: BooleanFromString,
    },
  },
  "Case2",
);

const codec = matchPartial(match, [
  [case1, case1Codec],
  [case2, case2Codec],
]);

describe("matchPartial", () => {
  test("decode", () => {
    expect(decode(codec, "12345true78")).toEqual({
      case: 1,
      value: 5,
    });
    expect(decode(codec, "22345true78")).toEqual({
      case: 2,
      value: true,
    });
  });

  test("encode", () => {
    expect(
      codec.encode({
        case: 2,
        value: true,
      }),
    ).toEqual("2    true");
  });

  test("types", () => {
    type MA = TypeOf<typeof match>;
    type MO = OutputOf<typeof match>;
    type MI = InputOf<typeof match>;

    type C1A = TypeOf<typeof case1Codec>;
    type _C1O = OutputOf<typeof case1Codec>;
    type _C1I = InputOf<typeof case1Codec>;

    type C2A = TypeOf<typeof case2Codec>;
    type _C2O = OutputOf<typeof case2Codec>;
    type _C2I = InputOf<typeof case2Codec>;

    type A = TypeOf<typeof codec>;
    type O = OutputOf<typeof codec>;
    type I = InputOf<typeof codec>;

    type _Tests = [
      Expect<Equal<A, MA & (C1A | C2A)>>,
      Expect<Equal<O, MO>>,
      Expect<Equal<I, MI>>,
    ];

    expect(true).toBe(true);
  });
});
