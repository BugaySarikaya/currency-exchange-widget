const LRUCache = function (options) {
  this.capacity = options.capacity;
  this.timeout = options.timeout;
  this.map = new Map(); // this stores the entire array

  // boundaries for double linked list
  this.head = {};
  this.tail = {};

  // initialize double linked list
  this.head.next = this.tail;
  this.tail.prev = this.head;
};

LRUCache.prototype.get = function (key) {
  if (this.map.has(key)) {
    // remove key from current position
    let c = this.map.get(key);
    c.prev.next = c.next;
    c.next.prev = c.prev;

    this.tail.prev.next = c; // insert it after last element. Element before tail
    c.prev = this.tail.prev; // update c.prev and next pointer
    c.next = this.tail;
    this.tail.prev = c; // update last element as tail

    return c.value;
  } else {
    return null; // element does not exist
  }
};

LRUCache.prototype.set = function (key, value) {
  if (this.get(key) !== null) {
    this.tail.prev.value = value;
  } else {
    // check map size capacity
    if (this.map.size === this.capacity) {
      this.map.delete(this.head.next.key); // delete first element of list
      this.head.next = this.head.next.next; // update first element as next element
      this.head.next.prev = this.head;
    }

    let newNode = {
      value,
      key,
    };

    this.map.set(key, newNode); // add new key,value
    this.tail.prev.next = newNode; // add to end of the list

    newNode.prev = this.tail.prev; // update prev and next pointers of new value
    newNode.next = this.tail;

    this.tail.prev = newNode; // update last element
  }

  setTimeout(() => {
    this.map.delete(key);
  }, this.timeout);
};

module.exports = LRUCache;
