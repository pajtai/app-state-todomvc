'use strict';

var appState = require('../../appState'),
    Model = require('../../lib/Model');

module.exports = Model.extend({
    transform : transform
});

function transform() {
    return appState
        .stream('todos')
        .map(function(data) {
            return {
                numTodos : data[0].length
            };
        });
}
