import test from 'tape'
import {unified} from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import rehypePicture from './index.js'

test('rehypePicture', (t) => {
  unified()
    .use(rehypeParse, {fragment: true})
    .use(rehypePicture)
    .use(rehypeStringify)
    .process('<img src="cat.png">', (error, file) => {
      t.deepEqual(
        [error, String(file)],
        [undefined, '<img src="cat.png">'],
        'should ignore non-matching images'
      )
    })

  unified()
    .use(rehypeParse, {fragment: true})
    .use(rehypePicture, {})
    .use(rehypeStringify)
    .process('<img>', (error, file) => {
      t.deepEqual(
        [error, String(file)],
        [undefined, '<img>'],
        'should ignore images without src'
      )
    })

  unified()
    .use(rehypeParse, {fragment: true})
    .use(rehypePicture, {jpg: {}})
    .use(rehypeStringify)
    .process('<img src="cat.jpg">', (error, file) => {
      t.deepEqual(
        [error, String(file)],
        [undefined, '<picture><img src="cat.jpg"></picture>'],
        'should work without replacement map'
      )
    })

  unified()
    .use(rehypeParse, {fragment: true})
    .use(rehypePicture, {jpg: {webp: 'image/webp'}})
    .use(rehypeStringify)
    .process('<img src="cat.jpg">', (error, file) => {
      t.deepEqual(
        [error, String(file)],
        [
          undefined,
          '<picture><source srcset="cat.webp" type="image/webp"><img src="cat.jpg"></picture>'
        ],
        'should add sources'
      )
    })

  t.end()
})
