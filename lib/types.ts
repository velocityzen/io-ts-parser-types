import * as t from "io-ts";

// matchPartial

export type MatchPartialC<
  P extends [t.Mixed, t.Mixed][],
  A,
  O = A,
  I = unknown,
> = P extends { lenght: 1 }
  ? t.Type<
      A & t.TypeOf<P[0][1]>,
      O & t.OutputOf<P[0][1]>,
      I & t.InputOf<P[0][1]>
    >
  : P extends { lenght: 2 }
    ? t.Type<
        A & (t.TypeOf<P[0][1]> | t.TypeOf<P[1][1]>),
        O & (t.OutputOf<P[0][1]> | t.OutputOf<P[1][1]>),
        I & (t.InputOf<P[0][1]> | t.InputOf<P[1][1]>)
      >
    : P extends { lenght: 3 }
      ? t.Type<
          A & (t.TypeOf<P[0][1]> | t.TypeOf<P[1][1]> | t.TypeOf<P[2][1]>),
          O & (t.OutputOf<P[0][1]> | t.OutputOf<P[1][1]> | t.OutputOf<P[2][1]>),
          I & (t.InputOf<P[0][1]> | t.InputOf<P[1][1]> | t.InputOf<P[2][1]>)
        >
      : P extends { lenght: 4 }
        ? t.Type<
            A &
              (
                | t.TypeOf<P[0][1]>
                | t.TypeOf<P[1][1]>
                | t.TypeOf<P[2][1]>
                | t.TypeOf<P[3][1]>
              ),
            O &
              (
                | t.OutputOf<P[0][1]>
                | t.OutputOf<P[1][1]>
                | t.OutputOf<P[2][1]>
                | t.OutputOf<P[3][1]>
              ),
            I &
              (
                | t.InputOf<P[0][1]>
                | t.InputOf<P[1][1]>
                | t.InputOf<P[2][1]>
                | t.InputOf<P[3][1]>
              )
          >
        : P extends { lenght: 5 }
          ? t.Type<
              A &
                (
                  | t.TypeOf<P[0][1]>
                  | t.TypeOf<P[1][1]>
                  | t.TypeOf<P[2][1]>
                  | t.TypeOf<P[3][1]>
                  | t.TypeOf<P[4][1]>
                ),
              O &
                (
                  | t.OutputOf<P[0][1]>
                  | t.OutputOf<P[1][1]>
                  | t.OutputOf<P[2][1]>
                  | t.OutputOf<P[3][1]>
                  | t.OutputOf<P[4][1]>
                ),
              I &
                (
                  | t.InputOf<P[0][1]>
                  | t.InputOf<P[1][1]>
                  | t.InputOf<P[2][1]>
                  | t.InputOf<P[3][1]>
                  | t.InputOf<P[4][1]>
                )
            >
          : P extends { lenght: 6 }
            ? t.Type<
                A &
                  (
                    | t.TypeOf<P[0][1]>
                    | t.TypeOf<P[1][1]>
                    | t.TypeOf<P[2][1]>
                    | t.TypeOf<P[3][1]>
                    | t.TypeOf<P[4][1]>
                    | t.TypeOf<P[5][1]>
                  ),
                O &
                  (
                    | t.OutputOf<P[0][1]>
                    | t.OutputOf<P[1][1]>
                    | t.OutputOf<P[2][1]>
                    | t.OutputOf<P[3][1]>
                    | t.OutputOf<P[4][1]>
                    | t.OutputOf<P[5][1]>
                  ),
                I &
                  (
                    | t.InputOf<P[0][1]>
                    | t.InputOf<P[1][1]>
                    | t.InputOf<P[2][1]>
                    | t.InputOf<P[3][1]>
                    | t.InputOf<P[4][1]>
                    | t.InputOf<P[5][1]>
                  )
              >
            : P extends { lenght: 7 }
              ? t.Type<
                  A &
                    (
                      | t.TypeOf<P[0][1]>
                      | t.TypeOf<P[1][1]>
                      | t.TypeOf<P[2][1]>
                      | t.TypeOf<P[3][1]>
                      | t.TypeOf<P[4][1]>
                      | t.TypeOf<P[5][1]>
                      | t.TypeOf<P[6][1]>
                    ),
                  O &
                    (
                      | t.OutputOf<P[0][1]>
                      | t.OutputOf<P[1][1]>
                      | t.OutputOf<P[2][1]>
                      | t.OutputOf<P[3][1]>
                      | t.OutputOf<P[4][1]>
                      | t.OutputOf<P[5][1]>
                      | t.OutputOf<P[6][1]>
                    ),
                  I &
                    (
                      | t.InputOf<P[0][1]>
                      | t.InputOf<P[1][1]>
                      | t.InputOf<P[2][1]>
                      | t.InputOf<P[3][1]>
                      | t.InputOf<P[4][1]>
                      | t.InputOf<P[5][1]>
                      | t.InputOf<P[6][1]>
                    )
                >
              : P extends { lenght: 8 }
                ? t.Type<
                    A &
                      (
                        | t.TypeOf<P[0][1]>
                        | t.TypeOf<P[1][1]>
                        | t.TypeOf<P[2][1]>
                        | t.TypeOf<P[3][1]>
                        | t.TypeOf<P[4][1]>
                        | t.TypeOf<P[5][1]>
                        | t.TypeOf<P[6][1]>
                        | t.TypeOf<P[7][1]>
                      ),
                    O &
                      (
                        | t.OutputOf<P[0][1]>
                        | t.OutputOf<P[1][1]>
                        | t.OutputOf<P[2][1]>
                        | t.OutputOf<P[3][1]>
                        | t.OutputOf<P[4][1]>
                        | t.OutputOf<P[5][1]>
                        | t.OutputOf<P[6][1]>
                        | t.OutputOf<P[7][1]>
                      ),
                    I &
                      (
                        | t.InputOf<P[0][1]>
                        | t.InputOf<P[1][1]>
                        | t.InputOf<P[2][1]>
                        | t.InputOf<P[3][1]>
                        | t.InputOf<P[4][1]>
                        | t.InputOf<P[5][1]>
                        | t.InputOf<P[6][1]>
                        | t.InputOf<P[7][1]>
                      )
                  >
                : P extends { lenght: 9 }
                  ? t.Type<
                      A &
                        (
                          | t.TypeOf<P[0][1]>
                          | t.TypeOf<P[1][1]>
                          | t.TypeOf<P[2][1]>
                          | t.TypeOf<P[3][1]>
                          | t.TypeOf<P[4][1]>
                          | t.TypeOf<P[5][1]>
                          | t.TypeOf<P[6][1]>
                          | t.TypeOf<P[7][1]>
                          | t.TypeOf<P[8][1]>
                        ),
                      O &
                        (
                          | t.OutputOf<P[0][1]>
                          | t.OutputOf<P[1][1]>
                          | t.OutputOf<P[2][1]>
                          | t.OutputOf<P[3][1]>
                          | t.OutputOf<P[4][1]>
                          | t.OutputOf<P[5][1]>
                          | t.OutputOf<P[6][1]>
                          | t.OutputOf<P[7][1]>
                          | t.OutputOf<P[8][1]>
                        ),
                      I &
                        (
                          | t.InputOf<P[0][1]>
                          | t.InputOf<P[1][1]>
                          | t.InputOf<P[2][1]>
                          | t.InputOf<P[3][1]>
                          | t.InputOf<P[4][1]>
                          | t.InputOf<P[5][1]>
                          | t.InputOf<P[6][1]>
                          | t.InputOf<P[7][1]>
                          | t.InputOf<P[8][1]>
                        )
                    >
                  : P extends { lenght: 10 }
                    ? t.Type<
                        A &
                          (
                            | t.TypeOf<P[0][1]>
                            | t.TypeOf<P[1][1]>
                            | t.TypeOf<P[2][1]>
                            | t.TypeOf<P[3][1]>
                            | t.TypeOf<P[4][1]>
                            | t.TypeOf<P[5][1]>
                            | t.TypeOf<P[6][1]>
                            | t.TypeOf<P[7][1]>
                            | t.TypeOf<P[8][1]>
                            | t.TypeOf<P[9][1]>
                          ),
                        O &
                          (
                            | t.OutputOf<P[0][1]>
                            | t.OutputOf<P[1][1]>
                            | t.OutputOf<P[2][1]>
                            | t.OutputOf<P[3][1]>
                            | t.OutputOf<P[4][1]>
                            | t.OutputOf<P[5][1]>
                            | t.OutputOf<P[6][1]>
                            | t.OutputOf<P[7][1]>
                            | t.OutputOf<P[8][1]>
                            | t.OutputOf<P[9][1]>
                          ),
                        I &
                          (
                            | t.InputOf<P[0][1]>
                            | t.InputOf<P[1][1]>
                            | t.InputOf<P[2][1]>
                            | t.InputOf<P[3][1]>
                            | t.InputOf<P[4][1]>
                            | t.InputOf<P[5][1]>
                            | t.InputOf<P[6][1]>
                            | t.InputOf<P[7][1]>
                            | t.InputOf<P[8][1]>
                            | t.InputOf<P[9][1]>
                          )
                      >
                    : P extends { lenght: 11 }
                      ? t.Type<
                          A &
                            (
                              | t.TypeOf<P[0][1]>
                              | t.TypeOf<P[1][1]>
                              | t.TypeOf<P[2][1]>
                              | t.TypeOf<P[3][1]>
                              | t.TypeOf<P[4][1]>
                              | t.TypeOf<P[5][1]>
                              | t.TypeOf<P[6][1]>
                              | t.TypeOf<P[7][1]>
                              | t.TypeOf<P[8][1]>
                              | t.TypeOf<P[9][1]>
                              | t.TypeOf<P[10][1]>
                            ),
                          O &
                            (
                              | t.OutputOf<P[0][1]>
                              | t.OutputOf<P[1][1]>
                              | t.OutputOf<P[2][1]>
                              | t.OutputOf<P[3][1]>
                              | t.OutputOf<P[4][1]>
                              | t.OutputOf<P[5][1]>
                              | t.OutputOf<P[6][1]>
                              | t.OutputOf<P[7][1]>
                              | t.OutputOf<P[8][1]>
                              | t.OutputOf<P[9][1]>
                              | t.OutputOf<P[10][1]>
                            ),
                          I &
                            (
                              | t.InputOf<P[0][1]>
                              | t.InputOf<P[1][1]>
                              | t.InputOf<P[2][1]>
                              | t.InputOf<P[3][1]>
                              | t.InputOf<P[4][1]>
                              | t.InputOf<P[5][1]>
                              | t.InputOf<P[6][1]>
                              | t.InputOf<P[7][1]>
                              | t.InputOf<P[8][1]>
                              | t.InputOf<P[9][1]>
                              | t.InputOf<P[10][1]>
                            )
                        >
                      : P extends { lenght: 12 }
                        ? t.Type<
                            A &
                              (
                                | t.TypeOf<P[0][1]>
                                | t.TypeOf<P[1][1]>
                                | t.TypeOf<P[2][1]>
                                | t.TypeOf<P[3][1]>
                                | t.TypeOf<P[4][1]>
                                | t.TypeOf<P[5][1]>
                                | t.TypeOf<P[6][1]>
                                | t.TypeOf<P[7][1]>
                                | t.TypeOf<P[8][1]>
                                | t.TypeOf<P[9][1]>
                                | t.TypeOf<P[10][1]>
                                | t.TypeOf<P[11][1]>
                              ),
                            O &
                              (
                                | t.OutputOf<P[0][1]>
                                | t.OutputOf<P[1][1]>
                                | t.OutputOf<P[2][1]>
                                | t.OutputOf<P[3][1]>
                                | t.OutputOf<P[4][1]>
                                | t.OutputOf<P[5][1]>
                                | t.OutputOf<P[6][1]>
                                | t.OutputOf<P[7][1]>
                                | t.OutputOf<P[8][1]>
                                | t.OutputOf<P[9][1]>
                                | t.OutputOf<P[10][1]>
                                | t.OutputOf<P[11][1]>
                              ),
                            I &
                              (
                                | t.InputOf<P[0][1]>
                                | t.InputOf<P[1][1]>
                                | t.InputOf<P[2][1]>
                                | t.InputOf<P[3][1]>
                                | t.InputOf<P[4][1]>
                                | t.InputOf<P[5][1]>
                                | t.InputOf<P[6][1]>
                                | t.InputOf<P[7][1]>
                                | t.InputOf<P[8][1]>
                                | t.InputOf<P[9][1]>
                                | t.InputOf<P[10][1]>
                                | t.InputOf<P[11][1]>
                              )
                          >
                        : P extends { lenght: 13 }
                          ? t.Type<
                              A &
                                (
                                  | t.TypeOf<P[0][1]>
                                  | t.TypeOf<P[1][1]>
                                  | t.TypeOf<P[2][1]>
                                  | t.TypeOf<P[3][1]>
                                  | t.TypeOf<P[4][1]>
                                  | t.TypeOf<P[5][1]>
                                  | t.TypeOf<P[6][1]>
                                  | t.TypeOf<P[7][1]>
                                  | t.TypeOf<P[8][1]>
                                  | t.TypeOf<P[9][1]>
                                  | t.TypeOf<P[10][1]>
                                  | t.TypeOf<P[11][1]>
                                  | t.TypeOf<P[12][1]>
                                ),
                              O &
                                (
                                  | t.OutputOf<P[0][1]>
                                  | t.OutputOf<P[1][1]>
                                  | t.OutputOf<P[2][1]>
                                  | t.OutputOf<P[3][1]>
                                  | t.OutputOf<P[4][1]>
                                  | t.OutputOf<P[5][1]>
                                  | t.OutputOf<P[6][1]>
                                  | t.OutputOf<P[7][1]>
                                  | t.OutputOf<P[8][1]>
                                  | t.OutputOf<P[9][1]>
                                  | t.OutputOf<P[10][1]>
                                  | t.OutputOf<P[11][1]>
                                  | t.OutputOf<P[12][1]>
                                ),
                              I &
                                (
                                  | t.InputOf<P[0][1]>
                                  | t.InputOf<P[1][1]>
                                  | t.InputOf<P[2][1]>
                                  | t.InputOf<P[3][1]>
                                  | t.InputOf<P[4][1]>
                                  | t.InputOf<P[5][1]>
                                  | t.InputOf<P[6][1]>
                                  | t.InputOf<P[7][1]>
                                  | t.InputOf<P[8][1]>
                                  | t.InputOf<P[9][1]>
                                  | t.InputOf<P[10][1]>
                                  | t.InputOf<P[11][1]>
                                  | t.InputOf<P[12][1]>
                                )
                            >
                          : P extends { lenght: 14 }
                            ? t.Type<
                                A &
                                  (
                                    | t.TypeOf<P[0][1]>
                                    | t.TypeOf<P[1][1]>
                                    | t.TypeOf<P[2][1]>
                                    | t.TypeOf<P[3][1]>
                                    | t.TypeOf<P[4][1]>
                                    | t.TypeOf<P[5][1]>
                                    | t.TypeOf<P[6][1]>
                                    | t.TypeOf<P[7][1]>
                                    | t.TypeOf<P[8][1]>
                                    | t.TypeOf<P[9][1]>
                                    | t.TypeOf<P[10][1]>
                                    | t.TypeOf<P[11][1]>
                                    | t.TypeOf<P[12][1]>
                                    | t.TypeOf<P[13][1]>
                                  ),
                                O &
                                  (
                                    | t.OutputOf<P[0][1]>
                                    | t.OutputOf<P[1][1]>
                                    | t.OutputOf<P[2][1]>
                                    | t.OutputOf<P[3][1]>
                                    | t.OutputOf<P[4][1]>
                                    | t.OutputOf<P[5][1]>
                                    | t.OutputOf<P[6][1]>
                                    | t.OutputOf<P[7][1]>
                                    | t.OutputOf<P[8][1]>
                                    | t.OutputOf<P[9][1]>
                                    | t.OutputOf<P[10][1]>
                                    | t.OutputOf<P[11][1]>
                                    | t.OutputOf<P[12][1]>
                                    | t.OutputOf<P[13][1]>
                                  ),
                                I &
                                  (
                                    | t.InputOf<P[0][1]>
                                    | t.InputOf<P[1][1]>
                                    | t.InputOf<P[2][1]>
                                    | t.InputOf<P[3][1]>
                                    | t.InputOf<P[4][1]>
                                    | t.InputOf<P[5][1]>
                                    | t.InputOf<P[6][1]>
                                    | t.InputOf<P[7][1]>
                                    | t.InputOf<P[8][1]>
                                    | t.InputOf<P[9][1]>
                                    | t.InputOf<P[10][1]>
                                    | t.InputOf<P[11][1]>
                                    | t.InputOf<P[12][1]>
                                    | t.InputOf<P[13][1]>
                                  )
                              >
                            : t.Type<
                                A &
                                  (
                                    | t.TypeOf<P[0][1]>
                                    | t.TypeOf<P[1][1]>
                                    | t.TypeOf<P[2][1]>
                                    | t.TypeOf<P[3][1]>
                                    | t.TypeOf<P[4][1]>
                                    | t.TypeOf<P[5][1]>
                                    | t.TypeOf<P[6][1]>
                                    | t.TypeOf<P[7][1]>
                                    | t.TypeOf<P[8][1]>
                                    | t.TypeOf<P[9][1]>
                                    | t.TypeOf<P[10][1]>
                                    | t.TypeOf<P[11][1]>
                                    | t.TypeOf<P[12][1]>
                                    | t.TypeOf<P[13][1]>
                                    | t.TypeOf<P[14][1]>
                                  ),
                                O &
                                  (
                                    | t.OutputOf<P[0][1]>
                                    | t.OutputOf<P[1][1]>
                                    | t.OutputOf<P[2][1]>
                                    | t.OutputOf<P[3][1]>
                                    | t.OutputOf<P[4][1]>
                                    | t.OutputOf<P[5][1]>
                                    | t.OutputOf<P[6][1]>
                                    | t.OutputOf<P[7][1]>
                                    | t.OutputOf<P[8][1]>
                                    | t.OutputOf<P[9][1]>
                                    | t.OutputOf<P[10][1]>
                                    | t.OutputOf<P[11][1]>
                                    | t.OutputOf<P[12][1]>
                                    | t.OutputOf<P[13][1]>
                                    | t.OutputOf<P[14][1]>
                                  ),
                                I &
                                  (
                                    | t.InputOf<P[0][1]>
                                    | t.InputOf<P[1][1]>
                                    | t.InputOf<P[2][1]>
                                    | t.InputOf<P[3][1]>
                                    | t.InputOf<P[4][1]>
                                    | t.InputOf<P[5][1]>
                                    | t.InputOf<P[6][1]>
                                    | t.InputOf<P[7][1]>
                                    | t.InputOf<P[8][1]>
                                    | t.InputOf<P[9][1]>
                                    | t.InputOf<P[10][1]>
                                    | t.InputOf<P[11][1]>
                                    | t.InputOf<P[12][1]>
                                    | t.InputOf<P[13][1]>
                                    | t.InputOf<P[14][1]>
                                  )
                              >;
