/**
 * Topic
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs    :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    // associations
    readers: {
      collection: 'user',
      via: 'readingTopics',
      dominant: true
    },

    // fields
    name: {
      type: 'string',
      required: true
    },
    readersCount: {
      type: 'integer',
      defaultsTo: '0'
    },
    recordsCount: {
      type: 'integer',
      defaultsTo: '0'
    }
  }

};
