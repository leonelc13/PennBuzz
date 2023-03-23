import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";
import Login from './user_login';

describe("Login component", () => {
    test("renders correctly", () => {
      const tree = renderer.create(<Login />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  
    test("renders with username and password inputs", () => {
        render(<Login />);
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
      });
    
      test("renders with 'Sign In' button", () => {
        render(<Login />);
        expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
      });
    
      test("renders with 'Sign up' link", () => {
        render(<Login />);
        expect(screen.getByRole('link', { name: /Sign up/i })).toBeInTheDocument();
      });
    
      test("renders with 'PennBuzz' heading", () => {
        render(<Login />);
        expect(screen.getByRole('heading', { name: /Penn Buzz/i })).toBeInTheDocument();
      });
  });

describe('Login Functionality', () => {
  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sign up/i })).toBeInTheDocument();
  });

  test('displays error message for missing username', () => {
    render(<Login />);
    const passwordInput = screen.getByLabelText(/Password/i);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(signInButton);

    expect(screen.getByText(/Missing username/i)).toBeInTheDocument();
  });

  test('displays error message for missing password', () => {
    render(<Login />);
    const usernameInput = screen.getByLabelText(/Username/i);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.click(signInButton);

    expect(screen.getByText(/Missing password/i)).toBeInTheDocument();
  });

  test('displays error message for missing username and password', () => {
    render(<Login />);
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.click(signInButton);

    expect(screen.getByText(/Missing username and password/i)).toBeInTheDocument();
  });

  test('displays error message for incorrect username and password', () => {
    // TODO: write this test
  });

  test('redirects to homepage on successful login', () => {
    // TODO: write this test
  });
});
