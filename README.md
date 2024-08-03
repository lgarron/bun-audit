# `bun-audit`

Run `yarn audit` on your `bun` project.

Workaround for [the lack of built-in `bun audit`](https://github.com/oven-sh/bun/issues/5359).

## Usage

```shell
bun x bun-audit
```

Note that the `fix` command is not supported, as this would be much more complicated to implement. See https://github.com/oven-sh/bun/issues/5359 for details.
