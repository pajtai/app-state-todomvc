'use strict';

// ACTIONS:

// Actions can be one file or an organized dir tree.
// Actions manage async interactions.
// Primarily view call actions in reponse to user interactions.
// Models may call actions.
// Actions has minimal business logic and mainly only updates appState to show and hide loading spinner
// Actions should be a collection of promise chains that push data into models.

var appState = require('../appState'),
    api = require('../api'),
    todosTransforms = require('../transforms/todos');

module.exports = {
    toggleAll : toggleAll,
    removeCompleted : removeCompleted,
    save : save
};

function toggleAll(checked) {
    appState.transform('todos', todosTransforms.toggleAll, checked);
    save();
}

function removeCompleted() {
    appState.transform('todos', todosTransforms.removeCompleted);
    save();
}

function save() {
    // Could add a loading spinner start here
    // most business logic should be in models, but since actions manages all async work, loading spinners
    // controlled by appState is a convenient thing to put in actions

    api
        .save(appState('todos'))
        .then(function(todos) {
            appState('todos', todos);
        });

}