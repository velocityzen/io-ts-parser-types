import { TypeOf, OutputOf, type, literal } from "io-ts";
import { NumberFromString, BooleanFromString } from "io-ts-types";
import { Equal, Expect } from "@type-challenges/utils";

import { decode } from "../lib/helpers";
import { matchPartial, codecTypeFromString } from "../lib";

const match = codecTypeFromString(
  {
    case: {
      position: [0, 1],
      codec: NumberFromString,
    },
  },
  "Match"
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
  "Case1"
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
  "Case2"
);

const codec = matchPartial(match)
  .case(case1, case1Codec)
  .case(case2, case2Codec);

type IMatch = TypeOf<typeof match>;
type _Case1 = IMatch & TypeOf<typeof case1Codec>;
type _Case2 = IMatch & TypeOf<typeof case2Codec>;
type I = TypeOf<typeof codec>;
type O = OutputOf<typeof codec>;
type _Tests = [
  // ideally we want this:
  // Expect<Equal<I, Case1 | Case2>>,
  Expect<Equal<I, IMatch>>,
  Expect<Equal<O, string>>
];

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
      } as I)
    ).toEqual("2    true");
  });
});
