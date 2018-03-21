'use strict';

module.exports = function(settings) {
  var twtr = require('../helpers/getTwtrQueue');

  twtr('track', 'Purchase', settings);
  turbine.logger.log('Queue command: twtr("track", "Purchase", ' + JSON.stringify(settings) + ').');
};
