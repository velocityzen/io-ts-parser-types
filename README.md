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

License

[MIT](LICENSE)
