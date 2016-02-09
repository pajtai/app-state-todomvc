'use strict';

var riot = require('riot'),
    actions = require('./actions'),
    router = require('./router'),
    todoApp = require('./views/todo-app.tag');

// Include nested tags, so they are avialable to use
require('./views/todos/view.tag');
require('./views/todo.tag');

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

riot.mount(todoApp);