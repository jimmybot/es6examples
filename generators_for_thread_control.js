"use strict";

// Generators can also interestingly be used for controlling the execution path
// Make async code look synchronous!

// This is a minimal example to illustrate how control works
// With multiple threads, you also need to keep track of which thread to restart
// Much of this should be extracted out as it is in existing libraries
// Or even better, use await/async
function main() {
    let t = thread()

    function processValue(value) {
        console.log("Return value currently is:", value)
    }

    function* thread() {
        let ret

        // Do some kind of slow async thing
        let waiter = new Promise(
            function (res, rej) {
                setTimeout(
                () => res(55),
                3000
                )
            }
        )

        // This looks like a callback but all it does is restart this thread
        // when the ret value is ready to be processed
        waiter.then(function(value) {
            console.log("Promise resolved")
            ret = value
            t.next()
        })



        // The return value from the Promise isn't ready to be used yet
        processValue(ret)

        // Let's give up control and let other stuff run while we wait
        yield

        // The return value from the Promise is ready to be processed
        processValue(ret)
    }

    t.next()
    console.log("Doing other stuff while waiting for the Promise to resolve")
}

main()
