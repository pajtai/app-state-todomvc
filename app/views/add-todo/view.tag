add-todo
    h1 todos
    input.new-todo(autofocus autocomplete="off" placeholder="What needs to be done?" onkeyup='{ addTodo }')
    script.

        this.addTodo = addTodo;

        function addTodo (event) {
            if (event.which === constants.ENTER_KEY) {
                var value = event.target.value && event.target.value.trim();
                actions.todo.add(value);
                event.target.value = '';
            }
        }