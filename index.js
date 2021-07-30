import path from 'path'
import {visit} from 'unist-util-visit'
import {isElement} from 'hast-util-is-element'
import replaceExt from 'replace-ext'

const own = {}.hasOwnProperty

export default function rehypePicture(options) {
  const settings = options || {}

  return transformer

  function transformer(tree) {
    visit(tree, 'element', visitor)
  }

  function visitor(node, index, parent) {
    const src = node.properties.src

    if (!parent || !isElement(node, 'img') || !src) {
      return
    }

    const extension = path.extname(src).slice(1)

    if (!own.call(settings, extension)) {
      return
    }

    parent.children[index] = {
      type: 'element',
      tagName: 'picture',
      properties: {},
      children: sources(src, settings[extension]).concat(node)
    }
  }

  function sources(src, map) {
    const nodes = []
    let key

    for (key in map) {
      if (own.call(map, key)) {
        nodes.push({
          type: 'element',
          tagName: 'source',
          properties: {srcSet: [replaceExt(src, '.' + key)], type: map[key]},
          children: []
        })
      }
    }

    return nodes
  }
}
