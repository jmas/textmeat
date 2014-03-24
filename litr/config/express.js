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

          res.locals.toMd5 = function(str) {
            var crypto = require('crypto');
            return crypto.createHash('md5').update(str).digest('hex');
          };

          res.locals.normalizeUserName = function(attrs) {
            var email;

            if (attrs.name) {
              return attrs.name;
            } else if (attrs.email) {
              email = attrs.email
                .replace(/@.+/, '')
                .replace(/[^A-Za-z]/, ' ').replace(/\w\S*/g, function(txt){
                  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });

              return email;
            }

            return 'Unnamed';
          };

          res.locals.toHumanDate = function(date) {
            var moment = require('moment');

            return moment(date);
          };

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