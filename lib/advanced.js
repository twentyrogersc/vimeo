var http = require('http')
var oauth = require('oauth').OAuth
var qs = require('querystring')

var urls = {
  access: 'http://vimeo.com/oauth/access_token',
  api: 'http://vimeo.com/api/rest/v2',
  redirect: 'http://vimeo.com/oauth/authorize',
  request: 'http://vimeo.com/oauth/request_token'
}

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
  return function(method, params, auth, cb) {
    if (typeof params === 'function') cb = params
    else if (typeof auth === 'function') cb = auth
    if (typeof params !== 'object') params = {}
    if (typeof auth !== 'object') auth = {}
    var url = createUrl(pre, method, params)
    get(url, auth, cb)
  }
}

var createUrl = function(pre, method, par) {
  par.format = 'json'
  par.method = ['vimeo', pre, method].join('.')
  var query = qs.stringify(par)
  return [urls.api, query].join('?')
}

var get = function(url, auth, cb) {
  oauth.get(url, auth.token, auth.secret, function(err, res) {
    if (err !== null) return cb(err, null, res)
    var json = JSON.parse(res)
    if (json.stat === 'ok') cb(null, json, res)
    else cb(json.err.msg, null, res)           
  })
}

var getRequestToken = function(redirect, perms, cb) {
  var params = { oauth_callback: redirect }
  oauth.getOAuthRequestToken(params, function(err, token, secret) {
    if (err !== null) {
      return cb(err.data, null)
    }
    var qry = { oauth_token: token, permission: perms }
    var url = [urls.redirect, qs.stringify(qry)].join('?')
    cb(null, { secret: secret, redirect: url })
  })
}

var getAccessToken = function(token, secret, verifier, cb) {
  var onAccess = function(err, acccessToken, accessSecret) {
    if (err !== null) cb(err.data, null)
    else cb(null, { token: acccessToken, secret: accessSecret })
  }
  oauth.getOAuthAccessToken(token, secret, verifier, onAccess)
}

module.exports = function(key, sec) {
  oauth = new oauth(urls.request, urls.access, key, sec, '1.0', null, 'HMAC-SHA1')
  var exports = { getRequestToken: getRequestToken, getAccessToken: getAccessToken }
  for (var x in methods) exports[x] = create(x)
  return exports
}