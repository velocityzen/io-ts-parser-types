import { pipe } from "fp-ts/function";
import { toEntries } from "fp-ts/Record";
import { reduce } from "fp-ts/Array";
import { Chain } from "fp-ts/Either";
import { InterfaceType, type, string } from "io-ts";

import { TypeDefinition, PropsFromString, TypeCFromString } from "./types";
import { fromString } from "./helpers";

export function typeFromString<P extends PropsFromString>(
  propsSchema: P,
  name: string,
): TypeCFromString<P> {
  const { schema, props } = pipe(
    propsSchema,
    toEntries,
    reduce(
      { schema: {}, props: {} } as TypeDefinition<P>,
      (defs, [key, { position, codec }]) => {
        defs.schema[key as keyof P] = position;
        defs.props[key] = codec;
        return defs;
      },
    ),
  );

  const typeCodec = type(props);
  const interfaceType = new InterfaceType(
    name,
    typeCodec.is,
    (u, c) =>
      Chain.chain(string.validate(u, c), (s) => {
        const record = fromString(s, schema);
        return typeCodec.validate(record, c);
      }),
    typeCodec.encode,
    props,
  );

  // typescript type inheretance got confused
  const codec = interfaceType as unknown as TypeCFromString<P>;
  // keep schema for loging and debugging
  Object.defineProperty(codec, "schema", {
    value: schema,
    writable: false,
  });

  return codec;
}
