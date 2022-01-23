import { render, screen } from '@testing-library/react';
import App from './App';

test('renders game tile form', () => {
  render(<App />);
  const labelElement = screen.getByLabelText(/Category/i);
  expect(labelElement).toBeInTheDocument();
});
