'use strict';

var chai = require('chai'),
    appState = require('../../../app/appState'),
    FilterModel = require('../../../app/views/filter/model');

chai.should();

describe('view models', function() {
    describe('filter', function() {
        it('should show numeral of items left if there are many left', function (done) {
            var filterModel = new FilterModel();


            filterModel.onUpdate(function (model) {
                filterModel.unsubscribeAll();
                model.remaining.should.equal('3 items left');
                done();
            });

            appState('todos', [{}, {}, {}]);
        });
        it('should say One if there is one item left', function (done) {
            var filterModel = new FilterModel();

            filterModel.onUpdate(function (model) {
                filterModel.unsubscribeAll();
                model.remaining.should.equal('One item left');
                done();
            });

            appState('todos', [{}]);
        });
    });
});