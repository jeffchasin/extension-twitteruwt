'use strict';

module.exports = function(settings) {
  var twtr = require('../helpers/getTwtrQueue');

  twtr('track', 'Download', settings);
  turbine.logger.log('Queue command: twtr("track", "Download", ' + JSON.stringify(settings) + ').');
};
