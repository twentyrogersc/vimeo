var http = require('http')
var qs = require('querystring')
var url = require('url')

var nameregex = /^(\d{1,}|[a-zA-Z]{1,})$/

var methods = {
  activity: [nameregex, /user_did|happened_to_user|contacts_did|everyone_did/],
  album: [/^\d{1,}$/, /^(videos|info)$/],
  channel: [nameregex, /^(videos|info)$/],
  group: [nameregex, /^(videos|users|info)$/],
  video: [/^\d{1,}$/],
  user: [nameregex, /^(info|videos|likes|appears_in|all_videos|subscriptions|albums|channels|groups)$/],  
};
  
var create = function(method) {
  return function(end, params, cb) {
    if (typeof params === 'function') cb = params
    if (typeof params.page === 'undefined') params = { page: 1 }
    check(method, end, function(err) {
      if (err !== null) return cb(err, null)
      var getOpts = opts(method, end, params)
      get(getOpts, cb)
    })
  }
}

var check = function(method, end, cb) {
  var reg = methods[method]
  end = String(end)
  end = end.replace(/(^\/|\/$)/, '')
  var parts = end.split('/')
  if (reg.length !== parts.length) {
    return cb('incorrect request length')
  }
  for (var x=0; x<reg.length; x++) {
    if (parts[x].match(reg[x]) === null) {
      return cb('incorrect request parameters')
    }
  }
  cb(null)
}
  
var opts = function(method, end, params) {
  var path = ['/api/v2', method, end].join('/')
  path = path.replace(/[\/]{2,}/, '/')
  path = [path, 'json'].join('.')
  return {
    host: 'vimeo.com',
    path: [path, qs.stringify(params)].join('?')
  }
}
  
var get = function(getOpts, cb) {
  var data = []
  http.get(getOpts, function(res) {
    res.on('data', function(chunk) {
      data.push(chunk)
    }).on('end', function() {      
      var json = null
      var err = null
      data = data.join('')
      try { json = JSON.parse(data) }
      catch(e) { err = 'Not found' }
      cb(err, json, data)
    })
  })
}

for (var m in methods) {
  module.exports[m] = create(m)
}