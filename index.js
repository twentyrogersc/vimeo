var http = require('http')
var url = require('url')
var qs = require('querystring')

var simple = {
  methods: {
    video: '',
    user: '',
    activity: '', 
    group: '',
    channel: '',
    album: ''
  },
  create: function(method) {
    return function(end, params, cb) {
      if (typeof params === 'function') cb = params
      if (typeof params.page === 'undefined') params = { page: 1 }
      var opts = simple.opts(method, end, params)
      simple.get(opts, cb)
    }
  },
  opts: function(method, end, params) {
    var path = ['/api/v2', method, end].join('/')
    path = path.replace(/[\/]{2,}/, '/')
    path = [path, 'json'].join('.')
    return {
      host: 'vimeo.com',
      path: [path, qs.stringify(params)].join('?'),
    }
  },
  get: function(opts, cb) {
    var data = []
    http.get(opts, function(res) {
      res.on('data', function(chunk) {
        data.push(chunk)
      }).on('end', function() {
        data = data.join('')
        simple.parse(data, cb)
      })
    })
  },
  parse: function(data, cb) {
    var json = null
    var err = null
    try { json = JSON.parse(data) }
    catch(e) { err = 'Not found' }
    cb(err, json, data)
  },
  exports: function() {
    var ex = {}
    for (var m in simple.methods) {
      ex[m] = simple.create(m)
    }
    return ex
  }
}

module.exports = simple.exports()