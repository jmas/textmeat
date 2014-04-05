define([
  'collections/users',
  'collections/records',
], function(Users, Records) {

  var Collections = {
    records: new Records,
    userRecords: new Records
  };

  return Collections;
});