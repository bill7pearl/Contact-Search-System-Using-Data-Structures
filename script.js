class Contact {

    constructor(name, phone) {

        this.name = name;

        this.phone = phone;

        this.prev = null;

        this.next = null;

    }



    toString() {

        return `${this.name} - ${this.phone}`;

    }

}



class ContactManager {

    constructor() {

        this.head = null;

        this.tail = null;

        // Hash Table for O(1) exact name lookup

        this.contactsMap = new Map();

    }



    /**

     * Complexity: O(1)

     * Adds to both Map and DLL.

     */

    addContact(name, phone) {

        const newContact = new Contact(name, phone);



        // 1. Store in Hash Table

        this.contactsMap.set(name, newContact);



        // 2. Add to Doubly Linked List

        if (!this.head) {

            this.head = this.tail = newContact;

        } else {

            this.tail.next = newContact;

            newContact.prev = this.tail;

            this.tail = newContact;

        }

        console.log(`Contact '${name}' added.`);

    }



    /**

     * Complexity: O(1) Average

     * Instant lookup using the Map.

     */

    searchExactName(name) {

        return this.contactsMap.get(name) || "Not found";

    }



    /**

     * Complexity: O(n * m)

     * Performs a Naive string match on every contact.

     */

    searchByKeyword(keyword) {

        const results = [];

        let current = this.head;

        const kw = keyword.toLowerCase();



        while (current) {

            if (this._naiveMatch(current.name.toLowerCase(), kw)) {

                results.push(current.toString());

            }

            current = current.next;

        }

        return results;

    }



    _naiveMatch(text, pattern) {

        const n = text.length;

        const m = pattern.length;



        for (let i = 0; i <= n - m; i++) {

            let j;

            for (j = 0; j < m; j++) {

                if (text[i + j] !== pattern[j]) break;

            }

            if (j === m) return true;

        }

        return false;

    }



    /**

     * Complexity: O(n)

     * Demonstrates bidirectional traversal.

     */

    displayAll(forward = true) {

        let current = forward ? this.head : this.tail;

        if (!current) {

            console.log("The list is empty.");

            return;

        }



        console.log(`\n--- Contacts (${forward ? 'Forward' : 'Backward'}) ---`);

        while (current) {

            console.log(current.toString());

            current = forward ? current.next : current.prev;

        }

    }

}



// --- Execution Example ---

const manager = new ContactManager();



manager.addContact("Alice", "1234567890");

manager.addContact("Bob", "0987654321");

manager.addContact("Alex", "1122334455");



// 1. Exact Search (Hash Table)

console.log("\nExact Search (Alice):", manager.searchExactName("Alice").toString());



// 2. Keyword Search (String Matching)

console.log("\nKeyword Search 'Al':", manager.searchByKeyword("Al"));



// 3. Forward Display (DLL)

manager.displayAll(true);



// 4. Backward Display (DLL)

manager.displayAll(false);
