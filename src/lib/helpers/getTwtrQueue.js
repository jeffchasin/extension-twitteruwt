'use strict';

var window = require('@adobe/reactor-window');
var loadScript = require('@adobe/reactor-load-script');
var extensionSettings = turbine.getExtensionSettings();

var createTwitterQueue = function() {
  var twq = function() {
    twq.exe ? twq.exe.apply(twq, arguments) : twq.queue.push(arguments);
  };

  twq.version = '1.1';
  twq.queue = [];

  return twq;
};

if (!window.twq) {
  window.twq = createTwitterQueue();

  loadScript('https://static.ads-twitter.com/uwt.js').then(function() {
    turbine.logger.log('Twitter Pixel Base Code was successfully loaded.');
  }, function() {
    turbine.logger.error('Twitter Pixel Base Code could not be loaded.');
  });
}

window.twq('init', extensionSettings.account_id);

module.exports = window.twq;
