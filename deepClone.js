// Deep Clone For Object

function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }

    if (obj instanceof Function) {
        return obj;
    }

    const clone = Array.isArray(obj) ? [] : {};

    for (let key of Object.keys(obj)) {
        clone[key] = deepClone(obj[key]);
    }

    return clone;
}

const objectForCloning = { a: 1, b: { a: 1 }, c: [1, 2], d: { b: [3, 5] } };
const objectResult = deepClone(objectForCloning); // { a: 1, b: { a: 1 }, c: [ 1, 2 ], d: { b: [ 3, 5 ] } }

// Here is simple versions of obj cloning (shallow cloning)

const objForShallowCloning = { a: 'simple', b: 'cloning' };

const spreadMethodClone = { ...objForShallowCloning };
const objectAssignMethodClone = Object.assign({}, objForShallowCloning);
const jsonMethodsClone = JSON.parse(JSON.stringify(objForShallowCloning));
