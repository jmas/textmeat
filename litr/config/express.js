function readConfig(cb) {
  var fs = require('fs');
  var file = __dirname + '/api/config.json';
   
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) return res.json({ error: err.toString() }, 500);
   
    data = JSON.parse(data);

    cb(data);
  });
};

module.exports.express = {
    customMiddleware: function(app){
        app.use(function(req, res, next) {
          res.locals.sessionUser = null;

          if (req.session.user) {
              User.findOne({ id: req.session.user }, function(err, user) {
                if (err) res.json({ error: 'DB error' }, 500);

                res.locals.sessionUser = user;
                
                readConfig(function(data) { 
                  res.locals.apiConfig = data;
                  next();
                });
              });
          } else {
            readConfig(function(data) { 
              res.locals.apiConfig = data;
              next();
            });
          }
        });
    }
}