var sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect,
    nock = require('nock'),
    postSignup = require('../routes/postSignup'),
    Member = require('../models/member');

describe('Routes', function() {
  describe('POST /signup', function() {
    var member, req, res, redirectSpy, failSpy;

    it('redirects when successful', function() {
      req = {
        body: {
          member: {
            name: 'Robert Pearce',
            email: 'me@robertwpearce.com',
            team: 'frontenddevelopers',
            reference: 'my friend So And So',
            about: 'I am from South Carolina and...'
          },
          extra: {
            redirect_uri: 'http://www.google.com'
          }
        }
      };

      res = { redirect: sinon.spy() };

      nock('https://frontenddevelopers.slack.com')
        .post('/api/users.admin.invite')
        .reply(201);

      postSignup(req, res);
      expect(res.redirect.calledOnce).to.equal(true);
    });

    it('responds with 422 when unsuccessful', function() {
      req = {
        body: {
          member: {},
          extra: {
            redirect_uri: 'http://www.google.com'
          }
        }
      };

      res = {
        status: function(){},
        send: function(){}
      };
      sinon.stub(res, 'status').returns(res);

      postSignup(req, res);
      expect(res.status.calledOnce).to.equal(true);
      expect(res.status.calledWith(422)).to.equal(true);
    });
  });
});
