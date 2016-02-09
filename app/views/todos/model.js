'use strict';

var _ = require('lodash');

module.exports = transform;

function transform(todosStream) {
    return todosStream
        .map(applyFilter);
}

function applyFilter(todos) {
    var filter = todos.filter || 'all';

    switch (filter) {
    case 'active':
        todos.data = _.filter(todos.data, function(todo) {
            return !todo.completed;
        });
        break;
    case 'completed':
        todos.data = _.filter(todos.data, function(todo) {
            return !!todo.completed;
        });
        break;
    }

    return todos;
}