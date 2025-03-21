# io-ts-parser-types

[![NPM Version](https://img.shields.io/npm/v/io-ts-parser-types.svg?style=flat-square)](https://www.npmjs.com/package/io-ts-parser-types)
[![NPM Downloads](https://img.shields.io/npm/dt/io-ts-parser-types.svg?style=flat-square)](https://www.npmjs.com/package/io-ts-parser-types)

io-ts codec types for parsing data

# Install

`npm i io-ts-parser-types`

**Note**. [`fp-ts`](https://github.com/gcanti/fp-ts) and [`io-ts`](https://github.com/gcanti/io-ts) are peer dependencies for `io-ts-parser-types`

# Usage

## typeFromRegexp(regexp, codec)

returns a codec that matches string with regexp and the validates all named capture groups with codec.

### Example

```ts
const dataCodec = t.type({
  prop: NumberFromString,
  value: BooleanFromString,
});

const codec = typeFromRegexp(/p(?<prop>\d+)\/v(?<value>.+)/, dataCodec);
expect(decode(codec, "p123/vtrue")).toEqual({
  prop: 123,
  value: true,
});
```

---

Both following codecs accept the same parameters `schema` and `name`. The `name` is just a codec name. for Schema look for example

## typeFromString(schema, name)

returns a codec that extracts fields for the position in the string and returns an object. **encode returns the object with encoded fields**

## codecTypeFromString(schema, name)

returns a codec that extracts fields for the position in the string and returns an object. **encode returns the string with field values in respective positions**

### Example

```ts
const schema = {
  prop1: {
    position: [1, 2],
    codec: NumberFromString,
  },
  prop2: {
    position: [5, 9],
    codec: BooleanFromString,
  },
};
const typeC = typeFromString(schema, "string to object");
const codecTypeC = codecTypeFromString(schema, "string to object to string");

const result = {
  prop1: 2,
  prop2: true,
};

expect(decode(typeC, "12345true78")).toEqual(result);
expect(decode(codecTypeC, "12345true78")).toEqual(result);

expect(typeC.encode(result)).toEqual({
  prop1: "2",
  prop2: "true",
});
expect(codecTypeC.encode(result)).toEqual(" 2   true");
```

---

## typeFromSeparatedValues(separator, schema, name)

- separator: string | RegExp

returns a codec that extracts fields for the the string with values separated by `separator` and returns an object. **encode returns the object with encoded fields**

## codecTypeFromSeparatedValues(separator, schema, name)

- separator: string

returns a codec that extracts fields for the the string with values separated by `separator` and returns an object. **encode returns the string with field values in respective positions**

### Example

```ts
const schema = {
  prop1: {
    position: 1,
    codec: NumberFromString,
  },
  prop2: {
    position: 0,
    codec: BooleanFromString,
  },
};
const typeC = typeFromSeparatedValues("|", schema, "string to object");
const codecTypeC = codecTypeFromSeparatedValues("|", schema, "string to object to string");

const result = {
  prop1: 2,
  prop2: true,
};

expect(decode(typeC, "true|2")).toEqual(result);
expect(decode(codecTypeC, "true|2")).toEqual(result);

expect(typeC.encode(result)).toEqual({
  prop1: "2",
  prop2: "true",
});
expect(codecTypeC.encode(result)).toEqual("true|2");
```

---

## Number

- **integerFrom(options)** - generic codec creation function for integer values
- **decimalFrom(options)** - generic codec creation function for decimal values. It uses [decimal.js](http://mikemcl.github.io/decimal.js)
- **floatFrom(options)** - generic codec creation function for float values
  - regexp - optional, RegExp, matches string and returns **first** group as a number, ignores commas as a thousand separator
  - name - optional, name of the codec
- **ZeroFromNull** - returns `0` for `null`
- **DecimalFromPercentString** - returns a percent value from string like e.g., 58% -> 0.58

## Boolean

- **booleanFrom(options)** - generic boolean codec creator function.
  - **true** - true value, **false** - false value
  - **true** - true value, strict - optional, boolean, if set to true only true value matches
  - **false** - false value, strict - optional, boolean, if set to true only false value matches

## Null

- **nullFrom(options)** - generic null codec creator function
  - **match** - array of values to be valid as `null`
  - caseSensitive - optional, default true, matches values from `match` exactly. If you want to treat strings from the `match` array as non case-sensitive set them to `false`

## String

- **TrimmedString** - validates that value is a string and trims white space.

License

[MIT](LICENSE)
