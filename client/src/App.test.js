import { render, screen } from '@testing-library/react';
import App from './App';

test('renders game tile form', () => {
  render(<App />);
  const catElement = screen.getByLabelText(/Category/i);
  const desElement = screen.getByLabelText(/Description/i);
  const authElement = screen.getByLabelText(/Author/i);
  expect(catElement).toBeInTheDocument();
  expect(desElement).toBeInTheDocument();
  expect(authElement).toBeInTheDocument();
});
