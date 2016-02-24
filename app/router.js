'use strict';

var riot = require('riot');

module.exports = {
    init : init
};

function init() {

    riot.route(function(base) {
        var filter = base || 'all';
        appState('filter', filter);
    });

    riot.route.start(true);
}

