"use strict";

class LinkedList {
    constructor() {
        this.first = null
        this.last = null
    }

    *[Symbol.iterator]() {
        let next = this.first
        while (next) {
            yield next
            next = next.getNext()
        }
    }

    getFirst() {
        return this.first ? this.first.value : null
    }

    getLast() {
        return this.last ? this.last.value : null
    }

    push(value) {
        if (this.last) {
            let n = new LinkedListNode(value)
            n.setPrevious(this.last)
            this.last.setNext(n)
            this.last = n
        } else {
            this.first = this.last = new LinkedListNode(value)
        }
        return this.last
    }

    pop() {
        let ret, prev

        if (this.last) {
            ret = this.last.getValue()
            if (this.first === this.last) {
                this.first = null
                this.last = null
            } else {
                prev = this.last.getPrevious()
                prev.setNext(null)
                this.last = prev
            }
        } else {
            ret = null
        }

        return ret
    }

    unshift(value) {
        let lln = new LinkedListNode(value)
        if (this.first) {
            lln.setNext(this.first)
            this.first = this.first.setPrevious(lln)
        } else {
            this.first = lln
            this.last = lln
        }
    }

    shift() {
        let ret

        if (this.first) {
            ret = this.first.getValue()
            this.first = this.first.getNext()
            if (this.first) {
                this.first.setPrevious(null)
            }
        } else {
            ret = null
        }

        return ret
    }

    render() {
        // Iterate over the nodes of the LinkedList and print the prev / value / next
        // Custom iteration of the object is accomplished by defining the Symbol.iterator method above
        for (let n of this) {
            console.log(n.toString())
        }
    }
}

class LinkedListNode {
    constructor(value) {
        this.value = value
        this.next = null
        this.previous = null
    }

    getValue() {
        return this.value
    }

    getPrevious() {
        return this.previous
    }

    getNext() {
        return this.next
    }

    setPrevious(previous) {
        this.previous = previous
        return previous
    }

    setNext(next) {
        this.next = next
        return next
    }

    toString() {
        let prevStr = this.previous ? "<LinkedListNode: " + this.previous.value + ">" : "null"
        let nextStr = this.next ? "<LinkedListNode: " + this.next.value + ">" : "null"
        return `<LinkedListNode>
| Previous: ${prevStr}
| Value: ${this.value}
| Next: ${nextStr}`
    }
}

module.exports = LinkedList
