'use strict'

var path = require('path')
var visit = require('unist-util-visit')
var is = require('hast-util-is-element')
var replaceExt = require('replace-ext')

module.exports = picture

var own = {}.hasOwnProperty

function picture(options) {
  var settings = options || {}

  return transformer

  function transformer(tree) {
    visit(tree, 'element', visitor)
  }

  function visitor(node, index, parent) {
    var src = node.properties.src
    var extension
    var map

    if (!parent || !is(node, 'img') || !src) {
      return
    }

    extension = path.extname(src).slice(1)

    if (!own.call(settings, extension)) {
      return
    }

    map = settings[extension]
    parent.children[index] = {
      type: 'element',
      tagName: 'picture',
      properties: {},
      children: sources(src, map).concat(node)
    }
  }

  function sources(src, map) {
    var nodes = []
    var key

    for (key in map) {
      nodes.push({
        type: 'element',
        tagName: 'source',
        properties: {srcSet: [replaceExt(src, '.' + key)], type: map[key]},
        children: []
      })
    }

    return nodes
  }
}
