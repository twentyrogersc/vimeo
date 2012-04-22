var vimeo = require('../index')
var should = require('should')

describe('vimeo', function() {
  
  describe('video()', function() {
    it('should return a video', function(done) {
      vimeo.video(40170418, function(err, res) {
        should.not.exist(err)
        res[0].should.have.property('id', 40170418)
        done()
      })
    })
  })
  
  describe('user()', function() {
    it('should return user info', function(done) {
      vimeo.user('brad/info', function(err, res) {
        should.not.exist(err)
        res.should.have.property('id', 101193)
        done()
      })
    })
    it('should return user videos', function(done) {
      vimeo.user('brad/videos', function(err, res) {
        should.not.exist(err)
        res[0].should.have.property('title')
        done()
      })
    })
    it('should return user likes', function(done) {
      vimeo.user('brad/likes', function(err, res) {
        should.not.exist(err)
        res[0].should.have.property('title')
        done()
      })
    })
    it('should return videos user has appeared in', function(done) {
      vimeo.user('brad/appears_in', function(err, res) {
        should.not.exist(err)
        res[0].should.have.property('title')
        done()
      })
    })
    it('should return all videos relating to user', function(done) {
      vimeo.user('brad/all_videos', function(err, res) {
        should.not.exist(err)
        res[0].should.have.property('title')
        done()
      })
    })
    it('should return user subscriptions', function(done) {
      vimeo.user('brad/subscriptions', function(err, res) {
        should.not.exist(err)
        res[0].should.have.property('title')
        done()
      })
    })
    it('should return user albums', function(done) {
      vimeo.user('brad/albums', function(err, res) {
        should.not.exist(err)
        res[0].should.have.property('total_videos')
        done()
      })
    })
    it('should return user channels', function(done) {
      vimeo.user('brad/channels', function(err, res) {
        should.not.exist(err)
        res[0].should.have.property('total_subscribers')
        done()
      })
    })
    it('should return user groups', function(done) {
      vimeo.user('brad/groups', function(err, res) {
        should.not.exist(err)
        res[0].should.have.property('total_members')
        done()
      })
    })
  });
  
  describe('activity()', function() {
    it('should return activity by user', function(done) {
      vimeo.activity('brad/user_did', function(err, res) {
        should.not.exist(err)
        res[0].should.have.property('type')
        done()
      })
    })
    it('should return activity on user', function(done) {
      vimeo.activity('brad/happened_to_user', function(err, res) {
        should.not.exist(err)
        res[0].should.have.property('type')
        done()
      })
    })
    it('should return activity by user contacts', function(done) {
      vimeo.activity('brad/contacts_did', function(err, res) {
        should.not.exist(err)
        res[0].should.have.property('type')
        done()
      })
    })
    it('should return activity by everyone', function(done) {
      vimeo.activity('brad/everyone_did', function(err, res) {
        should.not.exist(err)
        res[0].should.have.property('type')
        done()
      })
    })
  })
  
  describe('group()', function() {
    it('should return group info', function(done) {
      vimeo.group('motion/info', function(err, res) {
        should.not.exist(err)
        res.should.have.property('id', 109)
        done()
      })
    })
    it('should return group videos', function(done) {
      vimeo.group('motion/videos', function(err, res) {
        should.not.exist(err)
        res[0].should.have.property('title')
        done()
      })
    })
    it('should return group users', function(done) {
      vimeo.group('motion/users', function(err, res) {
        should.not.exist(err)
        res[0].should.have.property('display_name')
        done()
      })
    })
  })
  
  describe('channel()', function() {
    it('should return channel info', function(done) {
      vimeo.channel('delicioussandwich/info', function(err, res) {
        should.not.exist(err)
        res.should.have.property('id', 19)
        done()
      })
    })
    it('should return channel videos', function(done) {
      vimeo.channel('delicioussandwich/videos', function(err, res) {
        should.not.exist(err)
        res[0].should.have.property('title')
        done()
      })
    })
  })
    
  describe('album()', function() {
    it('should return album info', function(done) {
      vimeo.album('1/info', function(err, res) {
        should.not.exist(err)
        res.should.have.property('id', 1)
        done()
      })
    })
    it('should return album videos', function(done) {
      vimeo.album('1/videos', function(err, res) {
        should.not.exist(err)
        res[0].should.have.property('title')
        done()
      })
    })    
  })
  
  
})