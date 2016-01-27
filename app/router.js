'use strict';

var riot = require('riot'),
    actions = require('./actions');

module.exports = {
    init : init
};

function init() {

    riot.route(function(base) {
        var filter = base || 'all';
        appState('filter.active', filter)
        actions.filter(filter);
    });

    riot.route.start(true);
}

