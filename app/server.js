// Requirements
var app = require('./config')



var users = require('./models/Users');
var userSocial = require('./models/UserSocial')
var pokes = require('./models/Pokes')


var handler = function(model, res, options = {}){
  var defaults = {
    sendData: true,
    successmsg: 'Operation Completed Successfully!',
    httpcode: 404,
    errormsg: 'Object not found.'
  };
  var options = Object.assign({}, defaults, options);


    return model.fetch().then(function(result){
        if(result != null) {
            if(options.sendData) {
              return res.json(result.toJSON())
            } else {
              return res.send(options.successmsg)
            }
        } else {
            res.statusCode = options.httpcode;
            return res.send(options.errormsg)
        }
    })
};

// users.set({
//   username: 'taylor',
//   name: 'Taylor Christie',
//   password: app.mods.encrypt.generate('admin') // encrypt.verify(password, hash)
// }).save()

// users.getByUsername('taylor').then(function(result) {
//   console.log(result.toJSON())
// })

app.framework.get('/', function(req, res) {
  return res.send('NodeJS Backend')
})

// Done, needs token verification tho
app.framework.post('/login', function(req, res) {

  if(!req.body.username || !req.body.password) {
    res.statusCode = 400;
    return res.send('bad request.')
  }

  users.getByUsername(req.body.username).then(function(result) {
    if(result != null) {
      if(app.mods.encrypt.verify(req.body.password, result.get('password'))) {
        // LOGGED IN
        return res.send('OK!')
      }
    }
    res.statusCode = 403;
    return res.send('not ok.')
  })
})

// Unset user token
app.framework.get('/logout', function(req, res) {
})

// Done
app.framework.post('/search', function(req, res) {

  if(!req.body.query) {
    res.statusCode = 400;
    return res.send('bad request.')
  }

  return handler(users.search(req.body.query), res, {
    errormsg: 'No results found.'
  })

})


app.framework.get('/profile', function(req, res) {
  // check if logged in, if they are redirect to their profile page
  // if not redirect to login
  // also get poke notifications
})

app.framework.get('/profile/:id', function(req, res) {
  id = req.params.id
  return handler(users.where('id', id), res, {
    errormsg: 'User not found.'
  })
})

app.framework.post('/profile', function(req, res) {
  // update Social
  // update profile info
})

app.framework.post('/poke', function(req, res) {

})

app.framework.listen(4300, function() {
  console.log('Listening on Port 4300')
})