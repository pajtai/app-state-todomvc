'use strict';

var appState = require('./appState'),
    _ = require('lodash');

module.exports = {
    listen : listen
};

/**
 *  Call the setup method with the array of paths you want to observe on the appSate.
 *
 * @param pathsArray - array
 * @returns {MixinObject}
 */
function listen(pathsArray) {
    /**
     * @type {MixinObject}
     */
    return {
        init : function() {
            var self = this;

            this.on('error', function(e) {
                console.error(e);
            });

            _.forEach(pathsArray, function(path) {
                appState.subscribe(path, self.update);
            });

            init.call(this);
        }
    };
}

function init() {
    this.appState = appState;
    this.on('mount', this.update);
}
