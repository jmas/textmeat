module.exports = {
  index: function(req, res) {
    var fs = require('fs');
    var file = __dirname + '/../../config/api/config.json';
     
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) return res.json({ error: err.toString() }, 500);
     
      data = JSON.parse(data);
     
      res.json(data);
    });
  }
}