var sinon = require('sinon'),
    chai = require('chai'),
    expect = chai.expect,
    Member = require('../../models/member'),
    db = require('../../db');

describe('Member', function() {
  var name = 'Robert Pearce',
      email = 'me@robertwpearce.com',
      team = 'frontEndDevelopers',
      props,
      member;

  describe('validity', function() {
    it('is valid with name, email and team', function() {
      props = { name: name, email: email, team: team };
      member = new Member(props);
      expect(member.isValid()).to.equal(true);
    });

    it('is invalid without name', function() {
      props = { name: '', email: email, team: team };
      member = new Member(props);
      expect(member.isValid()).to.equal(false);
    });

    it('is invalid without email', function() {
      props = { name: name, email: '', team: team };
      member = new Member(props);
      expect(member.isValid()).to.equal(false);
    });

    it('is invalid without team', function() {
      props = { name: name, email: email, team: '' };
      member = new Member(props);
      expect(member.isValid()).to.equal(false);
    });
  });

  describe('#save', function() {
    it('saves a member object', function() {
      props = { name: name, email: email, team: team };
      member = new Member(props);
      expect(member.save()).to.equal(member);
    });

    it('does NOT save a new member w/ invalid props', function() {
      props = { name: '', email: email, team: team };
      member = new Member(props);
      expect(member.save()).to.equal(false);
    });
  });
});
