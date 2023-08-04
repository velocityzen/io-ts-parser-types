import * as t from "io-ts";
import { NumberFromString, BooleanFromString } from "io-ts-types";

import { decode } from "../lib/helpers";
import { typeFromRegexp } from "../lib";

describe("typeFromRegexp", () => {
  const rx = /p(?<prop>\d+)\/v(?<value>.+)/i;

  test("decode", () => {
    const dataCodec = t.type({
      prop: NumberFromString,
      value: BooleanFromString,
    });

    const codec = typeFromRegexp(rx, dataCodec);

    expect(decode(codec, "p123/vtrue")).toEqual({
      prop: 123,
      value: true,
    });
  });

  test("decode", () => {
    const dataCodec = t.type({
      prop: NumberFromString,
      value: BooleanFromString,
    });

    const codec = typeFromRegexp(rx, dataCodec);

    expect(decode(codec, "p123vtrue")).toEqual(undefined);
  });
});
