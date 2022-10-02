import { render, screen } from '@testing-library/react';

import SigninPage from '.';

describe('signin page test', () => {
  beforeEach(() => document.body.innerHTML = '');

  it('should display signin options', () => {
    render(<SigninPage />);

    expect(screen.getByText(/Sign in with/i)).toBeInTheDocument();
    expect(screen.getByTestId('button-facebook')).toBeInTheDocument();
    expect(screen.getByTestId('button-twitter')).toBeInTheDocument();
    expect(screen.getByTestId('button-tiktok')).toBeInTheDocument();
  })
});
