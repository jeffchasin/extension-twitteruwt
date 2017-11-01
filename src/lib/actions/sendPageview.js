'use strict';

module.exports = function(settings) {
  var twtr = require('../helpers/getTwtrQueue');

  twtr('track', 'Pageview', settings);
  turbine.logger.log('Queue command: twtr("track", "Pageview", ' + JSON.stringify(settings) + ').');
};
