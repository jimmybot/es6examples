"use strict";

// This iterator returns LinkedListNodes
// Usage: for (node of myLinkedList.getNodes()) { // do something }
function nodeIterator(self) {
    return function* () {
        let next = linkedLists.get(self).first
        while (next) {
            yield next
            next = next.getNext()
        }
    }
}

// Using WeakMap to implement private variables
// See the excellent blog post about this technique here: http://fitzgeraldnick.com/weblog/53/
let linkedLists = new WeakMap()

class LinkedList {
    constructor() {
        // first and last will be private variables
        linkedLists.set(this, {
            first: null,
            last: null
        })
    }

    // This iterator returns the value in each node
    // Usage: for (node of myLinkedList) { // do something }
    *[Symbol.iterator]() {
        let next = linkedLists.get(this).first
        while (next) {
            yield next.value
            next = next.getNext()
        }
    }

    getNodes() {
        return {
            [Symbol.iterator]: nodeIterator(this)
        }
    }

    getFirst() {
        let first = linkedLists.get(this).first
        return first ? first.value : null
    }

    getLast() {
        let last = linkedLists.get(this).last
        return last ? last.value : null
    }

    push(value) {
        let pv = linkedLists.get(this)
        if (pv.last) {
            let n = new LinkedListNode(value)
            n.setPrevious(pv.last)
            pv.last.setNext(n)
            pv.last = n
        } else {
            pv.first = pv.last = new LinkedListNode(value)
        }
        return pv.last
    }

    pop() {
        let ret,
            prev,
            pv = linkedLists.get(this)

        if (pv.last) {
            ret = pv.last.getValue()
            if (pv.first === pv.last) {
                pv.first = null
                pv.last = null
            } else {
                prev = pv.last.getPrevious()
                prev.setNext(null)
                pv.last = prev
            }
        } else {
            ret = null
        }

        return ret
    }

    unshift(value) {
        let lln = new LinkedListNode(value),
            pv = linkedLists.get(this)

        if (pv.first) {
            lln.setNext(pv.first)
            pv.first = pv.first.setPrevious(lln)
        } else {
            pv.first = lln
            pv.last = lln
        }
    }

    shift() {
        let ret,
            pv = linkedLists.get(this)

        if (pv.first) {
            ret = pv.first.getValue()
            pv.first = pv.first.getNext()
            if (pv.first) {
                pv.first.setPrevious(null)
            }
        } else {
            ret = null
        }

        return ret
    }

    render() {
        // Iterate over the nodes of the LinkedList and print the prev / value / next
        // Custom iteration of the object is accomplished by defining the Symbol.iterator method above
        for (let n of this.getNodes()) {
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

module.exports = {
    LinkedList: LinkedList,
    LinkedListNode: LinkedListNode
}
