'use strict';

var _ = require('lodash');

module.exports = transform;

function transform(todosStream) {
    return todosStream
        .map(calculateRemaining);
}

function calculateRemaining(todos) {
    var completed = _.filter(todos.data, function (todo) {
            return !todo.completed;
        }),
        remaining = '';

    switch (completed.length) {
    case 1:
        remaining = 'One item left';
        break;
    default:
        remaining = completed.length + ' items left';
        break;
    }
    todos.remaining = remaining;
    return todos;
}