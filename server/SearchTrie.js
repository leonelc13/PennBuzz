
const database = require('./model/db')
const TrieNode = function (key) {
    // Node character
    this.key = key;
    // Node Values
    this.values = [];
    // Reference to parent node
    this.parent = null;
    // Hashmap mapping to children
    this.children = {};
    // Constructs word
    this.getValues = function () {
        return this.values;
    };
}


const SearchTrie = function () {
    this.root = new TrieNode(null);

    this.insert = function (item) {
        let title = item.title;
        // Start a root node
        let node = this.root;
        // Traverse trie
        for (let i = 0; i < title.length; i++) {
            // Check if character node exists in children.
            if (!node.children[title[i]]) {
                // If it doesn't exist, create it.
                node.children[title[i]] = new TrieNode(title[i]);
                // Assign the parent to the child node.
                node.children[title[i]].parent = node;
            }

            // Move to next value
            node = node.children[title[i]];

            // If it's the last charcter, insert value
            if (i == title.length - 1) {
                return node.values.push(item);
            };
        }
    }


    this.query = function (prefix) {
        let node = this.root;
        let output = [];

        // for every character in the prefix
        for (let i = 0; i < prefix.length; i++) {
            // make sure prefix actually has words
            if (node.children[prefix[i]]) {
                node = node.children[prefix[i]];
            } else {
                // there's none. just return it.
                return output;
            }
        }

        // recursively find all items matching prefix in the node
        recursiveSearch(node, output);
        return output;
    };

    // recursive function to find all items in the given node.
    const recursiveSearch = (node, arr) => {
        // Add nodes values to output
        if (node.values.length > 0) {
            node.getValues().forEach(item => arr.push(item));

        }
        // Iterate through Trie
        for (let child in node.children) {
            recursiveSearch(node.children[child], arr);
        }
    }
    this.populate = async () => {
        console.log("Populating Search Trie");
        let db = await database.getDb();

        const quizzes = await db.collection('Quiz').find({}).toArray();

        quizzes.forEach(quiz => {
            if (!quiz.title)
                return;
            let item = { title: quiz.title, type: "quiz", id: quiz.id };
            searchTrie.insert(item);
        });

        console.log("Added " + quizzes.length + " quizzes to the Search Trie");

        const users = await db.collection('User').find({}).toArray();

        users.forEach(user => {
            if (user.username)
                searchTrie.insert({ title: user.username, type: "user" });
        });

        console.log("Added " + users.length + " users to the Search Trie");

    }
};

let searchTrie = new SearchTrie();


module.exports = searchTrie;


