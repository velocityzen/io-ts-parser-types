import { Equal, Expect } from "@type-challenges/utils";
import { OutputOf, TypeOf } from "io-ts";
import { BooleanFromString, NumberFromString } from "io-ts-types";
import { describe, expect, test } from "vitest";
import { codecTypeFromSeparatedValues, typeFromSeparatedValues } from "../lib";
import { decode } from "../lib/helpers";

describe("typeFromSeparatedValues", () => {
  test("decode", () => {
    const codec = typeFromSeparatedValues(
      "|",
      {
        prop1: {
          position: 1,
          codec: NumberFromString,
        },
        prop2: {
          position: 0,
          codec: BooleanFromString,
        },
      },
      "TestCodec",
    );

    type I = TypeOf<typeof codec>;
    type O = OutputOf<typeof codec>;

    type _Tests = [
      Expect<Equal<I, { prop1: number; prop2: boolean }>>,
      Expect<Equal<O, { prop1: string; prop2: string }>>,
    ];

    expect(decode(codec, "true|78")).toEqual({
      prop1: 78,
      prop2: true,
    });
  });

  test("encode", () => {
    const codec = typeFromSeparatedValues(
      "|",
      {
        prop1: {
          position: 1,
          codec: NumberFromString,
        },
        prop2: {
          position: 0,
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
});

describe("codecTypeFromSeparatedValues", () => {
  test("decode", () => {
    const codec = codecTypeFromSeparatedValues(
      "|",
      {
        prop1: {
          position: 1,
          codec: NumberFromString,
        },
        prop2: {
          position: 0,
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

    expect(decode(codec, "true|78")).toEqual({
      prop1: 78,
      prop2: true,
    });
  });

  test("encode", () => {
    const codec = codecTypeFromSeparatedValues(
      "|",
      {
        prop1: {
          position: 1,
          codec: NumberFromString,
        },
        prop2: {
          position: 0,
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
    ).toEqual("true|2");
  });
});
