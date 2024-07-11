const logEvents = require('./logEvents');

// import the EventEmitter class, but why? Explain
// we need to use the EventEmitter class to create an object that can emit events

const EventEmitter = require('events');

// create a class that extends the EventEmitter class, why?
// we are creating a new class that extends the EventEmitter class so that we can create an object that can emit events
class MyEmitter extends EventEmitter {};


// initialize object

const myEmitter = new MyEmitter();

// add the listener for the log event, what will it do explain?
// logEvents is the callback function that will be executed when the log event is emitted
// logEvents will log the message to the console and write it to a file
// logEvents will also append the message to a file


myEmitter.on('log', logEvents);


setTimeout(() => {
    // emit the log event, what will happen?
    // the log event will be emitted and logEvents will be executed
    myEmitter.emit('log', 'log event has been emitted');
}, 2000);