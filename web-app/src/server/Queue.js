export default class Queue {
    constructor() {
        this._arr = [];
    }
    enqueue(item) {
        this._arr.push(item);
    }
    dequeue() {
        return this._arr.shift();
    }
    peek() {
        return this._arr[0] == undefined ? null : this._arr[0];
    }
}