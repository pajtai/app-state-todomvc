filter
    span.todo-count
        strong { model.remaining }
    ul.filters
        li
            a(class="{ selected : 'all' === model.filter }" href="#/all") All
        li
            a(class="{ selected : 'active' === model.filter }" href="#/active") Active
        li
            a(class="{ selected : 'completed' === model.filter }" href="#/completed") Completed
    button.clear-completed(onclick="{ actions.removeCompleted }") Clear completed
    script.
        var Model = require('./model');

        this.actions = require('../../actions');

        this.model = new Model();
        this.model.onUpdate(this.update);

