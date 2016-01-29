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
            var doneEditingEmitter = new EventEmitter,
                keypressStream = _h('keypress', this.eventKeyEmitter),
                editedStream = _h('edit', doneEditingEmitter);

            editedStream.emit('edit', {
                todo : self.opts.vmodel,
                editing : true
            });

            keypressStream
                    .fork()
                    .find(function (event) {
                        return constants.ENTER_KEY === event.which;
                    })
                    .done(function () {
                        editedStream
                            .emit('edit', {
                                todo : self.opts.vmodel,
                                editing : false,
                                editedValue : getEditedValue()
                            })
                            .done();
                    });

            keypressStream
                    .fork()
                    .find(function (event) {
                        return constants.ESC_KEY === event.which;
                    })
                    .done(function() {
                        editedStream
                            .emit('edit', {
                                todo : self.opts.vmodel,
                                editing : false,
                                editedValue : self.opts.vmodel.title
                            })
                            .done();
                    });
            // Todoeditbox value is local to this view
            // no one needs to know about it - no appState change - until user confirms by hitting enter
            this.todoeditbox.value = this.opts.vmodel.title;

            actions.todo.editing(self, editedStream);
        }

        function editKeyUp(event) {
            this.eventKeyEmitter.emit('keypress', event);
        }

        function removeTodo() {
            console.log('remove');
            actions.todo.remove(this.opts.vmodel);
        }

        function doneEdit() {
            actions.todo.doneEditing(this, this.todoeditbox.value);
        }

