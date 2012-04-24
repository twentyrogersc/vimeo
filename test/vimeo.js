var simple = require('../index')()
var should = require('should')

describe('vimeo', function() {
  
  describe('simple api', function() {
    
    it('should return a response from vimeo', function(done) {
      simple.video(40170418, function(err, res) {
        should.not.exist(err)
        res[0].should.have.property('id', 40170418)
        done()
      })
    })
    
    it('should allow a page param to be passed', function(done) {
      simple.channel('moco/videos', function(err, res) {
        should.not.exist(err)
        var first = res[0].id
        simple.channel('moco/videos', { page: 2 }, function(err, res2) {
          res2[0].should.not.have.property('id', first)
          done()
        })
      })
    })
    
    it('should catch an incorrect endpoint', function(done) {
      simple.channel('moco/false', function(err, res) {
        should.not.exist(res)
        err.should.equal('Method not found')
        done()
      })
    })
    
    it('should catch an error from vimeo', function(done) {
      simple.channel('1/videos', function(err, res) {
        should.not.exist(res)
        err.should.equal('Requested item not found')
        done()
      })
    })
    
  })
  
})