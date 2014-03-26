/**
 * Text
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

// var fillContentHtml = function(attrs, next) {
//     var md = require("markdown").markdown;
//     attrs.contentHtml = md.toHTML(attrs.content);
//     next();
// };

module.exports = {

  attributes: {
    user: {
      model: 'user'
    },

    url: 'string',
    message: {
      type: 'text',
      required: true
    },
    title: {
      type: 'text'
    },
    content: {
      type: 'text'
    },
    imageUrl: {
      type: 'string'
    },
    cuttedContent: {
      type: 'string'
    }
    // cuttedContent: function() {
    //   var cuttedContent,
    //       maxLength = 255;

    //   if (this.content.length > 0) { 
    //     cuttedContent = this.content.replace(/(<([^>]+)>)/ig, '').substr(0, maxLength);

    //     //re-trim if we are in the middle of a word
    //     cuttedContent = cuttedContent.substr(0, Math.min(cuttedContent.length, cuttedContent.lastIndexOf(" ")));
    //     return cuttedContent + '&hellip;';
    //   } else {
    //     return '';
    //   }
    // }
  },

  // beforeValidation: function(attrs, next) {
  //   if (! attrs.url || (! attrs.title && ! attrs.content)) {
  //     return next('url or title, content should be present');
  //   }

  //   return next();
  // },

  beforeCreate: function(values, cb) {
    var topics,
        newTopics=[];

    // search for topics
    if (values.message) {
      topics = values.message.match(/#\w+?\b/ig);
      
      if (topics.length > 0) {
        _.each(topics, function(name) {
          name = name.substring(1);
          
          Topic.findOne()
            .where({
              name: new RegExp(name, 'ig')
            })
            .done(function(err, model) {
              if (err) { return; }

              if (model) {
                model.recordsCount = model.recordsCount || 0;
                model.recordsCount++;
                model.save(function() {});
              } else {
                Topic.create({
                  name: name
                }).exec(function() {});
              }
            });
        });

        console.log('newTopics:', newTopics);

        // Topic
        //   .findOrCreate(newTopics, newTopics)
        //   .done(function(err, models) {
        //     if (err) { return; }

        //     _.each(models, function(model) {
        //       console.log('topic err, model:', model);
        //       if (err) { return; }

        //       model.recordsCount = model.recordsCount || 0;
        //       model.recordsCount++;

        //       console.log('new topic: ', model);

        //       model.save();
        //     });
        //   });
      }
    }

    cb();
  }

  // beforeUpdate: function() {
  //   return fillContentHtml.apply(this, arguments);
  // }
};
