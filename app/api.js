'use strict';

var STORAGE_KEY = 'todos-riotjs',
    BB = require('bluebird');

// These are not async with localStorage, but using BB to demo what async would look like
module.exports = {
    fetch : fetch,
    save : save
};

function fetch() {
    return BB
        .try(function() {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        })
        .catch(function(e) {
            console.log('local storage fetch error:', e);
            return [];
        });
}

// TODO: this could be more realistic if it only receives one todo
function save(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    return BB.resolve(todos);
}