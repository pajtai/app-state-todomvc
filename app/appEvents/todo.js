'use strict';

// ACTIONS:

// Actions can be one file or an organized dir tree.
// Actions manage async interactions.
// Primarily view call actions in reponse to user interactions.
// Models may call actions.
// Actions has minimal business logic and mainly only updates appState to show and hide loading spinner
// Actions should be a collection of promise chains that push data into models.

var appState = require('../appState'),
    todosEvents = require('./todos'),
    todosModel = require('../transforms/todos'),
    _ = require('lodash');

module.exports = {
    add : addTodo,
    doneEditing : doneEditingTodo,
    remove : removeTodo,
    toggle : toggle
};

function addTodo(value) {
    if (!value) {
        return;
    }

    appState.transform('todos', todosModel.addTodo, value);
    todosEvents.saveTodos();
}

function doneEditingTodo(todo, editedText) {

    if (!todo.editing) {
        return;
    }

    todosModel.updateTodo(todo, editedText);
    todosEvents.saveTodos();
}

function removeTodo() {
    var todo = this.todo;
    appState.transform('todos', todosModel.removeTodo, todo);
    todosEvents.saveTodos();
}

function toggle() {
    this.todo.completed = !this.todo.completed;

    // These saves could be done with a subscription to appState('todos') and a set here, but that is harder to track down
    saveTodos();
}