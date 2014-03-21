module.exports.express = {
    customMiddleware: function(app){
        app.use(function(req, res, next) {
            if (req.session.user) {
                User.findOne({ id: req.session.user }, function(err, user) {
                  if (err) res.json({ error: 'DB error' }, 500);

                  res.locals.user = user;
                  
                  next();
                });
            } else {
                next();
            }
        });
    }
}