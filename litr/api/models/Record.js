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
    
    url: 'string',
    title: {
      type: 'text',
      required: true
    },
    content: {
      type: 'text',
      required: true
    }//,
    // contentHtml: 'text'
  }//,

  // beforeValidation: function(attrs, next) {
  //   if (! attrs.url || (! attrs.title && ! attrs.content)) {
  //     return next('url or title, content should be present');
  //   }

  //   return next();
  // },

  // beforeCreate: function() {
  //   return fillContentHtml.apply(this, arguments);
  // },

  // beforeUpdate: function() {
  //   return fillContentHtml.apply(this, arguments);
  // }
};
