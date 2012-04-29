#vimeo
Node.js module for the vimeo api. 

[![Build Status](https://secure.travis-ci.org/twentyrogersc/vimeo.png)](http://travis-ci.org/twentyrogersc/vimeo)

## Installation

```javascript
npm install vimeo
```

## Simple API
See [vimeo.com/api/docs/simple-api](http://vimeo.com/api/docs/simple-api) for full list of requests.

```javascript
var vimeo = require('vimeo')()

vimeo.user('brad/likes', function(err, res) {
  console.log(res[0].id)
})

// pass in page param
vimeo.user('brad/likes', { page: 2 }, function(err, res) {
  console.log(res[0].id)
})
```

## Advanced API
See [vimeo.com/api/docs/methods](http://vimeo.com/api/docs/methods) for full list of methods.

```javascript
var key = '' // vimeo api key
var secret = '' // vimeo api secret
var vimeo = require('vimeo')(key, secret)

// vimeo.area(method[, params[, access]], callback)

var params = { channel_id: 'moco' }
vimeo.channels('getVideos', params, function(err, res) {
  console.log(res.videos.video)
})
```

### OAuth
```javascript
// get a request secret and redirect
vimeo.getRequestToken('http://redirecturl', function(err, req) {
  // req.secret: store in session for vimeo.getAccessToken
  // req.redirect: send user to this url
})

// token and verifier from vimeo callback query string, secret from getRequestToken
vimeo.getAccessToken = function(token, secret, verifier, function(err, access)) {
  // access containes access token and access token secret ready for vimeo calls
  vimeo.people('getInfo', {}, access, function(err, res) {
    console.log(res.username)
  })
})
```

## Dependencies
node-oauth [github.com/ciaranj/node-oauth](https://github.com/ciaranj/node-oauth)