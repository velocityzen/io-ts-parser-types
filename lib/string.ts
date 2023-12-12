import { map } from "fp-ts/Array";
import { Chain } from "fp-ts/Either";
import { isString, toLowerCase, trim } from "fp-ts/string";
import * as t from "io-ts";

export const toLowerCaseIfString = (a: unknown) =>
  isString(a) ? toLowerCase(a) : a;

export const mapToLowerCaseIfString = map(toLowerCaseIfString);

export const trimIfString = (a: unknown) => (isString(a) ? trim(a) : a);

/**
 * Use to validate a field value is a string and trimming to be safe
 **/
export const TrimmedString = new t.Type(
  "TrimmedString",
  t.string.is,
  (u, c) => Chain.chain(t.string.validate(u, c), (s) => t.success(s.trim())),
  t.identity,
);
