import * as O from "fp-ts/lib/Option";
import * as S from "fp-ts/lib/string";
import * as E from "fp-ts/lib/Either";
import { pipe, constant } from "fp-ts/lib/function";
import * as t from "io-ts";

export type BooleanFromOptions = {
  strict?: boolean;
  caseSensitive?: boolean;
} & (
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

function normalizeValue(caseSensitive = true) {
  return (a: unknown) =>
    pipe(
      a,
      O.fromPredicate(S.isString),
      O.map(S.trim),
      O.map((s) => (caseSensitive ? s : s.toLowerCase())),
      O.getOrElseW(constant(a)),
    );
}

function getBooleanFrom(options: BooleanFromOptions) {
  const normalize = normalizeValue(options.caseSensitive);

  if (hasBoth(options)) {
    const trueNormalized = normalize(options.true);
    const falseNormalized = normalize(options.false);

    const description = `${options.strict ? "Strict " : ""}True: "${String(
      trueNormalized,
    )}" / False: "${String(falseNormalized)}"`;

    const match = (u: unknown) => {
      const value = normalize(u);

      if (value === trueNormalized) {
        return E.right(true);
      }

      if (value === falseNormalized) {
        return E.right(false);
      }

      return E.left(null);
    };

    return { match, description };
  }

  if (hasOnlyTrue(options)) {
    const trueNormalized = normalize(options.true);
    const description = `${options.strict ? "Strict " : ""}True: "${String(
      trueNormalized,
    )}"`;

    const match = (u: unknown) => {
      const value = normalize(u);
      if (value === trueNormalized) {
        return E.right(true);
      }

      return options.strict ? E.left(null) : E.right(false);
    };

    return { match, description };
  }

  // if (hasOnlyFalse(values)) {
  const falseNormalized = normalize(options.false);
  const description = `${options.strict ? "Strict " : ""}False: "${String(
    falseNormalized,
  )}"`;

  const match = (u: unknown) => {
    const value = normalize(u);
    if (value === falseNormalized) {
      return E.right(false);
    }

    return options.strict ? E.left(null) : E.right(true);
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
        match,
        E.match(
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
