#vimeo
Node.js module for the vimeo api.

## Installation

```
npm install vimeo
```

## Simple API
See [vimeo.com/api/docs/simple-api](http://vimeo.com/api/docs/simple-api) for full list of requests.

```javascript
var vimeo = require('vimeo')
vimeo.user('brad/info', function(err, res) {
  console.log(res)
})
```
## Todo
* Advanced api
* Better error checking
* Allow page param for simple requests