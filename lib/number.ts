import Decimal from "decimal.js";
import * as E from "fp-ts/Either";
import { flow, pipe } from "fp-ts/function";
import * as t from "io-ts";

function getNumberAsString(c: t.Context, regexp?: RegExp) {
  return (str: string): t.Validation<string> => {
    const strTrimmed = str.trim();

    if (regexp) {
      const match = strTrimmed.match(regexp);
      if (!match) {
        return t.failure(str, c, "regular expression did not find a match");
      }

      if (typeof match[1] === "undefined") {
        return t.failure(
          str,
          c,
          "no capturing group present in the regular expression",
        );
      }

      return t.success(match[1].replaceAll(",", ""));
    }

    return t.success(strTrimmed.replaceAll(",", ""));
  };
}

export interface NumberFromOptions {
  regexp?: RegExp;
  name?: string;
}

/**
 *  generic codec creation function for integer values
 *  @param {RegExp} [regexp] - optional, RegExp, matches string and returns **first** group as a number, ignores commas as a thousand separator
 *  @param {string} [name] - optional, name of the codec
 **/
export function integerFrom(options?: NumberFromOptions) {
  return new t.Type<number, number, unknown>(
    options?.name ?? "IntegerFromString",
    t.Int.is,
    (u, c) =>
      pipe(
        t.string.validate(u, c),
        E.flatMap(getNumberAsString(c, options?.regexp)),
        E.flatMap((str) =>
          str.includes(".")
            ? t.failure<string>(str, c, "cannot parse to an integer")
            : t.success(str),
        ),
        E.flatMap((str) => {
          const n = parseInt(str, 10);
          return Number.isNaN(n)
            ? t.failure(u, c, "cannot parse to an integer")
            : t.success(n);
        }),
      ),

    t.identity,
  );
}

/**
 *  generic codec creation function for float values
 *  @param {RegExp} [regexp] - optional, RegExp, matches string and returns **first** group as a number, ignores commas as a thousand separator
 *  @param {string} [name] - optional, name of the codec
 **/
export function floatFrom(options?: NumberFromOptions) {
  return new t.Type<number, number, unknown>(
    options?.name ?? "FloatFromString",
    t.Int.is,
    (u, c) =>
      pipe(
        t.string.validate(u, c),
        E.flatMap(getNumberAsString(c, options?.regexp)),
        E.flatMap((str) => {
          const n = parseFloat(str);
          return Number.isNaN(n)
            ? t.failure(u, c, "cannot parse to an integer")
            : t.success(n);
        }),
      ),
    t.identity,
  );
}

export interface DecimalFromOptions extends Decimal.Config, NumberFromOptions {
  decimals: number;
}

/**
 *  generic codec creation function for decimal values
 *  @param {intger} decimals - max number of decimal digits to allow
 *  @param {RegExp} [regexp] - RegExp, matches string and returns **first** group as a number, ignores commas as a thousand separator
 *  @param {string} [name] - name of the codec
 *  @param [precision] - The maximum number of significant digits of the result of an operation.
 *  @param [rounding] - The default rounding mode used when rounding the result of an operation to precision significant digits
 *  @param [minE] - The negative exponent limit, i.e. the exponent value below which underflow to zero occurs.
 *  @param [maxE] - The positive exponent limit, i.e. the exponent value above which overflow to Infinity occurs.
 *  @param [toExpNeg] - The negative exponent value at and below which toString returns exponential notation.
 *  @param [toExpPos] - The positive exponent value at and above which toString returns exponential notation.
 *  @param [modulo] - The modulo mode used when calculating the modulus: a mod n.
 *  @param [crypto] - The value that determines whether cryptographically-secure pseudo-random number generation is used.
 *  for more info http://mikemcl.github.io/decimal.js/#constructor-properties
 **/
export function decimalFrom(options: DecimalFromOptions) {
  const D = Decimal.clone(options);

  const toDecimal = E.tryCatchK((n: Decimal.Value) => {
    const decimal = new D(n);
    const decimals = decimal.decimalPlaces();
    if (decimals > options.decimals) {
      throw new Error(
        `Expected less than ${options.decimals} decimals but received ${decimals}`,
      );
    }

    return decimal;
  }, E.toError);

  function is(n: unknown): n is Decimal {
    return n instanceof D;
  }

  return new t.Type<Decimal, string, unknown>(
    options.name ?? "DecimalFromString",
    is,
    (u, c) =>
      pipe(
        t.string.validate(u, c),
        E.flatMap(getNumberAsString(c, options.regexp)),
        E.flatMap(
          flow(
            toDecimal,
            E.match((e) => t.failure<Decimal>(u, c, e.message), t.success),
          ),
        ),
      ),
    (n) => n.toSignificantDigits().valueOf(),
  );
}

/*
 * For use with a field that shouldn't be null and you want to cast to a number
 */
export const ZeroFromNull = new t.Type<number, number, unknown>(
  "ZeroFromNull",
  t.number.is,
  (u, c) =>
    pipe(
      t.null.validate(u, c),
      E.flatMap(() => t.success(0)),
    ),
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
    pipe(
      t.string.validate(u, c),
      E.flatMap((str) =>
        /^[^%]+%$/.test(str.trim())
          ? t.success(str)
          : t.failure<string>(
              u,
              c,
              `${str} should contain a single trailing % character`,
            ),
      ),
      E.flatMap((str) => {
        const n = parseFloat(str);
        return Number.isNaN(n)
          ? t.failure(u, c, `cannot parse ${str} to a number`)
          : t.success(n / 100);
      }),
    ),

  t.identity,
);
