import { BooleanFromString, NumberFromString } from "io-ts-types";
import { describe, expect, test } from "vitest";
import { codecTypeFromString } from "../lib";
import { decode } from "../lib/helpers";
import { Expect, Equal } from "@type-challenges/utils";
import { TypeOf, OutputOf } from "io-ts";

describe("codecTypeFromString", () => {
  test("decode", () => {
    const codec = codecTypeFromString(
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
      "TestCodec",
    );

    type I = TypeOf<typeof codec>;
    type O = OutputOf<typeof codec>;

    type _Tests = [
      Expect<Equal<I, { prop1: number; prop2: boolean }>>,
      Expect<Equal<O, string>>,
    ];

    expect(decode(codec, "12345true78")).toEqual({
      prop1: 2,
      prop2: true,
    });
  });

  test("encode", () => {
    const codec = codecTypeFromString(
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
      "TestCodec",
    );

    expect(
      codec.encode({
        prop1: 2,
        prop2: true,
      }),
    ).toEqual(" 2   true");
  });
});
