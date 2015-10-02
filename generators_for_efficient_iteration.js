"use strict";

function annotate(msg, fn) {
    console.log("# BEGIN " + msg + " output\n")
    fn()
    console.log("\n# END\n")
}

// Like the old Python range vs xrange
// Generators can improve memory efficiency

function range(n, m) {
    let ret = []
    for (let i=n; i < m; i++) {
        ret.push(i)
    }
    return ret
}

function* xrange(n, m) {
    for (let i=n; i < m; i++) {
        yield i;
    }
}

annotate("range", function () {

    for (let i of range(10, 20)) {
        console.log(i)
    }

})

annotate("xrange", function () {

    for (let i of xrange(20, 30)) {
        console.log(i)
    }

})

annotate("custom iterator", function() {

    // Aside on how Symbols work
    console.log("Aside: Symbols are unique for each call")
    let compareSymbols = 'Symbol("north") === Symbol("north")'
    console.log(compareSymbols, "is", eval(compareSymbols), "\n")

    // Let's say we have objects that have cardinal direction properties
    // And we want to go through them one by one
    const NW = Symbol("north west")
    const N = Symbol("north")
    const NE = Symbol("north east")
    const E = Symbol("east")
    const SE = Symbol("south east")
    const S = Symbol("south")
    const SW = Symbol("south west")
    const W = Symbol("west")

    let obj = {}
    obj[Symbol.iterator] = function* () {
        yield NW
        yield N
        yield NE
        yield E
        yield SE
        yield S
        yield SW
        yield W
    }

    for (let i of obj) {
        console.log("Direction:", i)
    }
})
