import {
  decodeOrUndefined as decode,
  DecimalFromPercentString,
  floatFrom,
  integerFrom,
  decimalFrom,
  decodeEncodeOrUndefined,
} from "../lib";

describe("number", () => {
  test("integerFrom defaults", () => {
    const IntegerFromString = integerFrom();
    expect(decode(IntegerFromString, "1")).toEqual(1);
    expect(decode(IntegerFromString, " 1 ")).toEqual(1);
    expect(decode(IntegerFromString, " 1,000 ")).toEqual(1000);
    expect(decode(IntegerFromString, " 1.000 ")).toEqual(undefined);
  });

  test("integerFrom regexp", () => {
    const IdFromString = integerFrom({ regexp: /id(\d+)/ });
    expect(decode(IdFromString, "id1")).toEqual(1);
    expect(decode(IdFromString, " id1 ")).toEqual(1);
    expect(decode(IdFromString, " id1000 ")).toEqual(1000);
    expect(decode(IdFromString, " 1000 ")).toEqual(undefined);
  });

  test("integerFrom regexp no capture group", () => {
    const IdFromString = integerFrom({ regexp: /id\d+/ });
    expect(decode(IdFromString, "id1")).toEqual(undefined);
  });

  test("floatFrom defaults", () => {
    const FloatFromString = floatFrom();
    expect(decode(FloatFromString, "1")).toEqual(1);
    expect(decode(FloatFromString, " 1.1 ")).toEqual(1.1);
    expect(decode(FloatFromString, " 1,000.1 ")).toEqual(1000.1);
  });

  test("floatFrom regexp", () => {
    const IdFromString = floatFrom({ regexp: /id([.,\d]+)/ });
    expect(decode(IdFromString, "id1")).toEqual(1);
    expect(decode(IdFromString, " id1.1 ")).toEqual(1.1);
    expect(decode(IdFromString, " id1,000.1 ")).toEqual(1000.1);
  });

  test("floatFrom regexp no capture group", () => {
    const IdFromString = floatFrom({ regexp: /id[.,\d]+/ });
    expect(decode(IdFromString, "id1")).toEqual(undefined);
  });

  test("DecimalFromPercentString", () => {
    expect(decode(DecimalFromPercentString, 0)).toBeUndefined();
    expect(decode(DecimalFromPercentString, 0.1)).toBeUndefined();
    expect(decode(DecimalFromPercentString, "0%")).toEqual(0);
    expect(decode(DecimalFromPercentString, "0.5%")).toEqual(0.005);
    expect(decode(DecimalFromPercentString, "1%")).toEqual(0.01);
    expect(decode(DecimalFromPercentString, "10%")).toEqual(0.1);
    expect(decode(DecimalFromPercentString, "100%")).toEqual(1);
    expect(decode(DecimalFromPercentString, "10")).toBeUndefined();
    expect(decode(DecimalFromPercentString, "string")).toBeUndefined();
    expect(DecimalFromPercentString.encode(0)).toEqual(0);
    expect(DecimalFromPercentString.encode(0.1)).toEqual(0.1);
    expect(DecimalFromPercentString.encode(1)).toEqual(1);
  });

  test("decimalFrom", () => {
    const Money = decimalFrom({ decimals: 2 });

    expect(decodeEncodeOrUndefined(Money, 0)).toBeUndefined();
    expect(decodeEncodeOrUndefined(Money, "1.123")).toBeUndefined();

    expect(decodeEncodeOrUndefined(Money, "0.1")).toEqual("0.1");
    expect(decodeEncodeOrUndefined(Money, "0.11")).toEqual("0.11");
    expect(decodeEncodeOrUndefined(Money, "1.1")).toEqual("1.1");
    expect(decodeEncodeOrUndefined(Money, "12345678.12")).toEqual(
      "12345678.12",
    );
  });
});
