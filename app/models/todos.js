'use strict';

var appState = require('../appState'),
    _ = require('lodash');


module.exports = {
    addTodo         : addTodo,
    updateTodo      : updateTodo,
    updateFilter    : updateFilter,
    removeCompleted : removeCompleted,
    removeTodo      : removeTodo,
    startEditing    : startEditing,
    toggleAll       : toggleAll
};

function addTodo(data, value) {
    data.push({ title: value, completed: false });
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

function updateFilter(filter) {
    appState('todos.filter', filter);
}

function removeCompleted() {
    var todos = appState('todos.data'),
        todo,
        counter = todos.length;

    while (counter--) {
        todo = todos[counter];
        if (todo.completed) {
            this.removeTodo({
                opts : {
                    vmodel : todo
                }
            });
        }
    }
}

function removeTodo(todoView) {
    var todo = todoView.opts.vmodel,
        todos = appState('todos.data');

    todo = _.find(todos, function(t) {
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



function toggleAll(checked) {
    var todos = appState('todos.data');
    _.forEach(todos, function(todo) {
        todo.completed = !!checked;
    });
}


function _setRemainingString(todos) {
    console.log('remaining');
    var todos = appState('todos.data'),
        completed = _.filter(todos, function(todo) {
            return !todo.completed;
        }),
        remaining = '';

    switch (completed.length) {
    case 1:
        remaining = 'One item left';
        break;
    default:
        remaining =  completed.length + ' items left';
        break;
    }

    return remaining;
}

function _filterTodos() {
    console.log('filter');
    var filter = appState('todos.filter'),
        filtered,
        todos = appState('todos.data');

    switch (filter) {
    case 'active':
        filtered = _.filter(todos, function(todo) {
            return !todo.completed;
        });
        break;
    case 'completed':
        filtered = _.filter(todos, function(todo) {
            return !!todo.completed;
        });
        break;
    default:
        filtered = todos;
        break;
    }

    return filtered;
}
