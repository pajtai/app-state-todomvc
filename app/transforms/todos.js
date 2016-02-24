'use strict';

var _ = require('lodash');


module.exports = {
    addTodo: addTodo,
    updateTodo: updateTodo,
    removeCompleted: removeCompleted,
    removeTodo: removeTodo,
    toggleAll: toggleAll
};

function addTodo(data, value) {
    value = '' + value;
    data.push({title: value.trim(), completed: false});
    return data;
}

function updateTodo(todo, enteredText) {
    enteredText = enteredText && enteredText.trim();
    if (enteredText) {
        todo.title = enteredText;
    } else {
        this.removeTodo(todo);
    }
    todo.editing = false;
}

function removeCompleted(todos) {
    return _.filter(todos, function (todo) {
        return !todo.completed;
    });
}

function removeTodo(todos, todo) {
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
