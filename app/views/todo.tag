todo
    .view
        input.toggle(type="checkbox" checked="{ opts.vmodel.completed }" onclick="{ toggleTodo }")
        label(ondblclick="{ editTodo }") { opts.vmodel.title }
        button.destroy(onclick="{ removeTodo }")
    input.edit(name="todoeditbox" type="text" onblur="{ doneEdit }" onkeyup="{ editKeyUp }")
    script.
        'use strict';
        var actions = require('../actions'),
            constants = require('../constants'),
            _h = require('highland'),
            EventEmitter = require('events').EventEmitter,
            self = this;

        this.eventKeyEmitter = new EventEmitter;
        this.toggleTodo = toggleTodo;
        this.editTodo = editTodo;
        this.removeTodo = removeTodo;
        this.doneEdit = doneEdit;
        this.editKeyUp = editKeyUp;
        this.getEditedValue = getEditedValue;

        function getEditedValue() {
            return this.todoeditbox.value;
        }

        function toggleTodo() {
            // seems like this should be automatic
            // but riot binding is not two way
            actions.todo.toggle(this);
        }

        function editTodo() {
            var keypressStream = _h('keypress', this.eventKeyEmitter);

            // Todoeditbox value is local to this view
            // no one needs to know about it - no appState change - until user confirms by hitting enter
            this.todoeditbox.value = this.opts.vmodel.title;

            actions.todo.editing(this, keypressStream);
        }

        function editKeyUp(event) {
            this.eventKeyEmitter.emit('keypress', event);
        }

        function removeTodo() {
            console.log('remove');
            actions.todo.remove(this);
        }

        function doneEdit() {
            actions.todo.doneEditing(this, this.todoeditbox.value);
        }

