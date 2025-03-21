import { flow, pipe } from "fp-ts/lib/function";
import * as R from "fp-ts/lib/Record";
import * as S from "fp-ts/lib/string";
import * as E from "fp-ts/lib/Either";
import * as A from "fp-ts/lib/Array";
import * as t from "io-ts";
import { getTypeDefinition } from "./helpers";

type Position = number[];

export type FromStringSchema<P> = Record<keyof P, Position>;

export type PropsFromString = Record<
  string,
  {
    position: Position;
    codec: t.Mixed;
  }
>;

export type TypeCFromString<P extends PropsFromString> = t.InterfaceType<
  P,
  { [K in keyof P]: t.TypeOf<P[K]["codec"]> },
  { [K in keyof P]: t.OutputOf<P[K]["codec"]> }
> & { readonly schema: FromStringSchema<P> };

export function typeFromString<P extends PropsFromString>(
  propsSchema: P,
  name: string,
): TypeCFromString<P> {
  const { schema, props } = getTypeDefinition<P, Position>(propsSchema);

  const typeCodec = t.type(props);
  const interfaceType = new t.InterfaceType(
    name,
    typeCodec.is,
    (u, c) =>
      pipe(
        t.string.validate(u, c),
        E.map(toRecordWith(schema)),
        E.flatMap((r) => typeCodec.validate(r, c)),
      ),

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

function toRecordWith<P>(schema: FromStringSchema<P>) {
  return (str: string): unknown =>
    pipe(
      schema,
      R.toEntries,
      A.reduce({} as Record<string, string>, (record, [name, position]) => {
        const fieldValue = str.substring(position[0], position[1]);
        record[name] = fieldValue;
        return record;
      }),
    );
}

export type CodecTypeCFromString<P extends PropsFromString> = t.InterfaceType<
  P,
  { [K in keyof P]: t.TypeOf<P[K]["codec"]> },
  string
> & { readonly schema: FromStringSchema<P> };

export function codecTypeFromString<P extends PropsFromString>(
  propsSchema: P,
  name: string,
): CodecTypeCFromString<P> {
  const { schema, props } = getTypeDefinition<P, Position>(propsSchema);

  const typeCodec = t.type(props);
  const interfaceType = new t.InterfaceType(
    name,
    typeCodec.is,
    (u, c) =>
      pipe(
        t.string.validate(u, c),
        E.map(toRecordWith(schema)),
        E.flatMap((r) => typeCodec.validate(r, c)),
      ),
    flow(typeCodec.encode, toStringWith(schema)),
    props,
  );

  // typescript type inheretance got confused
  const codec = interfaceType as unknown as CodecTypeCFromString<P>;
  // keep schema for loging and debugging
  Object.defineProperty(codec, "schema", {
    value: schema,
    writable: false,
  });

  return codec;
}

function toStringWith<P>(schema: FromStringSchema<P>) {
  return (props: Record<string, string>): string =>
    pipe(
      schema,
      R.toEntries,
      A.reduce("", (str, [name, position]) => {
        const value = props[name] ?? "";
        const maxLength = position[1] - position[0];
        const valueString = pipe(
          String(value),
          S.slice(0, maxLength),
          pad(maxLength, " ", typeof value === "number"),
        );

        str = str.padEnd(position[0], " ");
        return (
          str.substring(0, position[0]) +
          valueString +
          str.substring(position[1])
        );
      }),
    );
}

function pad(maxLength: number, fillString = " ", end: boolean) {
  return end
    ? (str: string) => str.padStart(maxLength, fillString)
    : (str: string) => str.padEnd(maxLength, fillString);
}
