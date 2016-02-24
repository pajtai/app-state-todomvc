'use strict';

BaseModel.prototype.onUpdate = onUpdate;
BaseModel.prototype.transform = transform;
BaseModel.extend = extend;

module.exports = BaseModel;

function extend(methods, constructor) {
    var NewModel = constructor || function() { };

    NewModel.prototype = new BaseModel();
    _.extend(NewModel.prototype, methods);

    return NewModel;
}

function BaseModel() { }

function onUpdate(subscriber) {
    var self = this;

    this.transform()
        .each(function(data) {
            _.extend(self, data);
            subscriber();
        });
}

function transform() {
    console.log('override this');
}