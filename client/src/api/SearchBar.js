import axios from 'axios';


export async function getSearchResults(query) {
    try {
        let response = await axios.get(`http://localhost:3000/search?query=${query}`);
        return response.data[0].results;
    } catch (error) {
        return error;
    }

}