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
}
// Decorate the methods that are test methods
LinkedListTest.prototype.testPushPop = UnitTest.test(LinkedListTest.prototype.testPushPop)
LinkedListTest.prototype.testShiftUnshift = UnitTest.test(LinkedListTest.prototype.testShiftUnshift)
LinkedListTest.prototype.textMixedOps = UnitTest.test(LinkedListTest.prototype.testMixedOps)

// Run the tests
let llt = new LinkedListTest()
llt.run()
