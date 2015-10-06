"use strict";

let process = require("process")

// A toy unit testing framework to show ES6 classes and why decorators are much nicer
class UnitTest {
    constructor() {
        // passed and failures need to be initialized before each testMethod
        this.passed = null
        this.failures = null
    }

    static comparison(fn) {
        return function () {
            let ret = fn.apply(this, arguments)
            if (ret) {
                process.stdout.write(".")
            } else {
                process.stdout.write("F")
                this.passed = false
                this.failures.push([fn.name, arguments[0], arguments[1]])
            }
            return ret
        }
    }

    static test(fn) {
        let retfn = function () {
            this.passed = true
            this.failures = []

            let ret = fn.apply(this, arguments)
            if (this.passed) {
                process.stdout.write(" => PASSED\n")
            } else {
                process.stdout.write(" => FAILED\n")
                process.stdout.write("    Failures:\n")
                for (let failure of this.failures) {
                    process.stdout.write(`        ${failure[0]} ( ${failure[1]} , ${failure[2]} )\n`)
                }
            }

            return ret
        }
        retfn.isTestMethod = true
        retfn.isSkipped = false
        return retfn
    }

    static skip(fn, reason) {
        let retfn = function () {
            process.stdout.write(`Skipped: ${reason}\n`)
        }
        retfn.isTestMethod = true
        retfn.isSkipped = true

        return retfn
    }

    // In ES7: @comparison
    eq(expected, testValue) {
        return expected === testValue
    }

    // @comparison
    ne(notExpected, testValue) {
        return notExpected !== testValue
    }

    // @comparison
    lt(lowerBound, testValue) {
        return lowerBound < testValue
    }

    // @comparison
    gt(upperBound, testValue) {
        return upperBound > testValue
    }

    // @comparison
    lte(lowerBound, testValue) {
        return lowerBound <= testValue
    }

    // @comparison
    gte(upperBound, testValue) {
        return upperBound >= testValue
    }

    run() {
        for (let testMethod of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            if (this[testMethod].isTestMethod) {
                process.stdout.write(`${testMethod}\n    `)
                this[testMethod]()
            }
        }
    }
}

// Manual decoration, far from the original function definition :(
UnitTest.prototype.eq = UnitTest.comparison(UnitTest.prototype.eq)
UnitTest.prototype.ne = UnitTest.comparison(UnitTest.prototype.ne)
UnitTest.prototype.lt = UnitTest.comparison(UnitTest.prototype.lt)
UnitTest.prototype.gt = UnitTest.comparison(UnitTest.prototype.gt)
UnitTest.prototype.lte = UnitTest.comparison(UnitTest.prototype.lte)
UnitTest.prototype.gte = UnitTest.comparison(UnitTest.prototype.gte)

module.exports = UnitTest
