import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders waiting to connect', () => {
  render(<App />);
  const linkElement = screen.getByText(/Waiting to connect to the Front context/i);
  expect(linkElement).toBeInTheDocument();
});
