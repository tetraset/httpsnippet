/**
 * @description
 * HTTP code snippet generator for the Shell using HTTPie.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

var util = require('util')
var helpers = require('../../helpers/shell')
var CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  var opts = util._extend({
    body: false,
    cert: false,
    headers: false,
    indent: '  ',
    pretty: false,
    print: false,
    queryParams: false,
    short: false,
    style: false,
    timeout: false,
    verbose: false,
    verify: false
  }, options)

  var code = new CodeBuilder(opts.indent, opts.indent !== false ? ' \\\n' + opts.indent : ' ')

  var raw = false
  var flags = []

  if (opts.headers) {
    flags.push(opts.short ? '-h' : '--headers')
  }

  if (opts.body) {
    flags.push(opts.short ? '-b' : '--body')
  }

  if (opts.verbose) {
    flags.push(opts.short ? '-v' : '--verbose')
  }

  if (opts.print) {
    flags.push(util.format('%s=%s', opts.short ? '-p' : '--print', opts.print))
  }

  if (opts.verify) {
    flags.push(util.format('--verify=%s', opts.verify))
  }

  if (opts.cert) {
    flags.push(util.format('--cert=%s', opts.cert))
  }

  if (opts.pretty) {
    flags.push(util.format('--pretty=%s', opts.pretty))
  }

  if (opts.style) {
    flags.push(util.format('--style=%s', opts.pretty))
  }

  if (opts.timeout) {
    flags.push(util.format('--timeout=%s', opts.timeout))
  }

  // construct query params
  if (opts.queryParams) {
    var queryStringKeys = Object.keys(source.queryObj)

    queryStringKeys.map(function (name) {
      var value = source.queryObj[name]

      if (util.isArray(value)) {
        value.map(function (val) {
          code.push(util.format('%s==%s', name, helpers.quote(val)))
        })
      } else {
        code.push(util.format('%s==%s', name, helpers.quote(value)))
      }
    })
  }

  // construct headers
  Object.keys(source.allHeaders).sort().map(function (key) {
    code.push(util.format('%s:%s', key, helpers.quote(source.allHeaders[key])))
  })

  if (source.postData.mimeType === 'application/x-www-form-urlencoded') {
    // construct post params
    if (source.postData.params && source.postData.params.length) {
      flags.push(opts.short ? '-f' : '--form')

      source.postData.params.map(function (param) {
        code.push(util.format('%s=%s', param.name, helpers.quote(param.value)))
      })
    }
  } else {
    raw = true
  }

  code.unshift(util.format('http %s%s %s', flags.length ? flags.join(' ') + ' ' : '', source.method, helpers.quote(opts.queryParams ? source.url : source.fullUrl)))

  if (raw && source.postData.text) {
    code.unshift(util.format('echo %s | ', helpers.quote(source.postData.text)))
  }

  return code.join()
}

module.exports.info = {
  key: 'httpie',
  title: 'HTTPie',
  link: 'http://httpie.org/',
  description: 'a CLI, cURL-like tool for humans'
}
