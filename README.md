cocoon-compose
==============

Install
-------

`npm install --save cocoon-compose`

About
-----

This lib lets you compose functions whether they return a promise, or not.

Like other composing functions this one evaluates the functions right to left.

cocoon-compose returns a composed function.

The composed function always returns a promise. Composed functions can be synchronous, or asynchronous. As long as a primitive value, or a thenable is returned every function will compose.

Example
-------

```javascript
var compose = require('cocoon-compose');

function a(value){
    return value + 1;
}

function b(value){
    return new Promise(function(resolve){
        resolve(value + 1);
    })
}

function c(value){
    return value + 1;
}


//a returns first. c last.
var abc = compose(c, b, a);

abc(33).then(function(a){
    //Print 36 to the console
    console.log(a);
});
```

Using With The Fetch API
------------------------

Using a hypothetical `people.json` file.

```javascript
function getJSON(response){
    return response.json();
}

function first(jsonDocument){
    return jsonDocument[0];
}

function fullName(json){
    return json.firstName + ' ' + json.lastName;
}

var findFirst = compose(fullName, first, getJSON, fetch);

findFirst('people.json').then(function(firstPerson), {
    console.log(firstPerson);
});
```

Some aspects of what is happening in the last example are unexplained. Hopefully you get the idea.

Look [here](https://fetch.spec.whatwg.org/) for more about the fetch API.
