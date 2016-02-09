todos
    li.todo(riot-tag="todo" class='{ completed: opts.vmodel.completed, editing: opts.vmodel.editing }' vmodel="{ viewModel }" each='{ viewModel in model.data }' )
    script.
        var appState = require('../../appState'),
            _ = require('lodash'),
            viewModel = require('./model'),
            mixins = require('../../mixins');

        mixins.stream('todos').transform(viewModel).to(this);
