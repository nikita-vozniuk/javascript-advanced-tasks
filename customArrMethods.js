// .map .reduce .filter .find .every .some

// .map

Array.prototype.mapFn = function (callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
}

// .reduce

Array.prototype.reduceFn = function(callback, initialValue) {
    let accumulator = initialValue;
    let startIndex = initialValue === undefined ? 1 : 0;

    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
};

// .filter

Array.prototype.filterFn = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (callback.call(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};

// .find

Array.prototype.findFn = function(callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return this[i];
        }
    }
    return undefined;
};

// .every

Array.prototype.everyFn = function(callback) {
    for (let i = 0; i < this.length; i++) {
        if (!callback(this[i], i, this)) {
            return false;
        }
    }
    return true;
};

// .some

Array.prototype.someFn = function(callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return true;
        }
    }
    return false;
};

// Examples of usage

const numbers = [1, 2, 3, 4];

const doubled = numbers.mapFn(num => num * 2); // [2, 4, 6, 8]
const sum = numbers.reduceFn((acc, cur) => acc + cur, 0); // 10
const evenNumbers = numbers.filterFn(num => num % 2 === 0); // [2, 4]
const found = numbers.findFn(num => num > 2); // 3
const greaterThanZero = numbers.everyFn(num => num > 0); // true
const someItemGreaterThanOne = numbers.someFn(num => num > 4); // true

const users = [
    { name: 'Alex', age: 29 },
    { name: 'Andrew', age: 28 },
    { name: 'Alice', age: 34 },
];

const usernames = users.mapFn(user => user.name);
const ages = users.reduceFn((sum, user) => sum + user.age, 0);
const ageFilters = users.filterFn(user => user.age >= 20);
const user = users.findFn(user => user.age === 34);
const everyByAge = users.everyFn(user => user.age >= 20);
const someIs = users.someFn(user => user.name === 'Alex');
