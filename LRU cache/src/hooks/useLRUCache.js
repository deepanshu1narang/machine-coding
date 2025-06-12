import { useRef } from "react";

class Node {
    constructor(key, value, next) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = {};
        // Linked list
        this.head = null;
        this.tail = null;
    }

    get(key) {
        if (this.cache[key]) {
            this.moveToFront(key);
            return this.cache[key].value;
        }

        return null;
    }

    put(key, value) {
        if (this.cache[key]) {
            this.cache[key].value = value;
            this.moveToFront(key);
            // move it to front of LL
        }
        else {
            if (Object.keys(this.cache).length === this.capacity) {
                // remove the tail and store new item in the head
                this.removeLast()
            }
            this.addToFront(key, value);
        }
    }

    addToFront(key, value) {
        const newNode = new Node(key, value, null);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = this.head;
            this.head = newNode;
        }

        this.cache[key] = newNode;
    }

    removeLast() {
        if (!this.head) return;

        const lastKey = this.tail.key;
        delete this.cache[lastKey];

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        }
        else {
            let current = this.head;

            while (current.next !== this.tail) {
                current = current.next;
            }

            current.next = null;
            this.tail = current;
        }
    }

    moveToFront(key) {
        const current = this.cache[key];

        if (current === this.head) return;

        let prevNode = null;
        let node = this.head;

        while (node && node.key !== key) {
            prevNode = node;
            node = node.next;
        }

        if (!node) return;
        if (node === this.tail) {
            this.tail = prevNode;
        }

        if (prevNode) {
            prevNode.next = node.next;
        }

        node.next = this.head;
        this.head = node;
    }
}

const useLRUCache = (capacity) => {
    const cacheRef = useRef(new LRUCache(capacity));
    console.log(cacheRef.current);

    return {
        get: (key) => cacheRef.current.get(key),
        put: (key, value) => cacheRef.current.put(key, value)
    }
}

export default useLRUCache;