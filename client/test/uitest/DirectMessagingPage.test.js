/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import DirectMessagingPage from "../../src/components/DirectMessaging/DirectMessagingPage";

import axios from 'axios';
jest.mock('axios');

let props = {
    user_profile_picture: "https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download",
    user: "johndoe"
};

const mockChannelsData = {
    "data": {

        "johnwick": {
            "name": "John Wick",
            "timestamp": "8:54pm 12/12/2023",
            "img": "https://drive.google.com/uc?export=view&id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe"
        },
        "jonjones": {
            "name": "Jon Jones",
            "timestamp": "8:54pm 12/12/2023",
            "img": "https://drive.google.com/uc?export=view&id=1bL48Yx608hc6QK41dVx-7O95XwMPOc25"
        }
    }
}

const mockMessagesData = {
    data: [{
        "channel_id": "johnwick",
        "messages": [
            {
                "sender": "johnwick",
                "timestamp": "8:24pm 12/12/2023",
                "text": "Hey John! How are you!"
            },
            {
                "sender": "johndoe",
                "timestamp": "8:29pm 12/12/2023",
                "text": "Great!"
            }
        ]
    }]
}

describe("Direct Messages", () => {

    test("Renders Landing Page", () => {
        axios.get.mockResolvedValue(mockMessagesData);
        const { getByText } = render(<Router><DirectMessagingPage {...props} /></Router>);
        const defaultContainer = getByText("Create a new chat or select an existing one to chat with your friends!");
        expect(defaultContainer).toBeInTheDocument();
    });

    test("Renders chats", async () => {
        const channelsGetURL = 'http://localhost:3000/channels';
        const messagesGetURL = 'http://localhost:3000/messages?channel_id=johnwick';

        axios.get.mockImplementation((url) => {
            console.log(url);
            switch (url) {
                case channelsGetURL:
                    return Promise.resolve(mockChannelsData);
                case messagesGetURL:
                    return Promise.resolve(mockMessagesData);
                default:
                    throw new Error(`Unexpected URL: ${url}`);
            }
        });

        const { getByText } = render(<DirectMessagingPage {...props} />);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(channelsGetURL, { "params": { "user": "johndoe" } });
            const channel = getByText("John Wick");
            expect(channel).toBeInTheDocument();
            fireEvent.click(channel);
        });

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(messagesGetURL);
            const sampleMessage = getByText("Great!");
            expect(sampleMessage).toBeInTheDocument();
        });

    });


});