import {
  InterfaceType,
  TypeOf,
  OutputOf,
  InputOf,
  Type,
  Mixed,
  Props,
} from "io-ts";

type Position = number[];

export interface PropSchema<A, O, I> {
  position: Position;
  codec: Type<A, O, I>;
}

export type FromStringSchema = Record<string, Position>;

export interface TypeDefinition {
  schema: FromStringSchema;
  props: Props;
}

export type PropsFromString = Record<
  string,
  {
    position: Position;
    codec: Mixed;
  }
>;

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

// matchPartial

export type MatchPartialC<
  P extends Array<[Mixed, Mixed]>,
  A,
  O = A,
  I = unknown,
> = P extends { lenght: 1 }
  ? Type<A & TypeOf<P[0][1]>, O & OutputOf<P[0][1]>, I & InputOf<P[0][1]>>
  : P extends { lenght: 2 }
  ? Type<
      A & (TypeOf<P[0][1]> | TypeOf<P[1][1]>),
      O & (OutputOf<P[0][1]> | OutputOf<P[1][1]>),
      I & (InputOf<P[0][1]> | InputOf<P[1][1]>)
    >
  : P extends { lenght: 3 }
  ? Type<
      A & (TypeOf<P[0][1]> | TypeOf<P[1][1]> | TypeOf<P[2][1]>),
      O & (OutputOf<P[0][1]> | OutputOf<P[1][1]> | OutputOf<P[2][1]>),
      I & (InputOf<P[0][1]> | InputOf<P[1][1]> | InputOf<P[2][1]>)
    >
  : P extends { lenght: 4 }
  ? Type<
      A &
        (TypeOf<P[0][1]> | TypeOf<P[1][1]> | TypeOf<P[2][1]> | TypeOf<P[3][1]>),
      O &
        (
          | OutputOf<P[0][1]>
          | OutputOf<P[1][1]>
          | OutputOf<P[2][1]>
          | OutputOf<P[3][1]>
        ),
      I &
        (
          | InputOf<P[0][1]>
          | InputOf<P[1][1]>
          | InputOf<P[2][1]>
          | InputOf<P[3][1]>
        )
    >
  : P extends { lenght: 5 }
  ? Type<
      A &
        (
          | TypeOf<P[0][1]>
          | TypeOf<P[1][1]>
          | TypeOf<P[2][1]>
          | TypeOf<P[3][1]>
          | TypeOf<P[4][1]>
        ),
      O &
        (
          | OutputOf<P[0][1]>
          | OutputOf<P[1][1]>
          | OutputOf<P[2][1]>
          | OutputOf<P[3][1]>
          | OutputOf<P[4][1]>
        ),
      I &
        (
          | InputOf<P[0][1]>
          | InputOf<P[1][1]>
          | InputOf<P[2][1]>
          | InputOf<P[3][1]>
          | InputOf<P[4][1]>
        )
    >
  : P extends { lenght: 6 }
  ? Type<
      A &
        (
          | TypeOf<P[0][1]>
          | TypeOf<P[1][1]>
          | TypeOf<P[2][1]>
          | TypeOf<P[3][1]>
          | TypeOf<P[4][1]>
          | TypeOf<P[5][1]>
        ),
      O &
        (
          | OutputOf<P[0][1]>
          | OutputOf<P[1][1]>
          | OutputOf<P[2][1]>
          | OutputOf<P[3][1]>
          | OutputOf<P[4][1]>
          | OutputOf<P[5][1]>
        ),
      I &
        (
          | InputOf<P[0][1]>
          | InputOf<P[1][1]>
          | InputOf<P[2][1]>
          | InputOf<P[3][1]>
          | InputOf<P[4][1]>
          | InputOf<P[5][1]>
        )
    >
  : P extends { lenght: 7 }
  ? Type<
      A &
        (
          | TypeOf<P[0][1]>
          | TypeOf<P[1][1]>
          | TypeOf<P[2][1]>
          | TypeOf<P[3][1]>
          | TypeOf<P[4][1]>
          | TypeOf<P[5][1]>
          | TypeOf<P[6][1]>
        ),
      O &
        (
          | OutputOf<P[0][1]>
          | OutputOf<P[1][1]>
          | OutputOf<P[2][1]>
          | OutputOf<P[3][1]>
          | OutputOf<P[4][1]>
          | OutputOf<P[5][1]>
          | OutputOf<P[6][1]>
        ),
      I &
        (
          | InputOf<P[0][1]>
          | InputOf<P[1][1]>
          | InputOf<P[2][1]>
          | InputOf<P[3][1]>
          | InputOf<P[4][1]>
          | InputOf<P[5][1]>
          | InputOf<P[6][1]>
        )
    >
  : P extends { lenght: 8 }
  ? Type<
      A &
        (
          | TypeOf<P[0][1]>
          | TypeOf<P[1][1]>
          | TypeOf<P[2][1]>
          | TypeOf<P[3][1]>
          | TypeOf<P[4][1]>
          | TypeOf<P[5][1]>
          | TypeOf<P[6][1]>
          | TypeOf<P[7][1]>
        ),
      O &
        (
          | OutputOf<P[0][1]>
          | OutputOf<P[1][1]>
          | OutputOf<P[2][1]>
          | OutputOf<P[3][1]>
          | OutputOf<P[4][1]>
          | OutputOf<P[5][1]>
          | OutputOf<P[6][1]>
          | OutputOf<P[7][1]>
        ),
      I &
        (
          | InputOf<P[0][1]>
          | InputOf<P[1][1]>
          | InputOf<P[2][1]>
          | InputOf<P[3][1]>
          | InputOf<P[4][1]>
          | InputOf<P[5][1]>
          | InputOf<P[6][1]>
          | InputOf<P[7][1]>
        )
    >
  : P extends { lenght: 9 }
  ? Type<
      A &
        (
          | TypeOf<P[0][1]>
          | TypeOf<P[1][1]>
          | TypeOf<P[2][1]>
          | TypeOf<P[3][1]>
          | TypeOf<P[4][1]>
          | TypeOf<P[5][1]>
          | TypeOf<P[6][1]>
          | TypeOf<P[7][1]>
          | TypeOf<P[8][1]>
        ),
      O &
        (
          | OutputOf<P[0][1]>
          | OutputOf<P[1][1]>
          | OutputOf<P[2][1]>
          | OutputOf<P[3][1]>
          | OutputOf<P[4][1]>
          | OutputOf<P[5][1]>
          | OutputOf<P[6][1]>
          | OutputOf<P[7][1]>
          | OutputOf<P[8][1]>
        ),
      I &
        (
          | InputOf<P[0][1]>
          | InputOf<P[1][1]>
          | InputOf<P[2][1]>
          | InputOf<P[3][1]>
          | InputOf<P[4][1]>
          | InputOf<P[5][1]>
          | InputOf<P[6][1]>
          | InputOf<P[7][1]>
          | InputOf<P[8][1]>
        )
    >
  : P extends { lenght: 10 }
  ? Type<
      A &
        (
          | TypeOf<P[0][1]>
          | TypeOf<P[1][1]>
          | TypeOf<P[2][1]>
          | TypeOf<P[3][1]>
          | TypeOf<P[4][1]>
          | TypeOf<P[5][1]>
          | TypeOf<P[6][1]>
          | TypeOf<P[7][1]>
          | TypeOf<P[8][1]>
          | TypeOf<P[9][1]>
        ),
      O &
        (
          | OutputOf<P[0][1]>
          | OutputOf<P[1][1]>
          | OutputOf<P[2][1]>
          | OutputOf<P[3][1]>
          | OutputOf<P[4][1]>
          | OutputOf<P[5][1]>
          | OutputOf<P[6][1]>
          | OutputOf<P[7][1]>
          | OutputOf<P[8][1]>
          | OutputOf<P[9][1]>
        ),
      I &
        (
          | InputOf<P[0][1]>
          | InputOf<P[1][1]>
          | InputOf<P[2][1]>
          | InputOf<P[3][1]>
          | InputOf<P[4][1]>
          | InputOf<P[5][1]>
          | InputOf<P[6][1]>
          | InputOf<P[7][1]>
          | InputOf<P[8][1]>
          | InputOf<P[9][1]>
        )
    >
  : P extends { lenght: 11 }
  ? Type<
      A &
        (
          | TypeOf<P[0][1]>
          | TypeOf<P[1][1]>
          | TypeOf<P[2][1]>
          | TypeOf<P[3][1]>
          | TypeOf<P[4][1]>
          | TypeOf<P[5][1]>
          | TypeOf<P[6][1]>
          | TypeOf<P[7][1]>
          | TypeOf<P[8][1]>
          | TypeOf<P[9][1]>
          | TypeOf<P[10][1]>
        ),
      O &
        (
          | OutputOf<P[0][1]>
          | OutputOf<P[1][1]>
          | OutputOf<P[2][1]>
          | OutputOf<P[3][1]>
          | OutputOf<P[4][1]>
          | OutputOf<P[5][1]>
          | OutputOf<P[6][1]>
          | OutputOf<P[7][1]>
          | OutputOf<P[8][1]>
          | OutputOf<P[9][1]>
          | OutputOf<P[10][1]>
        ),
      I &
        (
          | InputOf<P[0][1]>
          | InputOf<P[1][1]>
          | InputOf<P[2][1]>
          | InputOf<P[3][1]>
          | InputOf<P[4][1]>
          | InputOf<P[5][1]>
          | InputOf<P[6][1]>
          | InputOf<P[7][1]>
          | InputOf<P[8][1]>
          | InputOf<P[9][1]>
          | InputOf<P[10][1]>
        )
    >
  : P extends { lenght: 12 }
  ? Type<
      A &
        (
          | TypeOf<P[0][1]>
          | TypeOf<P[1][1]>
          | TypeOf<P[2][1]>
          | TypeOf<P[3][1]>
          | TypeOf<P[4][1]>
          | TypeOf<P[5][1]>
          | TypeOf<P[6][1]>
          | TypeOf<P[7][1]>
          | TypeOf<P[8][1]>
          | TypeOf<P[9][1]>
          | TypeOf<P[10][1]>
          | TypeOf<P[11][1]>
        ),
      O &
        (
          | OutputOf<P[0][1]>
          | OutputOf<P[1][1]>
          | OutputOf<P[2][1]>
          | OutputOf<P[3][1]>
          | OutputOf<P[4][1]>
          | OutputOf<P[5][1]>
          | OutputOf<P[6][1]>
          | OutputOf<P[7][1]>
          | OutputOf<P[8][1]>
          | OutputOf<P[9][1]>
          | OutputOf<P[10][1]>
          | OutputOf<P[11][1]>
        ),
      I &
        (
          | InputOf<P[0][1]>
          | InputOf<P[1][1]>
          | InputOf<P[2][1]>
          | InputOf<P[3][1]>
          | InputOf<P[4][1]>
          | InputOf<P[5][1]>
          | InputOf<P[6][1]>
          | InputOf<P[7][1]>
          | InputOf<P[8][1]>
          | InputOf<P[9][1]>
          | InputOf<P[10][1]>
          | InputOf<P[11][1]>
        )
    >
  : P extends { lenght: 13 }
  ? Type<
      A &
        (
          | TypeOf<P[0][1]>
          | TypeOf<P[1][1]>
          | TypeOf<P[2][1]>
          | TypeOf<P[3][1]>
          | TypeOf<P[4][1]>
          | TypeOf<P[5][1]>
          | TypeOf<P[6][1]>
          | TypeOf<P[7][1]>
          | TypeOf<P[8][1]>
          | TypeOf<P[9][1]>
          | TypeOf<P[10][1]>
          | TypeOf<P[11][1]>
          | TypeOf<P[12][1]>
        ),
      O &
        (
          | OutputOf<P[0][1]>
          | OutputOf<P[1][1]>
          | OutputOf<P[2][1]>
          | OutputOf<P[3][1]>
          | OutputOf<P[4][1]>
          | OutputOf<P[5][1]>
          | OutputOf<P[6][1]>
          | OutputOf<P[7][1]>
          | OutputOf<P[8][1]>
          | OutputOf<P[9][1]>
          | OutputOf<P[10][1]>
          | OutputOf<P[11][1]>
          | OutputOf<P[12][1]>
        ),
      I &
        (
          | InputOf<P[0][1]>
          | InputOf<P[1][1]>
          | InputOf<P[2][1]>
          | InputOf<P[3][1]>
          | InputOf<P[4][1]>
          | InputOf<P[5][1]>
          | InputOf<P[6][1]>
          | InputOf<P[7][1]>
          | InputOf<P[8][1]>
          | InputOf<P[9][1]>
          | InputOf<P[10][1]>
          | InputOf<P[11][1]>
          | InputOf<P[12][1]>
        )
    >
  : P extends { lenght: 14 }
  ? Type<
      A &
        (
          | TypeOf<P[0][1]>
          | TypeOf<P[1][1]>
          | TypeOf<P[2][1]>
          | TypeOf<P[3][1]>
          | TypeOf<P[4][1]>
          | TypeOf<P[5][1]>
          | TypeOf<P[6][1]>
          | TypeOf<P[7][1]>
          | TypeOf<P[8][1]>
          | TypeOf<P[9][1]>
          | TypeOf<P[10][1]>
          | TypeOf<P[11][1]>
          | TypeOf<P[12][1]>
          | TypeOf<P[13][1]>
        ),
      O &
        (
          | OutputOf<P[0][1]>
          | OutputOf<P[1][1]>
          | OutputOf<P[2][1]>
          | OutputOf<P[3][1]>
          | OutputOf<P[4][1]>
          | OutputOf<P[5][1]>
          | OutputOf<P[6][1]>
          | OutputOf<P[7][1]>
          | OutputOf<P[8][1]>
          | OutputOf<P[9][1]>
          | OutputOf<P[10][1]>
          | OutputOf<P[11][1]>
          | OutputOf<P[12][1]>
          | OutputOf<P[13][1]>
        ),
      I &
        (
          | InputOf<P[0][1]>
          | InputOf<P[1][1]>
          | InputOf<P[2][1]>
          | InputOf<P[3][1]>
          | InputOf<P[4][1]>
          | InputOf<P[5][1]>
          | InputOf<P[6][1]>
          | InputOf<P[7][1]>
          | InputOf<P[8][1]>
          | InputOf<P[9][1]>
          | InputOf<P[10][1]>
          | InputOf<P[11][1]>
          | InputOf<P[12][1]>
          | InputOf<P[13][1]>
        )
    >
  : Type<
      A &
        (
          | TypeOf<P[0][1]>
          | TypeOf<P[1][1]>
          | TypeOf<P[2][1]>
          | TypeOf<P[3][1]>
          | TypeOf<P[4][1]>
          | TypeOf<P[5][1]>
          | TypeOf<P[6][1]>
          | TypeOf<P[7][1]>
          | TypeOf<P[8][1]>
          | TypeOf<P[9][1]>
          | TypeOf<P[10][1]>
          | TypeOf<P[11][1]>
          | TypeOf<P[12][1]>
          | TypeOf<P[13][1]>
          | TypeOf<P[14][1]>
        ),
      O &
        (
          | OutputOf<P[0][1]>
          | OutputOf<P[1][1]>
          | OutputOf<P[2][1]>
          | OutputOf<P[3][1]>
          | OutputOf<P[4][1]>
          | OutputOf<P[5][1]>
          | OutputOf<P[6][1]>
          | OutputOf<P[7][1]>
          | OutputOf<P[8][1]>
          | OutputOf<P[9][1]>
          | OutputOf<P[10][1]>
          | OutputOf<P[11][1]>
          | OutputOf<P[12][1]>
          | OutputOf<P[13][1]>
          | OutputOf<P[14][1]>
        ),
      I &
        (
          | InputOf<P[0][1]>
          | InputOf<P[1][1]>
          | InputOf<P[2][1]>
          | InputOf<P[3][1]>
          | InputOf<P[4][1]>
          | InputOf<P[5][1]>
          | InputOf<P[6][1]>
          | InputOf<P[7][1]>
          | InputOf<P[8][1]>
          | InputOf<P[9][1]>
          | InputOf<P[10][1]>
          | InputOf<P[11][1]>
          | InputOf<P[12][1]>
          | InputOf<P[13][1]>
          | InputOf<P[14][1]>
        )
    >;
