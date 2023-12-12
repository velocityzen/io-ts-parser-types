import * as t from "io-ts";

import {
  mapToLowerCaseIfString,
  toLowerCaseIfString,
  trimIfString,
} from "./string";

export interface NullFromOptions {
  match: unknown[];
  caseSensitive?: boolean;
}

export function nullFrom(options: NullFromOptions) {
  const caseSensitive = options.caseSensitive ?? true;
  const match = caseSensitive
    ? options.match
    : mapToLowerCaseIfString(options.match);
  const matchTo = new Set(match);

  return new t.Type<null, null, unknown>(
    "NullFrom",
    t.null.is,
    (u, c) => {
      if (u === undefined || t.null.is(u)) {
        return t.success(null);
      }

      return matchTo.has(
        trimIfString(caseSensitive ? u : toLowerCaseIfString(u)),
      )
        ? t.success(null)
        : t.failure(u, c, "cannot parse to a null");
    },
    t.identity,
  );
}
