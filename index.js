var http = require('http')
var url = require('url')

var simple = {
  base: 'http://vimeo.com/api/v2',
  methods: {
    video: '',
    user: '',
    activity: '', 
    group: '',
    channel: '',
    album: ''
  },
  create: function(method) {
    return function(end, cb) {
      var getUrl = simple.url(method, end)
      simple.get(getUrl, cb)
    }
  },
  url: function(method, end) {
    end = String(end)
    var parts = end.split('.')[0].split('/')
    parts.unshift(simple.base, method)
    return [ parts.join('/'), 'json'].join('.')
  },
  get: function(getUrl, cb) {
    var data = []
    http.get(url.parse(getUrl), function(res) {
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