import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import * as R from "fp-ts/lib/Record";
import * as A from "fp-ts/lib/Array";
import * as t from "io-ts";

import { Type, UnknownRecord, string } from "io-ts";

interface TypeDefinition<P> {
  schema: Record<string, P>;
  props: t.Props;
}

export function getTypeDefinition<
  /* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters */
  S extends Record<
    string,
    {
      position: P;
      codec: t.Mixed;
    }
  >,
  P,
>(propsSchema: S): TypeDefinition<P> {
  return pipe(
    propsSchema,
    R.toEntries,
    A.reduce(
      { schema: {}, props: {} } as TypeDefinition<P>,
      (defs, [key, { position, codec }]) => {
        defs.schema[key] = position;
        defs.props[key] = codec;
        return defs;
      },
    ),
  );
}

/**
 * returns value if succeed and undefined otherwise
 **/
export function decode<I, O>(codec: Type<I, O>, value: unknown): undefined | I {
  const v = codec.decode(value);
  if (E.isLeft(v)) {
    return undefined;
  }

  return v.right;
}

function mergeStrings(first: string, second: string): string {
  return Array.from(second)
    .reduce((res, letter, index) => {
      if (!res[index] || res[index] === " ") {
        res[index] = letter;
      }

      return res;
    }, Array.from(first))
    .join("");
}

export function mergeAll<A, B>(first: A, second: B): B | (A & B) {
  if ((first as unknown) === (second as unknown)) {
    return second;
  }

  const isSecondPrimitive = !UnknownRecord.is(second);
  if (isSecondPrimitive) {
    if (string.is(first) && string.is(second)) {
      return mergeStrings(first, second) as unknown as B; // B is a string obviously
    }

    return second;
  }

  const isFirstPrimitive = !UnknownRecord.is(first);
  if (isFirstPrimitive) {
    return second;
  }

  return {
    ...first,
    ...second,
  };
}
