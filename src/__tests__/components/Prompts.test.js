import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import { APIKeyPrompt, SearchPrompt, ErrorPrompt } from '../../components/Prompts';

describe('APIKeyPrompt', () => {
  it('renders OMDB URL', () => {
    const prompt = render(<APIKeyPrompt />);
    expect(prompt.getByRole('link').href).toEqual('http://www.omdbapi.com/apikey.aspx');
  });
});

describe('SearchPrompt', () => {
  it('API prompt renders url', () => {
    render(<SearchPrompt />);
    expect(screen.getByText(/search for movies/i)).toBeInTheDocument()
  });
});

describe('ErrorPrompt', () => {
  it('renders OMDB URL', () => {
    const prompt = render(<ErrorPrompt />);
    expect(prompt.getByRole('link').href).toEqual('http://www.omdbapi.com/apikey.aspx');
  });
});
