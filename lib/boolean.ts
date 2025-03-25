import { fold, left, right } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import * as t from "io-ts";

import { trimIfString } from "./string";

export type BooleanFromOptions = { strict?: boolean } & (
  | {
      true: unknown;
      false: unknown;
    }
  | {
      true: unknown;
    }
  | {
      false: unknown;
    }
);

function hasBoth(values: BooleanFromOptions): values is {
  true: unknown;
  false: unknown;
} {
  return Object.hasOwn(values, "true") && Object.hasOwn(values, "false");
}

function hasOnlyTrue(values: BooleanFromOptions): values is {
  true: unknown;
} {
  return Object.hasOwn(values, "true") && !Object.hasOwn(values, "false");
}

/*function hasOnlyFalse(values: BooleanFromOptions): values is {
  false: unknown;
} {
  return Object.hasOwn(values, "false") && !Object.hasOwn(values, "true");
}*/

function getBooleanFrom(values: BooleanFromOptions) {
  if (hasBoth(values)) {
    const trueNormalized = trimIfString(values.true);
    const falseNormalized = trimIfString(values.false);
    const description = `${values.strict ? "Strict " : ""}True: "${String(
      trueNormalized,
    )}" / False: "${String(falseNormalized)}"`;

    const match = (u: unknown) => {
      if (u === trueNormalized) {
        return right(true);
      }

      if (u === falseNormalized) {
        return right(false);
      }

      return left(null);
    };

    return { match, description };
  }

  if (hasOnlyTrue(values)) {
    const trueNormalized = trimIfString(values.true);
    const description = `${values.strict ? "Strict " : ""}True: "${String(
      trueNormalized,
    )}"`;

    const match = (u: unknown) => {
      if (u === trueNormalized) {
        return right(true);
      }

      return values.strict ? left(null) : right(false);
    };

    return { match, description };
  }

  // if (hasOnlyFalse(values)) {
  const falseNormalized = trimIfString(values.false);
  const description = `${values.strict ? "Strict " : ""}False: "${String(
    falseNormalized,
  )}"`;

  const match = (u: unknown) => {
    if (u === falseNormalized) {
      return right(false);
    }

    return values.strict ? left(null) : right(true);
  };

  return { match, description };
  // }
}

/**
 * generic boolean codec creator function.
 **/
export function booleanFrom(
  values: BooleanFromOptions,
  name?: string,
): t.Type<boolean, boolean> {
  const { match, description } = getBooleanFrom(values);

  return new t.Type<boolean, boolean, unknown>(
    name ?? `BooleanFrom (${description})`,
    t.boolean.is,
    (u, c) =>
      pipe(
        u,
        trimIfString,
        match,
        fold(
          () =>
            t.failure(
              u,
              c,
              `cannot parse to a boolean, expected ${description}`,
            ),
          t.success,
        ),
      ),
    t.identity,
  );
}
