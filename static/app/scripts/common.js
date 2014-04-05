define([
  'config'
], function(config) {
  return {
    getBaseUrl: function() {
      return config.baseUrl;
    },

    getUrl: function(url) {
      return this.getBaseUrl() + url;
    }
  };
});