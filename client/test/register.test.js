import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import Register from "../src/components/RegisterPage/register";

describe("Register component", () => {
  test("renders correctly", () => {
    const tree = renderer.create(<Register />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders with username and password inputs", () => {
    render(<Register />);
    expect(screen.getByLabelText(/Pick a Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Pick a Password/i)).toBeInTheDocument();
  });

  test("renders with 'Sign Up' button", () => {
    render(<Register />);
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test("renders with 'sign in' link", () => {
    render(<Register />);
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument();
  });

  test("renders with 'PennBuzz' heading", () => {
    render(<Register />);
    expect(screen.getByRole('heading', { name: /Penn Buzz/i })).toBeInTheDocument();
  });

  describe('Registration Functionality', () => {
    test('displays error message for missing username', () => {
      render(<Register />);
      const passwordInput = screen.getByLabelText(/Pick a Password/i);
      const signUpButton = screen.getByRole('button', { name: /Sign Up/i });

      fireEvent.change(passwordInput, { target: { value: 'password' } });
      fireEvent.click(signUpButton);

      expect(screen.getByText(/Please enter a username/i)).toBeInTheDocument();
    });

    test('displays error message for missing password', () => {
      render(<Register />);
      const usernameInput = screen.getByLabelText(/Pick a Username/i);
      const signUpButton = screen.getByRole('button', { name: /Sign Up/i });

      fireEvent.change(usernameInput, { target: { value: 'username' } });
      fireEvent.click(signUpButton);

      expect(screen.getByText(/Please enter a password/i)).toBeInTheDocument();
    });

    test('displays error message for missing username and password', () => {
      render(<Register />);
      const signUpButton = screen.getByRole('button', { name: /Sign Up/i });

      fireEvent.click(signUpButton);

      expect(screen.getByText(/Please enter both a username and password/i)).toBeInTheDocument();
    });

    test('successfully submits registration form', () => {
      render(<Register />);
      const usernameInput = screen.getByLabelText(/Pick a Username/i);
      const passwordInput = screen.getByLabelText(/Pick a Password/i);
      const signUpButton = screen.getByRole('button', { name: /Sign Up/i });

      fireEvent.change(usernameInput, { target: { value: 'newuser' } });
      fireEvent.change(passwordInput, { target: { value: 'newpassword' } });
      fireEvent.click(signUpButton);

      // Assert that form submission was successful (e.g. redirect to homepage)
      // ...
    });

    test('redirects to login page on click of "sign in" link', () => {
      render(<Register />);
      const signInLink = screen.getByRole('link', { name: /sign in/i });

      fireEvent.click(signInLink);

      // Assert that the browser location is updated to "/login"
      // ...
    });
  });
});
