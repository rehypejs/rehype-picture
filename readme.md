# rehype-picture

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**rehype**][rehype] plugin to wrap images in pictures.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install rehype-picture
```

## Use

```js
import {unified} from 'unified'
import {reporter} from 'vfile-reporter'
import rehypeParse from 'rehype-parse'
import rehypePicture from 'rehype-picture'
import rehypeStringify from 'rehype-stringify'

unified()
  .use(rehypeParse, {fragment: true})
  .use(rehypePicture, {
    jpg: {webp: 'image/webp'},
    png: {svg: 'image/svg+xml'}
  })
  .use(rehypeStringify)
  .process('<img src="cat.jpg">\n<img src="logo.png">')
  .then((file) => {
    console.error(reporter(file))
    console.log(String(file))
  })
```

Yields:

```html
no issues found
<picture><source srcset="cat.webp" type="image/webp"><img src="cat.jpg"></picture>
<picture><source srcset="logo.svg" type="image/svg+xml"><img src="logo.png"></picture>
```

## API

This package exports no identifiers.
The default export is `rehypePicture`.

### `unified().use(rehypePicture[, options])`

Options is an object mapping extensions (without dot, `.`) to search for on
`<img>` elements to “sources”.
Sources are objects mapping replacement extensions (without dot, `.`) to mime
types.

So, if the following options are given:

```js
{
  jpg: {webp: 'image/webp'},
  png: {svg: 'image/svg+xml'}
}
```

…that means `jpg` and `png` are the searched for extensions, which when found
are wrapped in `<picture>` elements.
The values at those keys are the `<source>` elements inserted in the picture.

## Security

Although this plugin should be safe to use, always be careful with user input.
For example, it’s possible to hide JavaScript inside images (such as GIFs,
WebPs, and SVGs).
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

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/rehypejs/.github

[contributing]: https://github.com/rehypejs/.github/blob/HEAD/contributing.md

[support]: https://github.com/rehypejs/.github/blob/HEAD/support.md

[coc]: https://github.com/rehypejs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[rehype]: https://github.com/rehypejs/rehype

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
