'use strict';

// ACTIONS:

// Actions can be one file or an organized dir tree.
// Actions manage async interactions.
// Primarily view call actions in reponse to user interactions.
// Models may call actions.
// Actions has minimal business logic and mainly only updates appState to show and hide loading spinner
// Actions should be a collection of promise chains that push data into models.

var appState = require('../appState'),
    api = require('./api');

module.exports = {
    app : app
};

function app(data) {
    appState('', data);
    api
        .fetch()
        .then(function(todos) {
            appState('todos', todos);
        });
}