import test from 'tape'
import unified from 'unified'
import parse from 'rehype-parse'
import stringify from 'rehype-stringify'
import rehypePicture from './index.js'

test('rehypePicture', function (t) {
  unified()
    .use(parse, {fragment: true})
    .use(rehypePicture)
    .use(stringify)
    .process('<img src="cat.png">', function (err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, '<img src="cat.png">'],
        'should ignore non-matching images'
      )
    })

  unified()
    .use(parse, {fragment: true})
    .use(rehypePicture, {})
    .use(stringify)
    .process('<img>', function (err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, '<img>'],
        'should ignore images without src'
      )
    })

  unified()
    .use(parse, {fragment: true})
    .use(rehypePicture, {jpg: {}})
    .use(stringify)
    .process('<img src="cat.jpg">', function (err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, '<picture><img src="cat.jpg"></picture>'],
        'should work without replacement map'
      )
    })

  unified()
    .use(parse, {fragment: true})
    .use(rehypePicture, {jpg: {webp: 'image/webp'}})
    .use(stringify)
    .process('<img src="cat.jpg">', function (err, file) {
      t.deepEqual(
        [err, String(file)],
        [
          null,
          '<picture><source srcset="cat.webp" type="image/webp"><img src="cat.jpg"></picture>'
        ],
        'should add sources'
      )
    })

  t.end()
})
