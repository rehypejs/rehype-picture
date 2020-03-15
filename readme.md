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

[npm][]:

```sh
npm install rehype-picture
```

## Use

```js
var unified = require('unified')
var report = require('vfile-reporter')
var parse = require('rehype-parse')
var stringify = require('rehype-stringify')
var picture = require('rehype-picture')

unified()
  .use(parse, {fragment: true})
  .use(picture, {
    jpg: {webp: 'image/webp'},
    png: {svg: 'image/svg+xml'}
  })
  .use(stringify)
  .process('<img src="cat.jpg">\n<img src="logo.png">', function(err, file) {
    console.error(report(err || file))
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

### `rehype().use(picture[, options])`

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

[build-badge]: https://img.shields.io/travis/rehypejs/rehype-picture.svg

[build]: https://travis-ci.org/rehypejs/rehype-picture

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype-picture.svg

[coverage]: https://codecov.io/github/rehypejs/rehype-picture

[downloads-badge]: https://img.shields.io/npm/dm/rehype-picture.svg

[downloads]: https://www.npmjs.com/package/rehype-picture

[size-badge]: https://img.shields.io/bundlephobia/minzip/rehype-picture.svg

[size]: https://bundlephobia.com/result?p=rehype-picture

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/rehype

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/rehypejs/.github

[contributing]: https://github.com/rehypejs/.github/blob/master/contributing.md

[support]: https://github.com/rehypejs/.github/blob/master/support.md

[coc]: https://github.com/rehypejs/.github/blob/master/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[rehype]: https://github.com/rehypejs/rehype

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting
