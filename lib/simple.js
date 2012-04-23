var http = require('http')
var qs = require('querystring')

var nameregex = /^(\d{1,}|[a-zA-Z]{1,})$/

var methods = {
  activity: [nameregex, /^(user_did|happened_to_user|contacts_did|everyone_did)$/],
  album: [/^\d{1,}$/, /^(videos|info)$/],
  channel: [nameregex, /^(videos|info)$/],
  group: [nameregex, /^(videos|users|info)$/],
  video: [/^\d{1,}$/],
  user: [nameregex, /^(info|videos|likes|appears_in|all_videos|subscriptions|albums|channels|groups)$/],  
}
  
var create = function(method) {
  return function(end, params, cb) {
    if (typeof params === 'function') cb = params
    if (typeof params.page === 'undefined') params = { page: 1 }
    format(method, end, params, function(err, path) {
      if (err !== null) cb(err, null)
      else get(path, cb)
    })
  }
}

var format = function(method, end, params, cb) {
  var reg = methods[method]
  end = String(end)
  end = end.replace(/(^\/|\/$)/, '')
  var parts = end.split('/')
  if (reg.length !== parts.length) {
    return cb('Incorrect request length', null)
  }
  for (var x=0; x<reg.length; x++) {
    if (parts[x].match(reg[x]) === null) {
      return cb('Incorrect request parameters', null)
    }
  }
  parts.unshift('/api/v2', method)
  var path = [parts.join('/'), 'json'].join('.')  
  cb(null, [path, qs.stringify(params)].join('?'))
}
  
var get = function(path, cb) {
  var data = []
  var opts = { host: 'vimeo.com', path: path }
  http.get(opts, function(res) {
    res.on('data', function(chunk) {
      data.push(chunk)
    }).on('end', function() {      
      var json = null
      var err = null
      data = data.join('')
      try { json = JSON.parse(data) }
      catch(e) { err = 'Requested item not found' }
      cb(err, json, data)
    })
  })
}

for (var m in methods) {
  module.exports[m] = create(m)
}