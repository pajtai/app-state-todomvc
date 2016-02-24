'use strict';

var chai = require('chai'),
    todosTransforms = require('../../app/transforms/todos');

chai.should();

describe('transforms', function () {
    describe('todos', function () {
        describe('add', function () {
            it('should add a new todo that is not completed at the end of todos', function() {
                var todos = getMinimalList();

                todosTransforms
                    .add(todos, 'Buy More Milk')
                    .should.deep
                    .equal([
                        {
                            title : 'Buy Milk',
                            completed : false,
                            editing : false
                        },
                        {
                            title : 'Buy More Milk',
                            completed : false,
                            editing : false
                        }
                    ]);
            });
        });
        describe('update', function() {
            it('should update the title if the title is truthy', function() {
                var todos = getMinimalList();

                todosTransforms
                    .update(todos, todos[0], 'Buy Lactose Free Milk')
                    .should.deep
                    .equal([
                        {
                            title: 'Buy Lactose Free Milk',
                            completed: false,
                            editing: false
                        }
                    ]);
            });
            it('should remove the todo if the title is falsey', function() {
                var todos = getMinimalList();

                todosTransforms
                    .update(todos, todos[0], '')
                    .should.deep
                    .equal([ ]);
            });
        });
        describe('removeCompleted', function() {
            it('should remove all completed tasks', function() {
                var todos = getTwoItemList();

                todosTransforms
                    .removeCompleted(todos)
                    .should.deep
                    .equal([
                        {
                            title: 'Not Done',
                            completed: false,
                            editing: false
                        }
                    ]);
            });
        });
        describe('remove', function() {
            it('should delete the todo passed in', function() {
                var todos = getTwoItemList();

                todosTransforms
                    .remove(todos, todos[1])
                    .should.deep
                    .equal([
                        {
                            title : 'Done',
                            completed : true,
                            editing : false
                        }
                    ]);
            });
        });
        describe('toggle checked', function() {
            it('should set all todo\'s completed state to what checked is', function() {
                var todos = getTwoItemList();

                todosTransforms
                    .toggleAll(todos, false)
                    .should.deep
                    .equal([
                        {
                            title: 'Done',
                            completed: false,
                            editing: false
                        },
                        {
                            title: 'Not Done',
                            completed: false,
                            editing: false
                        }
                    ]);
            });
        });
    });
});

function getMinimalList() {
    return [
        {
            title: 'Buy Milk',
            completed: false,
            editing : false
        }
    ];
}

function getTwoItemList() {
    return [
        {
            title: 'Done',
            completed: true,
            editing: false
        },
        {
            title: 'Not Done',
            completed: false,
            editing: false
        }
    ];
}