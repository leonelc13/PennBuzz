/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../../src/components/Header/Header';

let props = {
    user_profile_picture: "https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download",
    user: "johndoe"
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
});