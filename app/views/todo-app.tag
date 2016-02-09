todo-app
    section.todoapp
        header.header
            h1 todos
            input.new-todo(autofocus autocomplete="off" placeholder="What needs to be done?" onkeyup='{ addTodo }')
        section.main(if="{ appState('todos.data').length }")
            input.toggle-all(type="checkbox" onclick="{ toggleAll }")
            ul.todo-list(riot-tag="todos")
        footer.footer(if="{ appState('todos.data').length }")
            span.todo-count
                strong { model.remaining }
            ul.filters
                li
                    a(class="{ selected : 'all' === model.filter }" href="#/all") All
                li
                    a(class="{ selected : 'active' === model.filter }" href="#/active") Active
                li
                    a(class="{ selected : 'completed' === model.filter }" href="#/completed") Completed
            button.clear-completed(onclick="{ removeCompleted }") Clear completed
    footer.info
        p Double-click to edit a todo
        p Written by <a href="http://solid.ws">Solid Interactive</a>
        p Part of <a href="http://todomvc.com">TodoMVC</a>

            script.
                'use strict';

                var self = this,
                    constants = require('../constants.json'),
                    actions = require('../actions'),
                    footerModel = require('./footer/model'),
                    mixins = require('../mixins');

                mixins.stream('todos').transform(footerModel).to(this);

                this.mixin(mixins.listen(['']));
                this.addTodo = addTodo;
                this.toggleAll = toggleAll;
                this.removeCompleted = removeCompleted;

                function addTodo(event) {
                    if (event.which === constants.ENTER_KEY) {
                        var value = event.target.value && event.target.value.trim();
                        actions.todo.add(value);
                        event.target.value = '';
                    }
                }

                function toggleAll(event) {
                    actions.toggleAll(event.target.checked);
                }

                function removeCompleted() {
                    actions.removeCompleted();
                }