app
    section.todoapp
        header.header(riot-tag="add-todo")
        section.main(riot-tag="todos" if="{ model.numTodos }")
        footer.footer(if="{ model.numTodos }" riot-tag="filter")
    footer.info
        p Double-click to edit a todo
        p Written by <a href="http://solid.ws">Solid Interactive</a>
        p Part of <a href="http://todomvc.com">TodoMVC</a>

    script.
        'use strict';

        var Model = require('./model');

        this.model = new Model();
        this.model.onUpdate(this.update);
