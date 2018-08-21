// ************ Copy and paste the values into node to follow along for extra fun! *********

// The Basics

const object = {};

// More verbose but the same

const anotherObject = new Object();

// we can set values like this

object.name = "name";
object["size"] = 3;

// and we can access them in either way too

object["name"];
// > "name"
object.size;
// > 3

// ES5 has some cool additional options when adding values to an object

Object.defineProperty(anotherObject, "importantInfo", { value: "!!!!", writable: false});

anotherObject.importantInfo;
// > '!!!!'
anotherObject.importantInfo = 'cool';
// > 'cool'  (No error message! Annoying 😡)
anotherObject.importantInfo;
// > '!!!!'

// Old skool constructor method!

function Car (model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;

    this.detailsToString = () => `${this.model} has done ${this.miles} miles`
}

const mondeo = new Car('Mondeo', 1998, 200);

const civic = new Car('Civic', 1995, 500);

mondeo.detailsToString();
// > 'Mondeo has done 200 miles'

// This approach will recreate the detailsToString function for each instance, which is bad!

mondeo.detailsToString === civic.detailsToString;
// > false

// Let's do it better 😄

function BetterCar (model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
}

// Accessing the prototype will add the function to all instances of that Object.
// More details: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype

BetterCar.prototype.detailsToString = function () {
    return `${this.model} has done ${this.miles} miles`;
};

const lambo = new BetterCar('Lambo', 2017, 100);

const rari = new BetterCar('Ferrari', 2000, 100);

// Woop! 🙌

rari.detailsToString === lambo.detailsToString;
// > true

// From ECMA 2015 onwards, we can use the class syntax!

class ClassyCar {
    constructor( { model, year, miles } ){ // the constructor is where we deal with any parameters passed to the object upon instantiation
        this.model = model;
        this.year = year;
        this.miles = miles;
    }

    detailsToString() {
        return `${this.model} has done ${this.miles} miles`
    };
}

const merc = new ClassyCar({year: 1991, model: 'Mercedes', miles: 1000}); // we're using objects here because then we don't need to worry about the order in which we pass the arguments!
const jag = new ClassyCar({ model: 'Jaguar', miles: 600000, year: 2002});

// We don't have to mess around with the object's prototype anymore, the syntax handles this for us

jag.detailsToString === merc.detailsToString;
// > true

// We can also extend classes - most commonly seen when we extend React.Component

class Transformer extends ClassyCar {
    constructor({name, year, miles, model}) {
        super({year, miles, model}); // this is where we invoke the constructor of the parent class
        this.name = name;
    }

    transform() {
        console.log(`${this.model} has TRANSFORMED into ${this.name}`);
        this.model = this.name;
    };
}

const optimus = new Transformer({name: 'Optimus Prime', year: 2002, model: '18 Wheeler', miles: '1 billion'});

optimus.detailsToString();
// > '18 Wheeler has done 1 billion miles'
optimus.transform();
// 18 Wheeler has TRANSFORMED into Optimus Prime
optimus.detailsToString();
// > 'Optimus Prime has done 1 billion miles'
