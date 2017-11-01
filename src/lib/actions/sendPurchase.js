'use strict';

module.exports = function(settings) {
  var twtr = require('../helpers/getTwtrQueue');

  twtr('track', 'Conversion', settings);
  turbine.logger.log('Queue command: twtr("track", "Conversion", ' + JSON.stringify(settings) + ').');
};
