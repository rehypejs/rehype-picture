# rehype-picture

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Chat][chat-badge]][chat]

Wrap images in pictures with rehype.

## Installation

[npm][]:

```bash
npm install rehype-picture
```

## Usage

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

Options is an object mapping extensions (without dot) to search for on
`<img>` elements to “sources”.  Sources are objects mapping replacement
extensions (without dot) to mime-types.

So, if the following options are given:

```js
{
  jpg: {webp: 'image/webp'},
  png: {svg: 'image/svg+xml'}
}
```

...that means `jpg` and `png` are the searched for extensions, which when
found are wrapped in `<picture>` elements.  The values at those keys are the
`<source>` elements inserted in the picture.

## Contribute

See [`contributing.md` in `rehypejs/rehype`][contribute] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/rehypejs/rehype-picture.svg

[build]: https://travis-ci.org/rehypejs/rehype-picture

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype-picture.svg

[coverage]: https://codecov.io/github/rehypejs/rehype-picture

[downloads-badge]: https://img.shields.io/npm/dm/rehype-picture.svg

[downloads]: https://www.npmjs.com/package/rehype-picture

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/rehype

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[contribute]: https://github.com/rehypejs/rehype/blob/master/contributing.md

[coc]: https://github.com/rehypejs/rehype/blob/master/code-of-conduct.md
