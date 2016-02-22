todos
    input.toggle-all(type="checkbox" onclick="{ toggleAll }")
    ul.todo-list
        li.todo(class='{ completed: todo.completed, editing: todo.editing }' each='{ todo in model.filteredTodos }' )
            .view
                input.toggle(type="checkbox" checked="{ todo.completed }" onclick="{ actions.todo.toggle }")
                label(ondblclick="{ editTodo }") { todo.title }
                button.destroy(onclick="{ actions.todo.remove }")
            input.edit(name="todoeditbox" type="text" onblur="{ doneEdit }" onkeyup="{ editKeyUp }")
    script.
        var Model = require('./model');

        this.model = new Model();
        this.model.onUpdate(this.update);

        var appState = require('../../appState'),
            _ = require('lodash'),
            actions = require('../../actions'),
            constants = require('../../constants');

        this.actions = actions;
        this.toggleAll = toggleAll;

        function toggleAll(event) {
            actions.toggleAll(event.target.checked);
        }
        this.editTodo = editTodo;
        this.doneEdit = doneEdit;
        this.editKeyUp = editKeyUp;


        function editTodo () {
            actions.todo.editing(this);

            // Todoeditbox value is local to this view
            // no one needs to know about it - no appState change - until user confirms by hitting enter
            this.todoeditbox.value = this.opts.vmodel.title;
        }

        function editKeyUp (event) {
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

        function doneEdit () {
            actions.todo.doneEditing(this, this.todoeditbox.value);
        }

