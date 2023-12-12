import { getOrElseW } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import * as t from "io-ts";

/**
 * returns value if succeed or undefined otherwise
 **/
export function decodeOrUndefined<A, O>(
  { decode }: t.Type<A, O, unknown>,
  value: unknown,
): undefined | A {
  return pipe(
    value,
    decode,
    getOrElseW(() => undefined),
  );
}
