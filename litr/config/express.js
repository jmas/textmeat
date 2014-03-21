module.exports.express = {
    customMiddleware: function(app){
        app.use(function(req, res, next) {
          res.locals.sessionUser = null;

          if (req.session.user) {
              User.findOne({ id: req.session.user }, function(err, user) {
                if (err) res.json({ error: 'DB error' }, 500);

                res.locals.sessionUser = user;
                
                next();
              });
          } else {
              next();
          }
        });
    }
}