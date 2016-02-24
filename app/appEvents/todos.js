'use strict';

var appState = require('../appState'),
    api = require('../api'),
    todosTransforms = require('../transforms/todos');

module.exports = {
    add : add,
    toggleAll : toggleAll,
    removeCompleted : removeCompleted,
    save : save
};

function add (value) {
    if (!value) {
        return;
    }

    appState.transform('todos', todosTransforms.add, value);
    save();
}

function toggleAll (checked) {
    appState.transform('todos', todosTransforms.toggleAll, checked);
    save();
}

function removeCompleted() {
    appState.transform('todos', todosTransforms.removeCompleted);
    save();
}

function save () {
    // Could add a loading spinner start here
    // most business logic should be in models, but since actions manages all async work, loading spinners
    // controlled by appState is a convenient thing to put in actions

    api
        .save(appState('todos'))
        .then(function(todos) {
            appState('todos', todos);
        });

}