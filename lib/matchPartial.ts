import { Chain } from "fp-ts/Either";
import { Mixed, Type, appendContext, failure, success } from "io-ts";

import { mergeAll } from "./helpers";

export class MatchPartialType<A, O = A, I = unknown> extends Type<A, O, I> {
  private cases: Array<Mixed> = [];
  private matches: Array<Mixed> = [];

  constructor(name: string, match: Type<A, O, I>) {
    super(
      name,
      (u): u is A => {
        if (!match.is(u)) {
          return false;
        }

        return this.cases.some((c) => c.is(u));
      },

      (u, c) =>
        Chain.chain(match.validate(u, c), (a) => {
          const index = this.cases.findIndex((c) => c.is(a));
          if (index === -1) {
            const errorContext = appendContext(c, "match", match, a);
            return failure(u, errorContext, "does not match any case");
          }

          const codec = this.matches[index];
          const context = appendContext(c, String(index), codec, u);
          return Chain.chain(codec.validate(u, context), (o) =>
            success(mergeAll(a, o))
          );
        }),

      (o) => {
        const index = this.cases.findIndex((c) => c.is(o));
        if (index === -1) {
          return match.encode(o);
        }

        const codec = this.matches[index];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return mergeAll(match.encode(o), codec.encode(o));
      }
    );
  }

  case(caseCodec: Mixed, matchCodec: Mixed) {
    this.cases.push(caseCodec);
    this.matches.push(matchCodec);
    return this;
  }
}

export function matchPartial<A, O = A, I = unknown>(
  match: Type<A, O, I>,
  name = `MatchPartial<${match.name}>`
) {
  return new MatchPartialType(name, match);
}
