/**
 * Created by alexandr on 19.11.16.
 */

(function () {

    function fncToDelay(param) {
        console.log('Delayed run : ' + param);
    }

    function freeze(delay, fnc) {
        var timeout;
        // var first = true;
        var arr = [];

        return function () {
            var args = arguments;
            // if(timeout){
            // return - the first variant!
            //     clearTimeout(timeout);
            // }
            timeout = setTimeout(function () {
                fnc.apply(this, args);

                arr.map(function (item) {
                    // console.log('clear timeout:' + item);
                    clearTimeout(item);
                });
            }, delay);

            arr.push(timeout);

            // if (!first) {
            //     clearTimeout(timeout);
            // } else {
            //     first = false;
            // }
        }
    }

    var frozenFunc = freeze(3000, fncToDelay);
    frozenFunc('1');
    frozenFunc('2');
    frozenFunc('3');
    frozenFunc('4');
    frozenFunc('5');
    frozenFunc('6');
    frozenFunc('7');
    frozenFunc('8');
    frozenFunc('9');


    window.setTimeoutDefault = window.setTimeout;
    window.setTimeout = function (delay, callback) {
        setTimeoutDefault(callback, delay)
    };
    function insertLog() {
        alert("It is your text.");
    }

//  window.setTimeout( 2000, insertLog) ;


    window.setInterval = function (func, delay) {
        setTimeout(delay, function run() {
            func();
            setTimeout(delay, run);
        });
    };
//  window.setInterval(insertLog, 2000);


    function createPipe(originalFnc, arrayArg) {
        var result = '';
        return function (arg) {
            arrayArg.map(function (fnc) {
                arg = fnc(arg);
            });
            result = originalFnc(arg);
            return result;
        }
    }

    function originalFnc(string) {
        var stringarrayWords = string.split(' ');
        var result = arrayWords.map(function (item) {
            return item[0].toUpperCase() + item.substring(1);
        });
        result = result.join(" ");
        console.log(result);
        return result;
    }

    function filterDigits(string) {
        return string.replace(/\d/g, '');
    }

    function filterSpecial(string) {
        return string.replace(/[&\/\\#,+()$~%.@';":*^?=!\-<>{}]/g, '');
    }

    function filterWhiteSpaces(string) {
        return string.replace(/\s+/g, ' ');
    }

    var pipe = createPipe(originalFnc, [filterDigits, filterSpecial, filterWhiteSpaces]);

    pipe('on345l90y    te**x((((t     h$&er@@@e'); // logs 'Only Text Here'
})();


