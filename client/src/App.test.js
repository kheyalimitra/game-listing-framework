import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';


test('renders react DOM', () => {
  render(<App />);
  const catElement = screen.getByLabelText(/Category/i);
  const desElement = screen.getByLabelText(/Description/i);
  const authElement = screen.getByLabelText(/Author/i);
  expect(catElement).toBeInTheDocument();
  expect(desElement).toBeInTheDocument();
  expect(authElement).toBeInTheDocument();
});
