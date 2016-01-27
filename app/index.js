'use strict';

var riot = require('riot'),
    actions = require('./actions'),
    router = require('./router'),
    todos = require('./views/todos.tag');

// Include nested tags, so they are avialable to use
require('./views/todo.tag')

actions.initApp({
    todos : {
        data : [],
        filtered : [],
        filter : 'all',
        remaining : '0 items left'
    }
});

// This is not in initApp to avoid a circular require reference
router.init();

riot.mount(todos);