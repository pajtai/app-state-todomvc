'use strict';

var appState = require('../appState'),
    todosEvents = require('./todos'),
    todosTransforms = require('../transforms/todos');

module.exports = {
    doneEditing : doneEditingTodo,
    remove : removeTodo,
    toggle : toggle
};

function doneEditingTodo(todo, editedText) {

    if (!todo.editing) {
        return;
    }

    appState.transform('todos', todosTransforms.update, todo, editedText);
    todosEvents.save();
}

function removeTodo() {
    var todo = this.todo;
    appState.transform('todos', todosTransforms.remove, todo);
    todosEvents.save();
}

function toggle() {
    this.todo.completed = !this.todo.completed;

    // These saves could be done with a subscription to appState('todos') and a set here, but that is harder to track down
    todosEvents.save();
}