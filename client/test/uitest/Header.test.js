/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../../src/components/Header/Header';

import "@testing-library/jest-dom";
import axios from 'axios';
jest.mock('axios');

let props = {
    user_profile_picture: "https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download",
    user: "johndoe"
};


let mock_search_results = {
    "data": [{
        "query": "jo",
        "results": [
            {
                "id": "jon",
                "title": "jon",
                "type": "user",
                "img": ""
            },
            {
                "id": "johnwick",
                "title": "johnwick",
                "type": "user",
                "img": ""
            },
            {
                "id": "jonjones",
                "title": "jonjones",
                "type": "user",
                "img": ""
            }
        ]
    }]
};

describe("Header UI Tests", () => {
    test("Renders main container", () => {
        render(
            <Router>
                <Header {...props} />
            </Router>
        );
        const title = screen.getByText('Penn');
        expect(title).toBeInTheDocument();
    });

    test("Renders search results", async () => {
        axios.get.mockResolvedValue(mock_search_results);
        const { getByPlaceholderText, getByText } = render(
            <Router>
                <Header {...props} />
            </Router>
        );

        const searchInput = getByPlaceholderText("Search for Friends, Quizzes, and more");
        expect(searchInput).toBeInTheDocument();

        fireEvent.change(searchInput, { target: { value: 'jo' } });

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/search?query=jo');
            const result = getByText("jon");
            expect(result).toBeInTheDocument();
        });
    });
});

