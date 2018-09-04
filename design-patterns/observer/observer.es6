// https://www.sitepoint.com/javascript-design-patterns-observer-pattern/ - what most of this is based on

//https://s3-eu-west-1.amazonaws.com/uploads-eu.hipchat.com/111274/5339983/tUGi77Q6UqpbAXC/upload.jpg - diagram of difference between Observer and Publish/Subscribe

// https://github.com/tes/module-marketing-loader/blob/master/src/slot-observer.js - example of observer pattern we use in Module-Marketing-Loader

// Follow along in a Node REPL for even more fun!

class EventObserver { // according to the Gang of Four defininition, this is considered the subject
    constructor() {
        this.observers = [];
    }

    subscribe(fn) {
        this.observers.push(fn);
    }

    unsubscribe(fn) {
        this.observers = this.observers.filter((subscriber) => subscriber !== fn);
    }

    broadcast(data) {
        this.observers.forEach((subscriber) => subscriber(data));
    }
}

const observer = new EventObserver();

const subscriber = (data) => console.log('data: ', data);  // According to GoF, this would be considered an observer

observer.subscribe(subscriber);

observer.broadcast('Hey there!');

// > data: 'Hey there!'

const mirror = (data) => console.log('atad:', data.split("").reverse().join("")); // reverse the string

observer.subscribe(mirror);

observer.broadcast('Hello!');

// > data: 'Hello!'
// > atad: '!olleH'

observer.unsubscribe(subscriber);

observer.broadcast('Hi :(');

// > atad: '(: iH'
