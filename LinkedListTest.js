"use strict";

let UnitTest = require('./UnitTest'),
    LinkedList = require('./LinkedList').LinkedList,
    LinkedListNode = require('./LinkedList').LinkedListNode

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
        let l = new LinkedList(),
            l2 = new LinkedList()
        let expected_values = ["green", "blue", "grue"]
        let values = []

        for (let v of expected_values) {
            l.push(v)
            l2.push(v)
        }

        for (let v of l) {
            values.push(v)
        }

        // Compare two Arrays
        this.eq(expected_values, values)

        // Compare Array directly with the LinkedList since eq knows about iterables
        this.eq(expected_values, l)

        // Compare two LinkedLists
        this.eq(l, l2)
    }

    // @UnitTest.test
    testNodeIteration() {
        let n_nodes = 0,
            l = new LinkedList()
        l.push("green")
        l.push("blue")
        l.push("grue")

        for (let n of l.getNodes()) {
            n_nodes += 1
            this.eq(true, n instanceof LinkedListNode)
        }

        this.eq(3, n_nodes)
    }
}
// Decorate the methods that are test methods
LinkedListTest.prototype.testPushPop = UnitTest.test(LinkedListTest.prototype.testPushPop)
LinkedListTest.prototype.testShiftUnshift = UnitTest.test(LinkedListTest.prototype.testShiftUnshift)
LinkedListTest.prototype.testMixedOps = UnitTest.test(LinkedListTest.prototype.testMixedOps)
LinkedListTest.prototype.testIteration = UnitTest.test(LinkedListTest.prototype.testIteration)
LinkedListTest.prototype.testNodeIteration = UnitTest.test(LinkedListTest.prototype.testNodeIteration)

// Run the tests
let llt = new LinkedListTest()
llt.run()
