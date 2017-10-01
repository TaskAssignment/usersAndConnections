Schema = {
  users: {
    id: {type: 'increments', nullable: false, primary: true},
    username: {type: 'string', maxlength: 255, nullable: false, unique: true},
    name: {type: 'string', maxlength: 255, nullable: false},
    password: {type: 'string', maxlength: 255, nullable: false},
    token: {type: 'string', maxlength:255, nullable: true}
  },

  social: {
    id: {type: 'increments', nullable: false, primary: true},
    userid: {type: 'integer', maxlength: 16, nullable: false, unique: true},
    facebook_url: {type: 'string', maxlength: 255, nullable: false},
    twitter_url: {type: 'string', maxlength: 255, nullable: false},
    linkedin_url: {type: 'string', maxlength: 255, nullable: false}
  },

  pokes: {
    id: {type: 'increments', nullable: false, primary: true},
    from_userid: {type: 'integer', maxlength: 16, nullable: false, unique: true},
    to_userid: {type: 'integer', maxlength: 16, nullable: false, unique: true},
    seen: {type: 'boolean', default: 0}
  }
};


module.exports = Schema;
