todos
    input.toggle-all(type="checkbox" onclick="{ toggleAll }")
    ul.todo-list
        li.todo(class='{ completed: todo.completed, editing: todo.editing }' each='{ todo in model.filteredTodos }')
            .view
                input.toggle(type="checkbox" checked="{ todo.completed }" onclick="{ todoEvents.toggle }")
                label(ondblclick="{ editTodo }") { todo.title }
                button.destroy(onclick="{ todoEvents.remove }")
            input.edit(name="todoeditbox" type="text" onblur="{ doneEdit }" onkeyup="{ editKeyUp }")
    script.
        var Model = require('./model'),
            _ = require('lodash'),
            todoEvents = require('../../appEvents/todo'),
            todosEvents = require('../../appEvents/todos'),
            constants = require('../../constants'),
            self = this;

        this.model = new Model();
        this.model.onUpdate(this.update);

        this.todoEvents = todoEvents;
        this.toggleAll = toggleAll;

        function toggleAll(event) {
            todosEvents.toggleAll(event.target.checked);
        }

        this.editTodo = editTodo;
        this.doneEdit = doneEdit;
        this.editKeyUp = editKeyUp;


        function editTodo () {

            // Todoeditbox value is local to this view
            // no one needs to know about it - no appState change - until user confirms by hitting enter
            this.todoeditbox.value = this.todo.title;
            this.todo.editing = true;
        }

        function editKeyUp (event) {
            switch (event.which) {
                case constants.ESC_KEY:
                    this.todoeditbox.value = this.todo.title;
                    // fall through
                case constants.ENTER_KEY:
                    todoEvents.doneEditing(this.todo, this.todoeditbox.value);
                    break;
            }
        }

        function doneEdit () {
            todoEvents.doneEditing(this, this.todoeditbox.value);
        }

