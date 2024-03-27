import * as E from "fp-ts/Either";
import { constUndefined, pipe } from "fp-ts/function";
import * as t from "io-ts";

/**
 * returns value if succeed or undefined otherwise
 **/
export function decodeOrUndefined<A, O>(
  { decode }: t.Type<A, O, unknown>,
  value: unknown,
): undefined | A {
  return pipe(value, decode, E.getOrElseW(constUndefined));
}

/**
 * returns value if succeed or undefined otherwise
 **/
export function decodeEncodeOrUndefined<A, O>(
  { decode, encode }: t.Type<A, O, unknown>,
  value: unknown,
): undefined | O {
  return pipe(value, decode, E.map(encode), E.getOrElseW(constUndefined));
}
