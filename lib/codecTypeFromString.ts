import { pipe } from "fp-ts/function";
import { toEntries } from "fp-ts/Record";
import { reduce } from "fp-ts/Array";
import { Chain } from "fp-ts/Either";
import { InterfaceType, type, string } from "io-ts";

import { TypeDefinition, PropsFromString, CodecTypeCFromString } from "./types";
import { fromString, toString } from "./helpers";

export function codecTypeFromString<P extends PropsFromString>(
  propsSchema: P,
  name: string,
): CodecTypeCFromString<P> {
  const { schema, props } = pipe(
    propsSchema,
    toEntries,
    reduce(
      { schema: {}, props: {} } as TypeDefinition,
      (defs, [key, { position, codec }]) => {
        defs.schema[key] = position;
        defs.props[key] = codec;
        return defs;
      },
    ),
  );

  const typeCodec = type(props);
  const result = new InterfaceType(
    name,
    typeCodec.is,
    (u, c) =>
      Chain.chain(string.validate(u, c), (s) => {
        const record = fromString(s, schema);
        return typeCodec.validate(record, c);
      }),
    (o) => {
      const props = typeCodec.encode(o);
      return toString(props, schema);
    },
    props,
  );

  // typescript type inheretance got confused
  return result as unknown as CodecTypeCFromString<P>;
}
