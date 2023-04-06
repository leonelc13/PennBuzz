/**
 * @jest-environment jsdom
 */
import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from 'axios';
import MainFeed from "../../src/components/MainFeed/MainFeed";
jest.mock('axios');


let props = {
    user_profile_picture: "https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download",
    user: "johndoe"
};

let mockedData = {
    data: [{
        "title": "Which Penn Professor are you?",
        "author_name": "johnwick",
        "author_img": "https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download",
        "description": "Complete this quiz and find out your soulmate professor at Penn!",
        "upvotes": 87,
        "downvotes": 12,
        "num_comments": 7,
        "labels": [
            "Penn",
            "Professors"
        ],
        "timestamp": "12/12/2023",
        "thumbnail_img": "https://drive.google.com/uc?id=1Guf_k6yMjbbhvPU8A77tNhj9-plnW726",
        "key": "Which Penn Professor are you?-12/12/2023-johnwick-1",
        "is_upvoted": true,
    }]
}

describe("Main Feed UI Tests", () => {

    test("Renders Quiz", async () => {
        axios.get.mockResolvedValue(mockedData);
        const { getByText } = render(
            <Router>
                <MainFeed {...props} />
            </Router>);
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/quizzes', { "params": { "user": "johndoe" } });
            const comments = getByText("See all 7 comments");
            expect(comments).toBeInTheDocument();
            const createQuizButton = getByText("Create Quiz");
            expect(createQuizButton).toBeInTheDocument();
        });
        // Select upvote
        const upvote = getByText("87");
        expect(upvote).toBeInTheDocument();
        fireEvent.click(upvote);

        await waitFor(() => {
            const upvotedButton = getByText("86");
            expect(upvotedButton).toBeInTheDocument();
        });
    });
});