# rehype-picture

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[rehype][]** plugin to wrap images in pictures.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(rehypePicture[, options])`](#unifieduserehypepicture-options)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([rehype][]) plugin to change images (`<img>`)
into pictures (`<picture>`).
This lets you use a single image source in your content which is then
automatically turned into a picture with several sources.

**unified** is a project that transforms content with abstract syntax trees
(ASTs).
**rehype** adds support for HTML to unified.
**hast** is the HTML AST that rehype uses.
This is a rehype plugin that changes images in the tree.

## When should I use this?

This plugin is useful when you have the same images in different file formats.
For example, when you have a build step that generates alternative image files
(say, `.webp`s) from source files (say, `.jpg`s).
Then, when you link to the source images, you can use this plugin to generate
the markup for both.

## Install

This package is [ESM only][esm].
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install rehype-picture
```

In Deno with [Skypack][]:

```js
import rehypePicture from 'https://cdn.skypack.dev/rehype-picture@4?dts'
```

In browsers with [Skypack][]:

```html
<script type="module">
  import rehypePicture from 'https://cdn.skypack.dev/rehype-picture@4?min'
</script>
```

## Use

```js
import {unified} from 'unified'
import rehypeParse from 'rehype-parse'
import rehypePicture from 'rehype-picture'
import rehypeStringify from 'rehype-stringify'

main()

async function main() {
  const file = await unified()
    .use(rehypeParse, {fragment: true})
    .use(rehypePicture, {
      jpg: {webp: 'image/webp'},
      png: {svg: 'image/svg+xml'}
    })
    .use(rehypeStringify)
    .process('<img src="cat.jpg">\n<img src="logo.png">')

  console.log(String(file))
}
```

Yields:

```html
<picture><source srcset="cat.webp" type="image/webp"><img src="cat.jpg"></picture>
<picture><source srcset="logo.svg" type="image/svg+xml"><img src="logo.png"></picture>
```

## API

This package exports no identifiers.
The default export is `rehypePicture`.

### `unified().use(rehypePicture[, options])`

Wrap images in pictures.

###### `options`

Configuration that maps search extensions (without dot) to sources
(`Record<string, Sources>?`).

###### `Sources`

Object mapping new extensions (without dot) to mime types.

## Types

This package is fully typed with [TypeScript][].
It exports `Options` and `Sources` types, which specify the interfaces of the
accepted values.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

This plugin works with `rehype-parse` version 3+, `rehype-stringify` version 3+,
`rehype` version 4+, and `unified` version 6+.

## Security

Although this plugin should be safe to use, be careful with user input images
as it’s often possible to hide JavaScript inside them (such as GIFs, WebPs, and
SVGs).
User provided images open you up to a [cross-site scripting (XSS)][xss] attack.

## Contribute

See [`contributing.md`][contributing] in [`rehypejs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/rehypejs/rehype-picture/workflows/main/badge.svg

[build]: https://github.com/rehypejs/rehype-picture/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype-picture.svg

[coverage]: https://codecov.io/github/rehypejs/rehype-picture

[downloads-badge]: https://img.shields.io/npm/dm/rehype-picture.svg

[downloads]: https://www.npmjs.com/package/rehype-picture

[size-badge]: https://img.shields.io/bundlephobia/minzip/rehype-picture.svg

[size]: https://bundlephobia.com/result?p=rehype-picture

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/rehypejs/rehype/discussions

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[npm]: https://docs.npmjs.com/cli/install

[skypack]: https://www.skypack.dev

[health]: https://github.com/rehypejs/.github

[contributing]: https://github.com/rehypejs/.github/blob/HEAD/contributing.md

[support]: https://github.com/rehypejs/.github/blob/HEAD/support.md

[coc]: https://github.com/rehypejs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[typescript]: https://www.typescriptlang.org

[unified]: https://github.com/unifiedjs/unified

[rehype]: https://github.com/rehypejs/rehype

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
