add-todo
    h1 todos
    input.new-todo(autofocus name="addtodo" autocomplete="off" placeholder="What needs to be done?" onkeyup='{ keyPress }')
    script.
        var constants = require('../../constants.json'),
            todosEvents = require('../../appEvents/todos');

        this.keyPress = keyPress;

        function keyPress(event) {
            switch (event.which) {
                case constants.ENTER_KEY:
                    todosEvents.add(this.addtodo.value);
                    this.addtodo.value = '';
                    break;
                case constants.ESC_KEY:
                    this.addtodo.value = '';
                    break;
            }
        }
