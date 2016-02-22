'use strict';

// ACTIONS:

// Actions can be one file or an organized dir tree.
// Actions manage async interactions.
// Primarily view call actions in reponse to user interactions.
// Models may call actions.
// Actions has minimal business logic and mainly only updates appState to show and hide loading spinner
// Actions should be a collection of promise chains that push data into models.

var appState = require('./appState'),
    api = require('./api'),
    todosModel = require('./models/todos'),
    _ = require('lodash');

module.exports = {
    initApp : initApp,
    filter : filter,
    toggleAll : toggleAll,
    removeCompleted : removeCompleted,
    todo : {
        add : addTodo,
        editing : editingTodo,
        doneEditing : doneEditingTodo,
        remove : removeTodo,
        toggle : toggle
    }
};

function initApp(data) {
    appState('', data);
    api
        .fetch()
        .then(function(todos) {
            console.log('todos', todos);

            appState('todos', todos);
        });
}

function editingTodo(todoView) {
    todosModel.startEditing(todoView);
}

function filter(filter) {
    todosModel.updateFilter(filter);
}

function doneEditingTodo(todoView, editedText) {

    if (!todoView.opts.vmodel.editing) {
        return;
    }

    todosModel.updateTodo(todoView, editedText);
    saveTodos();
}

function addTodo(value) {
    if (!value) {
        return;
    }


    appState.transform('todos', todosModel.addTodo, value);
    saveTodos();
}

function toggle() {
    this.todo.completed = !this.todo.completed;

    // These saves could be done with a subscription to appState('todos') and a set here, but that is harder to track down
    saveTodos();
}

function removeTodo(todoView) {
    todosModel.removeTodo(todoView);
    saveTodos();
}

function toggleAll(checked) {
    appState.transform('todos', todosModel.toggleAll, checked);
    saveTodos();
}

function removeCompleted() {
    appState.transform('todos', todosModel.removeCompleted);
    saveTodos();
}

function saveTodos() {
    // Could add a loading spinner start here
    // most business logic should be in models, but since actions manages all async work, loading spinners
    // controlled by appState is a convenient thing to put in actions

    api
        .save(appState('todos'))
        .then(function(todos) {
            appState('todos', todos);
        });

}