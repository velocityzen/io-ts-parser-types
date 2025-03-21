import { flow, pipe } from "fp-ts/lib/function";
import * as R from "fp-ts/lib/Record";
import * as S from "fp-ts/lib/string";
import * as E from "fp-ts/lib/Either";
import * as RNEA from "fp-ts/lib/ReadonlyNonEmptyArray";
import * as A from "fp-ts/lib/Array";
import * as t from "io-ts";
import { getTypeDefinition } from "./helpers";

export type FromSeparatedValuesSchema<P> = Record<keyof P, number>;

export type PropsFromSeparatedValues = Record<
  string,
  {
    position: number;
    codec: t.Mixed;
  }
>;

export type TypeCFromSeparatedValues<P extends PropsFromSeparatedValues> =
  t.InterfaceType<
    P,
    { [K in keyof P]: t.TypeOf<P[K]["codec"]> },
    { [K in keyof P]: t.OutputOf<P[K]["codec"]> }
  > & { schema: FromSeparatedValuesSchema<P> };

export function typeFromSeparatedValues<P extends PropsFromSeparatedValues>(
  separator: string | RegExp,
  propsSchema: P,
  name: string,
): TypeCFromSeparatedValues<P> {
  const { schema, props } = getTypeDefinition<P, number>(propsSchema);

  const typeCodec = t.type(props);
  const interfaceType = new t.InterfaceType(
    name,
    typeCodec.is,
    (u, c) =>
      pipe(
        t.string.validate(u, c),
        E.map(S.split(separator)),
        E.map(toRecordWith(schema)),
        E.flatMap((r) => typeCodec.validate(r, c)),
      ),
    typeCodec.encode,
    props,
  );

  // typescript type inheretance got confused
  const codec = interfaceType as unknown as TypeCFromSeparatedValues<P>;
  // keep schema for loging and debugging
  Object.defineProperty(codec, "schema", {
    value: schema,
    writable: false,
  });

  return codec;
}

function toRecordWith<P>(schema: FromSeparatedValuesSchema<P>) {
  return (arr: RNEA.ReadonlyNonEmptyArray<string>) =>
    pipe(
      schema,
      R.toEntries,
      A.reduce({} as Record<string, string>, (record, [name, position]) => {
        const fieldValue = arr[position];
        record[name] = fieldValue;
        return record;
      }),
    );
}

export type CodecTypeCFromSeparatedValues<P extends PropsFromSeparatedValues> =
  t.InterfaceType<P, { [K in keyof P]: t.TypeOf<P[K]["codec"]> }, string> & {
    readonly schema: FromSeparatedValuesSchema<P>;
  };

export function codecTypeFromSeparatedValues<
  P extends PropsFromSeparatedValues,
>(
  separator: string,
  propsSchema: P,
  name: string,
): CodecTypeCFromSeparatedValues<P> {
  const { schema, props } = getTypeDefinition<P, number>(propsSchema);
  const encodeSchema = pipe(
    schema,
    R.toEntries,
    A.reduce([] as string[], (s, [key, position]) => {
      s[position] = key;
      return s;
    }),
  );

  const typeCodec = t.type(props);
  const interfaceType = new t.InterfaceType(
    name,
    typeCodec.is,
    (u, c) =>
      pipe(
        t.string.validate(u, c),
        E.map(S.split(separator)),
        E.map(toRecordWith(schema)),
        E.flatMap((r) => typeCodec.validate(r, c)),
      ),
    flow(typeCodec.encode, toStringWith(separator, encodeSchema)),
    props,
  );

  // typescript type inheretance got confused
  const codec = interfaceType as unknown as CodecTypeCFromSeparatedValues<P>;
  // keep schema for loging and debugging
  Object.defineProperty(codec, "schema", {
    value: schema,
    writable: false,
  });

  return codec;
}

function toStringWith(separator: string, schema: string[]) {
  return (r: Record<string, undefined | string>): string =>
    pipe(
      schema,
      A.map((key) => {
        const value = r[key];
        return value === undefined ? "" : String(value);
      }),
      A.intercalate(S.Monoid)(separator),
    );
}
