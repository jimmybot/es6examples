"use strict";

let UnitTest = require('./UnitTest')

// A nonsensical set of tests to demonstrate UnitTest
// These aren't truly tests of UnitTest since some are meant to fail as a demonstration
// Also it's probably weird to be testing the framework with itself
class UnitTestTest extends UnitTest {

    constructor() {
        // It's required that you call parent's constructor
        super()

        // Set some stuff up before all tests
    }

    helperMethod() {
        // I don't do anything, but maybe one day I could
    }

    // In ES7 we could decorate right here where the definition is rather than below
    // @UnitTest.test
    colorTest() {
        this.helperMethod()
        this.eq("green", "green")
        this.eq("blue", "blue")
        this.ne("blue", "green")
        this.lt("blue", "green")
    }

    // @UnitTest.test
    arrayComparisonTest() {
        this.eq([],[])
        this.eq([1,4,6,4,1],[1,4,6,4,1])
    }

    // @UnitTest.test
    badTest() {
        this.eq(5, 2 + 3)
        this.eq(5, 2 + 2)
        this.eq("green", "blue")
        this.gt("blue", "green")
    }

    // @UnitTest.skip("Hmm... doesn't work. Fix this with philosophy later.")
    grueTest() {
        this.eq("green", "blue")
        this.eq("blue", "green")
    }

}

// Annoying manual decoration far from function definition.
// Decorators would be much more concise and in the right place.
UnitTestTest.prototype.colorTest = UnitTest.test(UnitTestTest.prototype.colorTest)
UnitTestTest.prototype.arrayComparisonTest = UnitTest.test(UnitTestTest.prototype.arrayComparisonTest)
UnitTestTest.prototype.badTest = UnitTest.test(UnitTestTest.prototype.badTest)
UnitTestTest.prototype.grueTest = UnitTest.skip(
    UnitTestTest.prototype.grueTest,
    "Hmm... doesn't work. Fix this with philosophy later."
)

let unitTestTest = new UnitTestTest()
unitTestTest.run()
