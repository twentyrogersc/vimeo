var http = require('http')
var qs = require('querystring')
var url = require('url')

var methods = {
  video: '',
  user: '',
  activity: '', 
  group: '',
  channel: '',
  album: ''
};
  
var create = function(method) {
  return function(end, params, cb) {
    if (typeof params === 'function') cb = params
    if (typeof params.page === 'undefined') params = { page: 1 }
    var getOpts = opts(method, end, params)
    get(getOpts, cb)
  }
}
  
var opts = function(method, end, params) {
  var path = ['/api/v2', method, end].join('/')
  path = path.replace(/[\/]{2,}/, '/')
  path = [path, 'json'].join('.')
  return {
    host: 'vimeo.com',
    path: [path, qs.stringify(params)].join('?'),
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

var exports = {}
for (var m in methods) {
  exports[m] = create(m)
}
module.exports = exports