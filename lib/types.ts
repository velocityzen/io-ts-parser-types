import { InterfaceType, TypeOf, OutputOf, Mixed, Props } from "io-ts";

export interface PropFromString {
  position: [number, number];
  codec: Mixed;
}

export interface TypeDefinition {
  schema: FromStringSchema;
  typeProps: Props;
}

export type PropsFromString = Record<string, PropFromString>;

export type TypeCFromString<P extends PropsFromString> = InterfaceType<
  P,
  { [K in keyof P]: TypeOf<P[K]["codec"]> },
  { [K in keyof P]: OutputOf<P[K]["codec"]> },
  unknown
>;

export type CodecTypeCFromString<P extends PropsFromString> = InterfaceType<
  P,
  { [K in keyof P]: TypeOf<P[K]["codec"]> },
  string,
  unknown
>;

export type FromStringSchema = Record<string, PropFromString["position"]>;
