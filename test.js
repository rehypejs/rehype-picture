import assert from 'node:assert/strict'
import test from 'node:test'
import rehypeParse from 'rehype-parse'
import rehypePicture from 'rehype-picture'
import rehypeStringify from 'rehype-stringify'
import {unified} from 'unified'

test('rehypePicture', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('rehype-picture')).sort(), [
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

  await t.test('should set width and height if available', async function () {
    const file = await unified()
      .use(rehypeParse, {fragment: true})
      .use(rehypePicture, {jpg: {webp: 'image/webp'}})
      .use(rehypeStringify)
      .process('<img src="cat.jpg" width="400" height="200">')

    assert.equal(
      String(file),
      '<picture><source srcset="cat.webp" type="image/webp" width="400" height="200"><img src="cat.jpg" width="400" height="200"></picture>'
    )
  })

  await t.test('should set width if available', async function () {
    const file = await unified()
      .use(rehypeParse, {fragment: true})
      .use(rehypePicture, {jpg: {webp: 'image/webp'}})
      .use(rehypeStringify)
      .process('<img src="cat.jpg" width="400">')

    assert.equal(
      String(file),
      '<picture><source srcset="cat.webp" type="image/webp" width="400"><img src="cat.jpg" width="400"></picture>'
    )
  })

  await t.test('should set height if available', async function () {
    const file = await unified()
      .use(rehypeParse, {fragment: true})
      .use(rehypePicture, {jpg: {webp: 'image/webp'}})
      .use(rehypeStringify)
      .process('<img src="cat.jpg" height="200">')

    assert.equal(
      String(file),
      '<picture><source srcset="cat.webp" type="image/webp" height="200"><img src="cat.jpg" height="200"></picture>'
    )
  })
})
