'use strict';

module.exports = function(settings) {
  var twtr = require('../helpers/getTwtrQueue');

  twtr('track', 'Signup', settings);
  turbine.logger.log('Queue command: twtr("track", "Signup", ' + JSON.stringify(settings) + ').');
};
