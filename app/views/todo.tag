todo
    .view
        input.toggle(type="checkbox" checked="{ opts.vmodel.completed }" onclick="{ toggleTodo }")
        label(ondblclick="{ editTodo }") { opts.vmodel.title }
        button.destroy(onclick="{ removeTodo }")
    input.edit(name="todoeditbox" type="text" onblur="{ doneEdit }" onkeyup="{ editKeyUp }")
    script.
        'use strict';
        var actions = require('../actions'),
            constants = require('../constants');

        this.toggleTodo = toggleTodo;
        this.editTodo = editTodo;
        this.removeTodo = removeTodo;
        this.doneEdit = doneEdit;
        this.editKeyUp = editKeyUp;

        function toggleTodo() {
            // seems like this should be automatic
            // but riot binding is not two way
            actions.todo.toggle(this);
        }

        function editTodo() {
            actions.todo.editing(this);

            // Todoeditbox value is local to this view
            // no one needs to know about it - no appState change - until user confirms by hitting enter
            this.todoeditbox.value = this.opts.vmodel.title;
        }

        function editKeyUp(event) {
            switch (event.which) {
                case constants.ENTER_KEY:
                    this.doneEdit();
                    break;
                case constants.ESC_KEY:
                    this.todoeditbox.value = this.opts.vmodel.title;
                    this.doneEdit();
                    break;
            }
        }

        function removeTodo() {
            console.log('remove');
            actions.todo.remove(this);
        }

        function doneEdit() {
            actions.todo.doneEditing(this, this.todoeditbox.value);
        }

