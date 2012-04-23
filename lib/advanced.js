var http = require('http')
var oauth = require('oauth').OAuth
var qs = require('querystring')

var app = {}
var methods = {
  activity: '',
  albums: '',
  channels: '',
  contacts: '',
  groups: '',
  oauth: '',
  people: '',
  test: '',
  videos: ''
}

var create = function(pre) {
  return function(method, params, cb) {
    if (typeof params === 'function') cb = params
    if (typeof params !== 'object') params = {}
    var req = format(pre, method, params)
    get(req, cb)
  }
}

var format = function(pre, method, par) {
  par.format = 'json'
  par.method = ['vimeo', pre, method].join('.')
  var base = 'http://vimeo.com/api/rest/v2';
  var query = qs.stringify(par)
  return {
    url: [base, query].join('?')
  }
}

var get = function(req, cb) {
  var o = new oauth('', '', app.key, app.secret, '1.0', null, 'HMAC-SHA1')
  o.get(req.url, req.token, req.secret, function(err, res) {
    if (err !== null) return cb(err, null, res)
    var json = JSON.parse(res)
    if (json.stat === 'ok') cb(null, json, res)
    else cb(json.err.msg, null, res)           
  })
}

module.exports = function(key, sec) {
  app.key = key
  app.secret = sec
  var exports = {}
  for (var x in methods) {
    exports[x] = create(x)
  }
  return exports
}