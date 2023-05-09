const searchTrie = require('../SearchTrie');

const searchQuery = async (req, res) => {
    const { query } = req.query;
    const search_results = searchTrie.query(query);
    return res.status(201).send(search_results);

}

// Routes Tree
const SearchRoutes = {
    search: searchQuery
}

module.exports = SearchRoutes;