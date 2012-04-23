#vimeo
Node.js module for the vimeo api. 

[![Build Status](https://secure.travis-ci.org/twentyrogersc/vimeo.png)](http://travis-ci.org/twentyrogersc/vimeo)

## Installation

```
npm install vimeo
```

## Simple API
See [vimeo.com/api/docs/simple-api](http://vimeo.com/api/docs/simple-api) for full list of requests.

```javascript
var vimeo = require('vimeo')

vimeo.user('brad/likes', function(err, res) {
  console.log(res[0].id)
})

// pass in page param
vimeo.user('brad/likes', { page: 2 }, function(err, res) {
  console.log(res[0].id)
})
```

## Advanced API
Currently supporting methods not requiring auth. See [vimeo.com/api/docs/methods](http://vimeo.com/api/docs/methods) for full list of methods.

```javascript
var vimeo = require('vimeo').advanced(key, secret)

var params = { channel_id: 'moco' }
vimeo.channels('getVideos', params, function(err, res) {
  console.log(res.videos.video)
})

```

## Todo
* Advanced api methods requiring auth
* Better error checking
* ~~Allow page param for simple requests~~