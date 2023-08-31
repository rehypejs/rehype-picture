import assert from 'node:assert/strict'
import test from 'node:test'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import {unified} from 'unified'
import rehypePicture from './index.js'

test('rehypePicture', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('./index.js')).sort(), [
      'default'
    ])
  })

  await t.test('should ignore non-matching images', async function () {
    const file = await unified()
      .use(rehypeParse, {fragment: true})
      .use(rehypePicture)
      .use(rehypeStringify)
      .process('<img src="cat.png">')

    assert.equal(String(file), '<img src="cat.png">')
  })

  await t.test('should ignore images without src', async function () {
    const file = await unified()
      .use(rehypeParse, {fragment: true})
      .use(rehypePicture, {})
      .use(rehypeStringify)
      .process('<img>')

    assert.equal(String(file), '<img>')
  })

  await t.test('should work without replacement map', async function () {
    const file = await unified()
      .use(rehypeParse, {fragment: true})
      .use(rehypePicture, {jpg: undefined})
      .use(rehypeStringify)
      .process('<img src="cat.jpg">')

    assert.equal(String(file), '<picture><img src="cat.jpg"></picture>')
  })

  await t.test('should add sources', async function () {
    const file = await unified()
      .use(rehypeParse, {fragment: true})
      .use(rehypePicture, {jpg: {webp: 'image/webp'}})
      .use(rehypeStringify)
      .process('<img src="cat.jpg">')

    assert.equal(
      String(file),
      '<picture><source srcset="cat.webp" type="image/webp"><img src="cat.jpg"></picture>'
    )
  })
})
