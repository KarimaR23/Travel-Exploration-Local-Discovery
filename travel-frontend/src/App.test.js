import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders app title', () => {
  render(<App />);
  expect(screen.getByText(/Hidden Gems/i)).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<App />);
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Data Display/i)).toBeInTheDocument();
  expect(screen.getByText(/Form Page/i)).toBeInTheDocument();
});

test('renders homepage text', () => {
  render(<App />);
  expect(
      screen.getByText(/Travel Exploration Local/i)
  ).toBeInTheDocument();
});
