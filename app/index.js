'use strict';

var riot = require('riot'),
    actions = require('./actions'),
    router = require('./router'),
    app = require('./views/app/view.tag');
//
//// Include nested tags, so they are avialable to use
require('./views/add-todo/view.tag');
require('./views/filter/view.tag');
require('./views/todos/view.tag');
//
actions.initApp({
    todos : [],
    filter : 'all',
    remaining : '0 items left'
});

router.init();

riot.mount(app);