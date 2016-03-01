"use strict";
module.exports = cocoon_compose;

var Promise = require('es6-promise').Promise;

/*
git remote add origin https://github.com/hollowdoor/cocoon_compose.git
git push -u origin master
*/

var slice = Array.prototype.slice;

function cocoon_compose(){
    var ops = slice.call(arguments);

    return function(result){
        return proc(ops, result, ops.length, this);
    };
}

function proc(ops, result, index, context){

    if(typeof result.then === 'function'){

        return result.then(function(res){
            proc(ops, res, index, context);
        });

    }

    try{

        for(var i=index - 1; i>-1; --i){

            if(typeof ops[i] === 'function'){
                result = ops[i].call(context || null, result);
            }

            if(result.then && typeof result.then === 'function'){

                return result.then(function(res){
                    return proc(ops, res, i, context)
                }).then(null, function(err){
                    console.log(err);
                    throw err;
                });

            }
        }

    }catch(err){
        return Promise.reject(err);
    }

    return Promise.resolve(result);
}
