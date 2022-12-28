import { TypeOf, OutputOf } from "io-ts";
import { NumberFromString, BooleanFromString } from "io-ts-types";
import { Equal, Expect } from "@type-challenges/utils";

import { decode } from "../lib/helpers";
import { typeFromString } from "../lib";

describe("typeFromString", () => {
  test("decode", () => {
    const codec = typeFromString(
      {
        prop1: {
          position: [1, 2],
          codec: NumberFromString,
        },
        prop2: {
          position: [5, 9],
          codec: BooleanFromString,
        },
      },
      "TestCodec"
    );

    type I = TypeOf<typeof codec>;
    type O = OutputOf<typeof codec>;

    type _Tests = [
      Expect<Equal<I, { prop1: number; prop2: boolean }>>,
      Expect<Equal<O, { prop1: string; prop2: string }>>
    ];

    expect(decode(codec, "12345true78")).toEqual({
      prop1: 2,
      prop2: true,
    });
  });

  test("encode", () => {
    const codec = typeFromString(
      {
        prop1: {
          position: [1, 2],
          codec: NumberFromString,
        },
        prop2: {
          position: [5, 9],
          codec: BooleanFromString,
        },
      },
      "TestCodec"
    );

    expect(
      codec.encode({
        prop1: 2,
        prop2: true,
      })
    ).toEqual({
      prop1: "2",
      prop2: "true",
    });
  });
});
