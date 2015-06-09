var db = require('../db'),
    Member;

Member = function (props) {
  this.name      = props.name;
  this.email     = props.email;
  this.team      = props.team;
  this.reference = props.reference;
  this.about     = props.about;
}

Member.prototype.save = function() {
  var saved = false;

  if (this.isValid()) {
    saved = this;
    db.members.insert(this.serialize(), {}, function(err, results) {
      if (err) { saved = false; }
    });
  }

  return saved;
};

Member.prototype.isValid = function() {
  return !!this.name && !!this.email && !!this.team;
}

Member.prototype.serialize = function() {
  return JSON.parse(JSON.stringify(this));
};

module.exports = Member;
