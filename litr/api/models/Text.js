/**
 * Text
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	url: 'string',
  	title: 'string',
  	content: 'text'
    
  },

  beforeValidation: function(attrs, next) {
    if (! attrs.url || (! attrs.title && ! attrs.content)) {
      return next('url or title, content should be present');
    }

    return next();
  }
};
