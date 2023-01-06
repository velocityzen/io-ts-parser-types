import { isLeft } from "fp-ts/Either";
import { slice } from "fp-ts/string";
import { reduce } from "fp-ts/Array";
import { pipe } from "fp-ts/function";
import { toEntries } from "fp-ts/Record";

import { Type, UnknownRecord, string } from "io-ts";

import { FromStringSchema } from "./types";

/**
 * returns value if succeed and undefined otherwise
 **/
export function decode<I, O>(
  codec: Type<I, O, unknown>,
  value: unknown
): undefined | I {
  const v = codec.decode(value);
  if (isLeft(v)) {
    return undefined;
  }

  return v.right;
}

function padLeft(maxLength: number, fillString = " ") {
  return (str: string) => str.padEnd(maxLength, fillString);
}

export function fromString(str: string, schema: FromStringSchema): unknown {
  return pipe(
    schema,
    toEntries,
    reduce({} as Record<string, string>, (record, [name, position]) => {
      const fieldValue = str.substring(position[0], position[1]);
      record[name] = fieldValue.trim();
      return record;
    })
  );
}

export function toString(
  props: Record<string, string>,
  schema: FromStringSchema
): string {
  return pipe(
    schema,
    toEntries,
    reduce("", (str, [name, position]) => {
      const maxLength = position[1] - position[0];
      const value = pipe(
        String(props[name]),
        slice(0, maxLength),
        padLeft(maxLength, " ")
      );

      str = str.padEnd(position[0], " ");
      return str.substring(0, position[0]) + value + str.substring(position[1]);
    })
  );
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
