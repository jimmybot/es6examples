# es6examples
ES6 Examples: Short examples explaining JS ES6 features

Runs on Node.js >v4.0.0, which added support for many new ES6 features without need for Babel or similar.
You'll need `"use strict";` if you want to use `let` or `class`.

For understanding generators, including how it can be used to avoid callback-hell via green-threads, check out:
- [generators_for_efficient_iteration.js](generators_for_efficient_iteration.js)
- [generators_for_thread_control.js](generators_for_thread_control.js)
generators_for_thread_control.js also has an example of ES6 Promises

For understanding ES6 classes and decorators (technically ES7, but goes well with classes), check out:
- [UnitTest](UnitTest.js) and [UnitTestTest](UnitTestTest.js), which inherits from UnitTest
- [LinkedList](LinkedList.js) and [LinkedListTest](LinkedListTest.js), which also inherits from UnitTest

The test files are executable, ie `node UnitTestTest.js` or `node LinkedListTest.js`

LinkedList also shows a good case for creating your own iterator, which also makes use of a built-in `Symbol`, `Symbol.iterator`.
