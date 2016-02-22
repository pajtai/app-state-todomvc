'use strict';

var appState = require('../appState'),
    _ = require('lodash');


module.exports = {
    addTodo: addTodo,
    updateTodo: updateTodo,
    removeCompleted: removeCompleted,
    removeTodo: removeTodo,
    startEditing: startEditing,
    toggleAll: toggleAll
};

function addTodo(data, value) {
    value = '' + value;
    data.push({title: value.trim(), completed: false});
    return data;
}

function updateTodo(todoView, enteredText) {
    enteredText = enteredText && enteredText.trim();
    if (enteredText) {
        todoView.opts.vmodel.title = enteredText;
    } else {
        this.removeTodo(todoView);
    }
    todoView.opts.vmodel.editing = false;
}

function removeCompleted(todos) {
    return _.filter(todos, function (todo) {
        return !todo.completed;
    });
}

function removeTodo(todoView) {
    var todo = todoView.opts.vmodel,
        todos = appState('todos');

    todo = _.find(todos, function (t) {
        return t === todo;
    });

    if (todo) {
        todos.splice(todos.indexOf(todo), 1);
        this.updateTodos(todos);
    }
}

function startEditing(todoView) {
    todoView.opts.vmodel.editing = true;
}


function toggleAll(todos, checked) {
    return _.map(todos, function (todo) {
        todo.completed = !!checked;
    });
}
