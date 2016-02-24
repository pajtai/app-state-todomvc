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
            H = require('highland'),
            todoEvents = require('../../appEvents/todo'),
            todosEvents = require('../../appEvents/todos'),
            constants = require('../../constants'),
            self = this;

        this.editKeyUpStream = H();
        this.editKeyUpStream
            .fork()
            .filter(function(event) {
                return constants.ENTER_KEY === event.event.which;
            })
            .each(function(event) {
                todoEvents.doneEditing(event.self.todo, event.self.todoeditbox.value);
            })

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
            this.editKeyUpStream.write({
                event : event,
                self : this
            });
        }

        function doneEdit () {
            todoEvents.doneEditing(this, this.todoeditbox.value);
        }

