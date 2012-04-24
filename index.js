var simple = require('./lib/simple')
var advanced = require('./lib/advanced')

module.exports = function(key, secret) {
  if (secret === undefined) return simple
  else return advanced(key, secret)
}