import { Equal, Expect } from "@type-challenges/utils";
import { OutputOf, TypeOf } from "io-ts";
import { BooleanFromString, NumberFromString } from "io-ts-types";
import { describe, expect, test } from "vitest";
import { typeFromString } from "../lib";
import { decode } from "../lib/helpers";

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
      "TestCodec",
    );

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
      "TestCodec",
    );

    expect(
      codec.encode({
        prop1: 2,
        prop2: true,
      }),
    ).toEqual({
      prop1: "2",
      prop2: "true",
    });
  });

  test("types", () => {
    const prop1 = {
      position: [1, 2],
      codec: NumberFromString,
    };

    const prop2 = {
      position: [5, 9],
      codec: BooleanFromString,
    };

    const _codec = typeFromString(
      {
        prop1,
        prop2,
      },
      "TestCodec",
    );

    type I = TypeOf<typeof _codec>;
    type O = OutputOf<typeof _codec>;

    type _Tests = [
      Expect<Equal<I, { prop1: number; prop2: boolean }>>,
      Expect<Equal<O, { prop1: string; prop2: string }>>,
    ];

    expect(true).toBe(true);
  });
});
