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
                filteredTodos : applyFilter(todos, filter),
                filter : filter
            };
        })
        .map(function(data) {
            return data;
        });
}

function applyFilter(todos, filter) {
    filter = filter || 'all';

    switch (filter) {
    case 'active':
        todos = _.filter(todos, function(todo) {
            return !todo.completed;
        });
        break;
    case 'completed':
        todos = _.filter(todos, function(todo) {
            return !!todo.completed;
        });
        break;
    }

    return todos;
}
