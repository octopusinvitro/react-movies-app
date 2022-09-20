import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import MovieListHeading from '../../components/MovieListHeading';

describe('MovieListHeading', () => {
  it('displays a heading', () => {
    const heading = render(<MovieListHeading heading="A Heading" />);
    expect(heading.getByText('A Heading')).toBeInTheDocument()
  });
});
