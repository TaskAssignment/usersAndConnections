var orm = require('../config').orm


var Users = orm.Model.extend({
  tableName: 'users',

  hidden: ['password'],

  getByUsername: function(name) {
    return this.where('username', name).fetch()
  },

  search: function(query) {
    return this.query(function(qb) {
      qb.where('username', 'LIKE', '%'+query+'%').orWhere('name', 'LIKE', '%'+query+'%');
    })
  }

})



module.exports = new Users()
