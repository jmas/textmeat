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
      type: 'text'
    },
    title: {
      type: 'text',
      required: true
    },
    content: {
      type: 'text',
      required: true
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
