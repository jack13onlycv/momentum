// let list = {
//   value: 3,
//   next: {
//     value: 1,
//     next: {
//       value: 2,
//       next: {
//         value: 3,
//         next: {
//           value: 4,
//           next: {
//             value: 5,
//             next: null
//           }
//         }
//       }
//     }
//   }
// };

class ListNode {
  constructor(x) {
    this.value = x;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.list = null
    this.head = null;
    this.length = 0;
  }

  getUnderlyingList() {
    return this.list
  }

  enqueue(value) {
    this.list = new ListNode(value)

    if (this.length === 0) {
      this.head = this.list
    } else {
      let current = this.head

      while(current.next) {
        current = current.head
      }

      current.next = new ListNode(value)
    }
    this.length++;
  }

  dequeue() {
    let output = this.list.value
    this.list = this.list.next
    return output
  }

}

const queue = new Queue();
queue.enqueue(5)
queue.enqueue(6)
queue.enqueue(7)
queue.dequeue()
queue.dequeue()