/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    // associations
    records: {
      collection: 'record',
      via: 'user'
    },
    readers: {
      collection: 'user',
      via: 'reading',
      dominant: true
    },
    reading: {
      collection: 'user',
      via: 'readers'
    },
    readingTopics: {
      collection: 'topic',
      via: 'readers'
    },
    
    // fields
    name: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      unique: true,
      required: true
    },
    cryptedEmail: {
      type: 'string'
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6
    },
    recordsCount: {
      type: 'integer',
      defaultsTo: '0'
    },
    readersCount: {
      type: 'integer',
      defaultsTo: '0'
    },
    readingCount: {
      type: 'integer',
      defaultsTo: '0'
    },
    about: {
      type: 'string',
      defaultsTo: 'Few words about me.'
    },
    headColor: {
      type: 'string'
    },

    emailMd5: function() {
      var crypto = require('crypto');
      return crypto.createHash('md5').update(this.email).digest('hex');
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.email;
      // delete obj.records;
      // delete obj.readers;
      // delete obj.reading;
      // delete obj.readingTopics;
      
      return obj;
    }
  },

  beforeCreate: function (attrs, next) {
    var bcrypt = require('bcrypt');

    var xorcrypt = require('xorcrypt/xorcrypt');
    var b = new Buffer(xorcrypt.crypt(attrs.email, sails.config.uniav.cryptKey));
    attrs.cryptedEmail =  b.toString('base64');

    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(attrs.password, salt, function(err, hash) {
        if (err) return next(err);

        attrs.password = hash;
        next();
      });
    });
  },

  beforeUpdate: function(attrs, next) {
    var xorcrypt = require('xorcrypt/xorcrypt');
    var b = new Buffer(xorcrypt.crypt(attrs.email, sails.config.uniav.cryptKey));
    attrs.cryptedEmail =  b.toString('base64');

    if (attrs.password) {
      var bcrypt = require('bcrypt');

      bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(attrs.password, salt, function(err, hash) {
          if (err) return next(err);

          attrs.password = hash;
          next();
        });
      });
    } else {
      next();
    }
  }

};
