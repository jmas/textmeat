function readConfig(cb) {
  var fs = require('fs');
  var file = __dirname + '/api/config.json';
   
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) return res.json({ error: err.toString() }, 500);
   
    data = JSON.parse(data);

    cb(data);
  });
};

function toMd5(str) {
  var crypto = require('crypto');
  return crypto.createHash('md5').update(str).digest('hex');
};

function normalizeUserName(attrs) {
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

function toHumanDate(date) {
  var moment = require('moment');

  return moment(date);
};

function shortString(s, l, reverse) {
  var stop_chars = [' ','/', '&'];
  var acceptable_shortness = l * 0.80; // When to start looking for stop characters
  var reverse = typeof(reverse) != "undefined" ? reverse : false;
  var s = reverse ? s.split("").reverse().join("") : s;
  var short_s = "";

  for(var i=0; i < l-1; i++){
      short_s += s[i];
      if(i >= acceptable_shortness && stop_chars.indexOf(s[i]) >= 0){
          break;
      }
  }
  if(reverse){ return short_s.split("").reverse().join(""); }
  return short_s;
}

function shortUrl(url, l) {
  var l = typeof(l) != "undefined" ? l : 50;
  var chunk_l = (l/2);
  var url = url.replace("http://","").replace("https://","");

  if(url.length <= l){ return url; }

  var start_chunk = shortString(url, chunk_l, false);
  var end_chunk = shortString(url, chunk_l, true);
  return start_chunk + "&hellip;" + end_chunk;
}

function findUrlAndMakeTag(str, l) {
  return str.replace(/(\b(((https?|ftp|file):\/\/)|www\.)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, function(url) {
    return '<a href="' + url + '" target="_blank">' + shortUrl(url, l) + '</a>';
  });
}

function findTopicAndMakeTag(str) {
  return str.replace(/#\w+?\b/ig, function(t) {
    return '<a class="topic" href="/topic/view?name=' + t.substring(1) + '">' + t.substring(1) + '</a>'
  });
}

module.exports.express = {
    customMiddleware: function(app){
        app.use(function(req, res, next) {
          res.locals.sessionUser = null;

          res.locals.toMd5 = toMd5;
          res.locals.normalizeUserName = normalizeUserName;
          res.locals.toHumanDate = toHumanDate;
          res.locals.findUrlAndMakeTag = findUrlAndMakeTag;
          res.locals.findTopicAndMakeTag = findTopicAndMakeTag;

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