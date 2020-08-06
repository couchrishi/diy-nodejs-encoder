var events = require('events');
var util = require('util');

var person = function (name) {
    this.name = name;
};

util.inherits(person, events.EventEmitter);

var james = new person('james');
var people = [james];

people.forEach(function (person) {
    person.on('speak', function (msg) {
        console.log(person.name + 'said:' + msg);
    });
});

james.emit('speak', 'hey hello');