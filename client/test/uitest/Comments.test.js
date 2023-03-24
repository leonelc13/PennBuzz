/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentList from '../../src/components/Comments/CommentList';

describe('CommentList component tests', () => {
    const comments = [
        { author: 'John Doe', commentContent: 'This is a great post' },
        { author: 'Jane Doe', commentContent: 'Thanks for sharing!' },
    ];

    test('renders correctly', () => {
        const { container } = render(<CommentList comments={comments} />);
        expect(container.firstChild).toMatchSnapshot();
    });

    
    test('adds a new comment when "Add Comment" button is clicked', () => {
        const { getByPlaceholderText, getByText } = render(
            <CommentList comments={comments} />
        );
        const newComment = 'This is a new comment';
        const textarea = getByPlaceholderText('Add a comment...');
        fireEvent.change(textarea, { target: { value: newComment } });
        const button = getByText('Add Comment');
        fireEvent.click(button);
        expect(textarea.value).toBe('');
        expect(getByText('You: ' + newComment)).toBeInTheDocument();
    });
});
