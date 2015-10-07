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
        // Here our Promise just waits 3 seconds and then resolves,
        // and passes a value of 55 to the then callback
        let promise = new Promise(
            function (res, rej) {
                setTimeout(
                () => res(55),
                3000
                )
            }
        )

        // This looks like a callback but all it does is restart this thread
        // when the ret value, here 55, is ready to be processed
        promise.then(function(value) {
            console.log("Promise resolved")
            ret = value
            t.next()
        })


        // Calling processValue before yield is not correct
        // The return value from the Promise isn't ready to be used yet
        processValue(ret)

        // Let's give up control and let other stuff run while we wait
        // Notice yield is pretty ugly here to have to do manually
        // Async/await in ES7 removes the need to have to do this yourself
        yield

        // The return value from the Promise is ready to be processed
        processValue(ret)
    }

    t.next()
    console.log("Doing other stuff while waiting for the Promise to resolve")
}

main()
