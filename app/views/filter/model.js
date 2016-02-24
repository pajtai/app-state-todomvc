'use strict';

var appState = require('../../appState'),
    Model = require('../../lib/Model');

module.exports = Model.extend({
    transform : transform
});

function transform() {
    return appState
        .stream('todos', 'filter')
        .map(function(data) {
            var todos = data[0],
                filter = data[1];

            return {
                remaining : calculateRemaining(todos),
                filter : filter
            };
        });
}

function calculateRemaining(todos) {
    var unfinished = _.filter(todos, function (todo) {
            return !todo.completed;
        }),
        remaining = '';

    switch (unfinished.length) {
    case 1:
        remaining = 'One item left';
        break;
    default:
        remaining = unfinished.length + ' items left';
        break;
    }
    return remaining;
}