'use strict';

var appState = require('../appState'),
    api = require('../api');

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