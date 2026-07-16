import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio-style weather dashboard', () => {
  render(<App />);
  expect(screen.getByText(/weather intelligence dashboard/i)).toBeInTheDocument();
});
