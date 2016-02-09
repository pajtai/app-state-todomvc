todos
    li.todo(riot-tag="todo" class='{ completed: opts.vmodel.completed, editing: opts.vmodel.editing }' vmodel="{ viewModel }" each='{ viewModel in model.todos.data }' )
    script.
        var appState = require('../../appState'),
            _ = require('lodash'),
            self = this;

        self.model = {};

        appState
            .stream('todos')
            .map(function (todos) {
                var completed = _.filter(todos.data, function (todo) {
                            return !todo.completed;
                        }),
                        remaining = '';

                switch (completed.length) {
                case 1:
                    remaining = 'One item left';
                    break;
                default:
                    remaining = completed.length + ' items left';
                    break;
                }
                todos.remaining = remaining;
                return todos;
            })
            .map(function (todos) {
                var filter = todos.filter || 'all';

                switch (filter) {
                case 'active':
                    todos.data = _.filter(todos.data, function(todo) {
                        return !todo.completed;
                    });
                    break;
                case 'completed':
                    todos.data = _.filter(todos.data, function(todo) {
                        return !!todo.completed;
                    })
                    break;
                }

                console.log('filtered', todos);
                return todos;
            })
            .each(function(todos) {
                self.model.todos = todos;
                console.log(todos);
                self.update();
            });