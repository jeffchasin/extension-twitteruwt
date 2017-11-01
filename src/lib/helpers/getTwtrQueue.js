'use strict';

var window = require('@adobe/reactor-window');
var loadScript = require('@adobe/reactor-load-script');
var extensionSettings = turbine.getExtensionSettings();
var twtr;

var createTwtrQueue = function() {
  var twtr = function() {
    twtr.callMethod ? twtr.callMethod.apply(twtr, arguments) : twtr.queue.push(arguments);
  };

  twtr.push = twtr;
  twtr.loaded = true;
  twtr.version = '1.0';
  twtr.queue = [];

  return twtr;
};

if (!window.twtr) {
  twtr = createTwtrQueue();

  window.twtr = twtr;
  if (!window._twtr) {
    window._twtr =   twtr;
  }
}

loadScript('https://static.ads-twitter.com/uwt.js').then(function() {
  turbine.logger.log('Twitter Pixel Base Code was successfully loaded.');
}, function() {
  turbine.logger.error('Twitter Pixel Base Code could not be loaded.');
});

window.twtr('init', extensionSettings.account_id);

module.exports = twtr;
