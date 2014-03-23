/**
 * RecordController
 *
 * @module      :: Controller
 * @description :: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  index: function(req, res) {
    Record.find()
      .sort({'createdAt': -1})
      .populate('user')
      .exec(function(err, models) {
        if (err) return res.json({ error: err.toString() }, 500);

        return res.view({
          items: models
        });
      });
  },
    
  add: function(req, res) {
    return res.view({
        layout: 'simple_layout'
    });
  },

  create: function(req, res) {
    if (! req.session.user) {
      return res.json({ error: 'user not logged in' }, 500);
    }

    User.findOne(req.session.user).exec(function(err, user) {
      if (err) return res.json({ error: 'DB error' }, 500);
      
      Record.create(req.body, function(err, model) {
        if (err) return res.json({ error: err.toString() }, 500);

        user.records.add(model.id);
        user.save(function(err) {
          console.log(err);
        });

        return res.json(model);
      });
    });
  },

  parse: function(req, res) {
    var obj, url, cleanedHtml,
        readability = require('node-readability'),
        sanitizeHtml = require('sanitize-html');//,
        // htmlToMd = require('html-md');

    if (! req.query.url) {
      return res.json({ error: 'param url should be present' }, 500);
    }

    url = req.query.url;
    cleanedHtml = '';

    readability.read(url, function(err, doc) {
        if (err) return res.json({ error: err.toString() }, 500);

        cleanedHtml = doc.getContent();

        if (cleanedHtml) {
          cleanedHtml = sanitizeHtml(cleanedHtml, {
            allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote',
            'p', 'a', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong',
            'em', 'strike', 'code', 'hr', 'br', 'img',
            'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td',
            'pre' ],
            allowedAttributes: {
              a: [ 'href', 'name', 'target' ],
              // We don't currently allow img itself by default, but this
              // would make sense if we did
              img: [ 'src' ]
            },
            // Lots of these won't come up by default because
            // we don't allow them
            selfClosing: [ 'img', 'br', 'hr', 'area', 'base',
              'basefont', 'input', 'link', 'meta' ]
          }).trim();

          cleanedHtml = cleanedHtml.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/ig, "\n");
        }

        // cleanedHtml = htmlToMd(cleanedHtml);

        obj = {
            'url': url,
            'title': doc.getTitle().trim(),
            'contents': cleanedHtml
        };

        res.json(obj);
    });
  },

  fetch: function(req, res) {
    var obj, url, cleanedHtml,
        readability = require('node-readability'),
        sanitizeHtml = require('sanitize-html');

    if (! req.query.url) {
      return res.json({ error: 'param url should be present' }, 500);
    }

    url = req.query.url;
    cleanedHtml = '';

    readability.read(url, function(err, doc) {
        if (err) return res.json({ error: err.toString() }, 500);

        cleanedHtml = doc.getContent();

        if (cleanedHtml) {
          cleanedHtml = sanitizeHtml(cleanedHtml, {
            allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote',
            'p', 'a', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong',
            'em', 'strike', 'code', 'hr', 'br', 'img',
            'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td',
            'pre' ],
            allowedAttributes: {
              a: [ 'href', 'name', 'target' ],
              // We don't currently allow img itself by default, but this
              // would make sense if we did
              img: [ 'src' ]
            },
            // Lots of these won't come up by default because
            // we don't allow them
            selfClosing: [ 'img', 'br', 'hr', 'area', 'base',
              'basefont', 'input', 'link', 'meta' ]
          }).trim();

          cleanedHtml = cleanedHtml.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/ig, "\n");
        }

        obj = {
            'url': url,
            'title': doc.getTitle().trim(),
            'contents': cleanedHtml,
            'imageUrl': null
        };

        res.json(obj);
    });
  },

  attachmentHtml: function(req, res) {
    res.view('partials/attachment', {
      layout: false,
      data: req.body
    });
  },

  view: function(req, res) {
    console.log(req);
    Record.findOne({ id: req.query.id }, function(err, model) {
      if (err) return res.json({ error: 'DB error' }, 500);
      
      return res.view({
        layout: 'simple_layout',
        text: model
      });
    });
  },

  // generateUrlImage: function(req, res) {
  //   if (! req.query.text) {
  //     return res.json({ error: 'param text required' }, 500);
  //   }

  //   var gm = require('gm'),
  //       text = req.query.text;

  //   gm(75, 75)
  //     .background('transparent')
  //     .gravity('Center')
  //     .fontSize(30)
  //     .drawText(text[0])
  //     .write(__dirname + '/../../assets/images/url/' + text[0] + '.png', function (err) {
  //       if (err) return res.json({ error: err.toString() }, 500);

  //       res.redirect('/images/url/' + text[0] + '.png');
  //     });
  // },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to TextController)
   */
  _config: {}

  
};
