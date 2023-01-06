import { Chain } from "fp-ts/Either";
import { Mixed, Type, appendContext, failure, success } from "io-ts";

import { mergeAll } from "./helpers";

import { MatchPartialC } from "./types";

type TypeDefinition = {
  caseCodecs: Mixed[];
  matchCodecs: Mixed[];
};

export function matchPartial<
  P extends Array<[Mixed, Mixed]>,
  A,
  O = A,
  I = unknown
>(
  match: Type<A, O, I>,
  cases: P,
  name = `MatchPartial<${match.name}>`
): MatchPartialC<P, A, O, I> {
  const { caseCodecs, matchCodecs } = cases.reduce<TypeDefinition>(
    (defs, [c, m]) => {
      defs.caseCodecs.push(c);
      defs.matchCodecs.push(m);
      return defs;
    },
    { caseCodecs: [], matchCodecs: [] }
  );

  const codec = new Type<A, O, I>(
    name,
    (u): u is A => {
      if (!match.is(u)) {
        return false;
      }

      return caseCodecs.some((c) => c.is(u));
    },

    (u, c) =>
      Chain.chain(match.validate(u, c), (a) => {
        const index = caseCodecs.findIndex((c) => c.is(a));
        if (index === -1) {
          const errorContext = appendContext(c, "match", match, a);
          return failure(u, errorContext, "does not match any case");
        }

        const codec = matchCodecs[index];
        const context = appendContext(c, String(index), codec, u);
        return Chain.chain(codec.validate(u, context), (o) =>
          success(mergeAll(a, o))
        );
      }),

    (o) => {
      const index = caseCodecs.findIndex((c) => c.is(o));
      if (index === -1) {
        return match.encode(o);
      }

      const codec = matchCodecs[index];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return mergeAll(match.encode(o), codec.encode(o));
    }
  );

  return codec as MatchPartialC<P, A, O, I>;
}
