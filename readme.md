# rehype-picture [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Wrap images in pictures with rehype.

## Installation

[npm][]:

```bash
npm install rehype-picture
```

## Usage

```js
var unified = require('unified');
var parse = require('rehype-parse');
var stringify = require('rehype-stringify');
var picture = require('rehype-picture');

unified()
  .use(parse, {fragment: true})
  .use(picture, {
    jpg: {webp: 'image/webp'},
    png: {svg: 'image/svg+xml'}
  })
  .use(stringify)
  .process('<img src="cat.jpg">\n<img src="logo.png">', function (err, file) {
    console.error(err);
    console.log(String(file));
  });
```

Yields:

```html
null
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

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/rehype-picture.svg

[travis]: https://travis-ci.org/wooorm/rehype-picture

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/rehype-picture.svg

[codecov]: https://codecov.io/github/wooorm/rehype-picture

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com
