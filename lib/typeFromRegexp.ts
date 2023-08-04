import { Chain } from "fp-ts/Either";
import { Type, string, failure } from "io-ts";

export function typeFromRegexp<A, O>(
  regexp: RegExp,
  codec: Type<A, O, unknown>,
  name = `TypeFromRegexp<${codec.name}>`,
) {
  return new Type<A, O, unknown>(
    name,
    codec.is,
    (u, c) =>
      Chain.chain(string.validate(u, c), (str) => {
        const match = str.match(regexp);

        if (!match) {
          return failure(u, c, "does not match anything");
        }

        if (!match.groups) {
          return failure(
            u,
            c,
            "regexp does have any named capturing group. Use (?<name>pattern)",
          );
        }

        return codec.decode(match.groups);
      }),
    codec.encode,
  );
}
