"use strict";

let process = require("process")

// A toy, minimally usable, unit testing framework to show ES6 classes and why decorators are much nicer
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

    // .eq will compare arrays and iterable objects for you correctly if the structure is not nested (depth of 1)
    // 
    // In ES7: @UnitTest.comparison wouldn't work here because we want to
    // decorate the original function, but then give it a new name
    _eq(expected, testValue) {
        let ret

        // If the object is iterable, eg Array, test each element
        // There's no nice syntax for iterating simlutaneously through two iterables together so we'll do it ourselves
        if (expected && testValue && expected[Symbol.iterator] && testValue[Symbol.iterator]) {
            let nxt,
                iter = testValue[Symbol.iterator]()

            ret = true
            for (let v of expected) {
                nxt = iter.next()
                // Check nxt.done to ensure same length
                if (nxt.done || v !== nxt.value) {
                    ret = false
                    break
                }
            }

        // The normal case, do a direct comparison
        } else {
            ret = (expected === testValue)
        }

        return ret
    }

    // @UnitTest.comparison would not work
    // Note we wouldn't be able to call the original .eq if
    // we used ES7 decorators
    _ne(notExpected, testValue) {
        return !(this._eq(notExpected, testValue))
    }

    // @UnitTest.comparison would not work
    _lt(lowerBound, testValue) {
        return lowerBound < testValue
    }

    // @UnitTest.comparison would not work
    _gt(upperBound, testValue) {
        return upperBound > testValue
    }

    // @UnitTest.comparison would not work
    _lte(lowerBound, testValue) {
        return !(this._gt(lowerBound, testValue))
    }

    // @UnitTest.comparison would not work
    _gte(upperBound, testValue) {
        return !(this._lt(upperBound, testValue))
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

// Manual decoration required, because we are also renaming
UnitTest.prototype.eq = UnitTest.comparison(UnitTest.prototype._eq)
UnitTest.prototype.ne = UnitTest.comparison(UnitTest.prototype._ne)
UnitTest.prototype.lt = UnitTest.comparison(UnitTest.prototype._lt)
UnitTest.prototype.gt = UnitTest.comparison(UnitTest.prototype._gt)
UnitTest.prototype.lte = UnitTest.comparison(UnitTest.prototype._lte)
UnitTest.prototype.gte = UnitTest.comparison(UnitTest.prototype._gte)

module.exports = UnitTest
