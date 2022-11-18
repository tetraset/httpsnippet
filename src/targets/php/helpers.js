'use strict'

const convert = function (obj, indent, lastIndent) {
  let i, result

  if (!lastIndent) {
    lastIndent = ''
  }

  switch (Object.prototype.toString.call(obj)) {
    case '[object Null]':
      result = 'null'
      break

    case '[object Undefined]':
      result = 'null'
      break

    case '[object String]':
      result = "'" + obj.replace(/\\/g, '\\\\').replace(/'/g, "'") + "'"
      break

    case '[object Number]':
      result = obj.toString()
      break

    case '[object Array]':
      result = []

      obj.forEach(function (item) {
        result.push(convert(item, indent + indent, indent))
      })

      result = '[\n' + indent + result.join(',\n' + indent) + '\n' + lastIndent + ']'
      break

    case '[object Object]':
      result = []
      for (i in obj) {
        // eslint-disable-next-line no-prototype-builtins
        if (obj.hasOwnProperty(i)) {
          result.push(convert(i, indent) + ' => ' + convert(obj[i], indent + indent, indent))
        }
      }
      result = '[\n' + indent + result.join(',\n' + indent) + '\n' + lastIndent + ']'
      break

    default:
      result = 'null'
  }

  return result
}
const escape_1 = require("../../helpers/escape");
const convertType = function (obj, indent, lastIndent) {
  lastIndent = lastIndent || '';
  indent = indent || '';
  switch (Object.prototype.toString.call(obj)) {
    case '[object Null]':
      return 'null';
    case '[object Undefined]':
      return 'null';
    case '[object String]':
    case '[object Boolean]':
      return "'".concat((0, escape_1.escapeString)(obj, { delimiter: "'", escapeNewlines: false }), "'");
    case '[object Number]':
      return obj.toString();
    case '[object Array]': {
      var contents = obj
          .map(function (item) { return (0, convertType)(item, "".concat(indent).concat(indent), indent); })
          .join(",\n".concat(indent));
      return "[\n".concat(indent).concat(contents, "\n").concat(lastIndent, "]");
    }
    case '[object Object]': {
      var result = [];
      for (var i in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, i)) {
          result.push("".concat((0, convertType)(i, indent), " => ").concat((0, convertType)(obj[i], "".concat(indent).concat(indent), indent)));
        }
      }
      return "[\n".concat(indent).concat(result.join(",\n".concat(indent)), "\n").concat(lastIndent, "]");
    }
    default:
      return 'null';
  }
}

module.exports = {
  convertType: convertType,
  convert: convert,
  methods: [
    'ACL',
    'BASELINE_CONTROL',
    'CHECKIN',
    'CHECKOUT',
    'CONNECT',
    'COPY',
    'DELETE',
    'GET',
    'HEAD',
    'LABEL',
    'LOCK',
    'MERGE',
    'MKACTIVITY',
    'MKCOL',
    'MKWORKSPACE',
    'MOVE',
    'OPTIONS',
    'POST',
    'PROPFIND',
    'PROPPATCH',
    'PUT',
    'REPORT',
    'TRACE',
    'UNCHECKOUT',
    'UNLOCK',
    'UPDATE',
    'VERSION_CONTROL'
  ]
}
