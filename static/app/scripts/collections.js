define([
  'collections/users',
  'collections/records',
  'collections/topics'
], function(Users, Records, Topics) {

  var Collections = {
    records: new Records,
    userRecords: new Records,
    topics: new Topics,
    topicRecords: new Records,
  };

  return Collections;
});