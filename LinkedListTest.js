"use strict";

let UnitTest = require('./UnitTest')
let LinkedList = require('./LinkedList')

class LinkedListTest extends UnitTest {

    // In ES7: @UnitTest.test
    testPushPop() {
        let l = new LinkedList()
        l.push("green")
        l.push("black")
        l.push("blue")

        this.eq("blue", l.pop())
        this.eq("black", l.pop())
        this.eq("green", l.pop())
    }

    // @UnitTest.test
    testShiftUnshift() {
        let l = new LinkedList()
        l.unshift("green")
        l.unshift("black")
        l.unshift("blue")

        this.eq("blue", l.shift())
        this.eq("black", l.shift())
        this.eq("green", l.shift())
    }

    // @UnitTest.test
    testMixedOps() {
        let l = new LinkedList()
        l.push("green")
        l.unshift("blue")

        this.eq("blue", l.shift())
        this.eq("green", l.pop())
    }

    // @UnitTest.test
    testIteration() {
        let l = new LinkedList()
        let expected_values = ["green", "blue", "grue"]
        let values = []

        l.push("green")
        l.push("blue")
        l.push("grue")

        for (let v of l) {
            values.push(v.getValue())
        }

        for (let i=0; i<expected_values.length; i++) {
            this.eq(expected_values[i], values[i])
        }
    }
}
// Decorate the methods that are test methods
LinkedListTest.prototype.testPushPop = UnitTest.test(LinkedListTest.prototype.testPushPop)
LinkedListTest.prototype.testShiftUnshift = UnitTest.test(LinkedListTest.prototype.testShiftUnshift)
LinkedListTest.prototype.testMixedOps = UnitTest.test(LinkedListTest.prototype.testMixedOps)
LinkedListTest.prototype.testIteration = UnitTest.test(LinkedListTest.prototype.testIteration)

// Run the tests
let llt = new LinkedListTest()
llt.run()
