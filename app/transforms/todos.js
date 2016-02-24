'use strict';

var _ = require('lodash');

module.exports = {
    add: add,
    update: update,
    removeCompleted: removeCompleted,
    remove: remove,
    toggleAll: toggleAll
};

function add(todos, value) {
    value = '' + value;
    todos.push({
        title: value.trim(),
        completed: false,
        editing: false
    });
    return todos;
}

function update(todos, todo, enteredText) {
    enteredText = enteredText && enteredText.trim();
    if (enteredText) {
        todo.title = enteredText;
    } else {
        todos = remove(todos, todo);
    }
    todo.editing = false;
    return todos;
}

function removeCompleted(todos) {
    return _.filter(todos, function (todo) {
        return !todo.completed;
    });
}

function remove(todos, todo) {
    todo = _.find(todos, function (t) {
        return t === todo;
    });

    if (todo) {
        todos.splice(todos.indexOf(todo), 1);
    }

    return todos;
}

function toggleAll(todos, checked) {
    return _.map(todos, function (todo) {
        todo.completed = !!checked;
        return todo;
    });
}
