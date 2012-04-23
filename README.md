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
## Todo
* Advanced api
* Better error checking
* ~~Allow page param for simple requests~~