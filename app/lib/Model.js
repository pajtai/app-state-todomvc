'use strict';

var _ = require('lodash');

BaseModel.prototype.onUpdate = onUpdate;
BaseModel.prototype.unsubscribe = unsubscribe;
BaseModel.prototype.unsubscribeAll = unsubscribeAll;
BaseModel.prototype.transform = transform;
BaseModel.extend = extend;

module.exports = BaseModel;

function extend(methods) {

    NewModel.prototype = new BaseModel();
    _.extend(NewModel.prototype, methods);

    return NewModel;
}

function BaseModel() { }

function NewModel() {
        var self = this;
        self.subscribers = []
        self.transform()
            .each(function (data) {
                _.extend(self, data);
                _.forEach(self.subscribers, function (subscriber) {
                    subscriber(self);
                });
            });
    };

function onUpdate(subscriber) {
    this.subscribers.push(subscriber);
}

function unsubscribe(subscriberIn) {
    this.subscribers = _.filter(this.subscribers, function(subscriber) {
        return subscriber === subscriberIn;
    });
}

function unsubscribeAll() {
    this.subscribers = [];
}

function transform() {
    throw new Error('You should override Model.transform using Model.extend({ transform : transform })');
}