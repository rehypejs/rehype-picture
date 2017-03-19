'use strict';

var path = require('path');
var has = require('has');
var visit = require('unist-util-visit');
var is = require('hast-util-is-element');
var replaceExt = require('replace-ext');
var h = require('hastscript');

module.exports = picture;

function picture(options) {
  var settings = options || {};

  return transformer;

  function transformer(tree) {
    visit(tree, 'element', visitor);
  }

  function visitor(node, index, parent) {
    var src = node.properties.src;
    var extension;
    var map;

    if (!parent || !is(node, 'img') || !src) {
      return;
    }

    extension = path.extname(src).slice(1);

    if (!has(settings, extension)) {
      return;
    }

    map = settings[extension];
    parent.children[index] = h('picture', sources(src, map).concat(node));
  }

  function sources(src, map) {
    var nodes = [];
    var key;

    for (key in map) {
      nodes.push(h('source', {
        srcSet: replaceExt(src, '.' + key),
        type: map[key]
      }));
    }

    return nodes;
  }
}
