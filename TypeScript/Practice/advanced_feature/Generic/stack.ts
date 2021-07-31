class Stack<D> {
  private items: D[] = [];
  push(item: D) {
    this.items.push(item);
  }
  pop() {
    this.items.pop();
  }
}

const numberStack = new Stack<number>();
numberStack.push(10);
const vStack = numberStack.pop();
const stringStack = new Stack<string>();
stringStack.push('a');
const vStringStack = stringStack.pop();

let myStack: Stack<number>;
myStack = numberStack;
// myStack = stringStack; // type error
