'use strict';

var test = require('tape');
var unified = require('unified');
var parse = require('rehype-parse');
var stringify = require('rehype-stringify');
var picture = require('.');

test('rehype-picture', function (t) {
  unified()
    .use(parse, {fragment: true})
    .use(picture)
    .use(stringify)
    .process('<img src="cat.png">', function (err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, '<img src="cat.png">'],
        'should ignore non-matching images'
      );
    });

  unified()
    .use(parse, {fragment: true})
    .use(picture, {})
    .use(stringify)
    .process('<img>', function (err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, '<img>'],
        'should ignore images without src'
      );
    });

  unified()
    .use(parse, {fragment: true})
    .use(picture, {jpg: {}})
    .use(stringify)
    .process('<img src="cat.jpg">', function (err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, '<picture><img src="cat.jpg"></picture>'],
        'should work without replacement map'
      );
    });

  unified()
    .use(parse, {fragment: true})
    .use(picture, {jpg: {webp: 'image/webp'}})
    .use(stringify)
    .process('<img src="cat.jpg">', function (err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, '<picture><source srcset="cat.webp" type="image/webp"><img src="cat.jpg"></picture>'],
        'should add sources'
      );
    });

  t.end();
});
