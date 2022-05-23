type Options = {
  /**
  The indentation of the JSON.
  By default, the JSON is not indented.
  Set it to `'\t'` for tab indentation or the number of spaces you want.
  */
  readonly indentation?: string | number
}

/**
处理循环引用将对象序列化为JSON
@example
```
const foo = {a: true};
foo.b = foo;
console.log(safeStringify(foo));
//=> '{"a":true,"b":"[Circular]"}'
console.log(JSON.stringify(foo));
//=> TypeError: Converting circular structure to JSON
```
*/
export function safeStringify(object: unknown, { indentation }: Options = {}) {
  const makeCircularReplacer = () => {
    const seen = new WeakMap()
    return (key: string, value: unknown) => {
      if (value !== null && typeof value === 'object') {
        // 如果是循环引用，则返回[Circular]
        if (seen.has(value) && seen.get(value) !== key) {
          return '[Circular]'
        }
        seen.set(value, key)
      }

      return value
    }
  }
  return JSON.stringify(object, makeCircularReplacer(), indentation)
}
