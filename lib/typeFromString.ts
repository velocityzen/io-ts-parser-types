import { pipe } from "fp-ts/function";
import { toEntries } from "fp-ts/Record";
import { reduce } from "fp-ts/Array";
import { Chain } from "fp-ts/Either";
import { InterfaceType, type, string } from "io-ts";

import { TypeDefinition, PropsFromString, TypeCFromString } from "./types";
import { fromString } from "./helpers";

export function typeFromString<P extends PropsFromString>(
  props: P,
  name: string
): TypeCFromString<P> {
  const { schema, typeProps } = pipe(
    props,
    toEntries,
    reduce(
      { schema: {}, typeProps: {} } as TypeDefinition,
      (defs, [key, { position, codec }]) => {
        defs.schema[key] = position;
        defs.typeProps[key] = codec;
        return defs;
      }
    )
  );

  const typeCodec = type(typeProps);
  const result = new InterfaceType(
    name,
    typeCodec.is,
    (u, c) =>
      Chain.chain(string.validate(u, c), (s) => {
        const record = fromString(s, schema);
        return typeCodec.validate(record, c);
      }),
    typeCodec.encode,
    type
  );

  // typescript type inheretance got confused
  return result as unknown as TypeCFromString<P>;
}
