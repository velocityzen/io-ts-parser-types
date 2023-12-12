import { Chain } from "fp-ts/Either";
import * as t from "io-ts";

enum NumberAsStringError {
  NoMatch,
  NoGroup,
}

function getNumberAsString(
  str: string,
  regexp?: RegExp,
): NumberAsStringError | string {
  const strTrimmed = str.trim();

  if (regexp) {
    const match = strTrimmed.match(regexp);
    if (!match) {
      return NumberAsStringError.NoMatch;
    }

    if (typeof match[1] === "undefined") {
      return NumberAsStringError.NoGroup;
    }

    return match[1].replaceAll(",", "");
  }

  return strTrimmed.replaceAll(",", "");
}

export interface NumberFromOptions {
  regexp?: RegExp;
  name?: string;
}

/**
 *  generic codec creation function for integer values
 *  - regexp - optional, RegExp, matches string and returns **first** group as a number, ignores commas as a thousand separator
 *  - name - optional, name of the codec
 **/
export function integerFrom(options?: NumberFromOptions) {
  return new t.Type<number, number, unknown>(
    options?.name ?? "IntegerFromString",
    t.Int.is,
    (u, c) =>
      Chain.chain(t.string.validate(u, c), (s) => {
        const str = getNumberAsString(s, options?.regexp);

        if (str === NumberAsStringError.NoMatch) {
          return t.failure(u, c, "regular expression did not find a match");
        }

        if (str === NumberAsStringError.NoGroup) {
          return t.failure(
            u,
            c,
            "no capturing group present in the regular expression",
          );
        }

        if (str.includes(".")) {
          return t.failure(u, c, "cannot parse to an integer");
        }

        const n = parseInt(str, 10);
        return Number.isNaN(n)
          ? t.failure(u, c, "cannot parse to an integer")
          : t.success(n);
      }),
    t.identity,
  );
}

/**
 *  generic codec creation function for float values
 *  - regexp - optional, RegExp, matches string and returns **first** group as a number, ignores commas as a thousand separator
 *  - name - optional, name of the codec
 **/
export function floatFrom(options?: NumberFromOptions) {
  return new t.Type<number, number, unknown>(
    options?.name ?? "FloatFromString",
    t.Int.is,
    (u, c) =>
      Chain.chain(t.string.validate(u, c), (s) => {
        const str = getNumberAsString(s, options?.regexp);

        if (str === NumberAsStringError.NoMatch) {
          return t.failure(u, c, "regular expression did not find a match");
        }

        if (str === NumberAsStringError.NoGroup) {
          return t.failure(
            u,
            c,
            "no capturing group present in the regular expression",
          );
        }

        const n = parseFloat(str);
        return Number.isNaN(n)
          ? t.failure(u, c, "cannot parse to an integer")
          : t.success(n);
      }),
    t.identity,
  );
}

/*
 * For use with a field that shouldn't be null and you want to cast to a number
 */
export const ZeroFromNull = new t.Type<number, number, unknown>(
  "ZeroFromNull",
  t.number.is,
  (u, c) => Chain.chain(t.null.validate(u, c), () => t.success(0)),
  t.identity,
);

/*
 * For fields that should be converted to a percent value as a decimal (e.g., 58% -> 0.58).
 * It drops the "%" and divides by 100.
 */
export const DecimalFromPercentString = new t.Type<number, number, unknown>(
  "DecimalFromPercentString",
  t.number.is,
  (u, c) =>
    Chain.chain(t.string.validate(u, c), (s: string) => {
      if (!s.trim().match(/^[^%]+%$/)) {
        return t.failure(
          u,
          c,
          `${s} should contain a single trailing % character`,
        );
      }

      const n = parseFloat(s);
      return Number.isNaN(n)
        ? t.failure(u, c, `cannot parse ${s} to a number`)
        : t.success(n / 100);
    }),
  t.identity,
);
