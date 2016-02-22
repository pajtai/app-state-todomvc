add-todo
    h1 todos
    input.new-todo(autofocus name="addtodo" autocomplete="off" placeholder="What needs to be done?" onkeyup='{ keyPress }')
    script.
        var H = require('highland'),
            constants = require('../../constants.json'),
            actions = require('../../actions'),
            self = this;

        self.keyPress = keyPress;

        self.keyPresses = H();

        // This is local to this view
        self.keyPresses
            .fork()
            .filter(function(event) {
                return event.which === constants.ENTER_KEY;
            })
            .each(function() {
                actions.todo.add(self.addtodo.value);
                self.addtodo.value = '';
            });

        self.keyPresses
            .fork()
            .filter(function(event) {
                return event.which === constants.ESC_KEY;
            })
            .each(function() {
                self.addtodo.value = '';
                self.update();
            });


        function keyPress(event) {
            this.keyPresses.write(event);
        }
