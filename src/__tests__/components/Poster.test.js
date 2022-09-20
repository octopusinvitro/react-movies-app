import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'

import Poster from '../../components/Poster';

describe('Poster', () => {
  let poster;

  describe('when movie has poster', () => {
    const movie = {
      Title: 'Guardians of the Galaxy',
      Poster: 'https://m.media-amazon.com/images/M/MV5BNDM4NDQxMDU2MV5BMl5BanBnXkFtZTgwMDY2MDQ5NjE@._V1_SX300.jpg'
    }

    beforeEach(() => {
      poster = render(<Poster poster={ movie.Poster } title={ movie.Title } />);
    });

    it('displays image with poster URL as src', () => {
      const image = poster.getByRole('img');
      expect(image.src).toContain(movie.Poster);
    });

    it('uses the title as alt text', () => {
      const image = poster.getByRole('img');
      expect(image.alt).toContain(movie.Title);
    });
  });

  describe('when movie has no poster', () => {
    const movie = { Title: 'Guardians of the Galaxy', Poster: 'N/A' }

    beforeEach(() => {
      poster = render(<Poster poster={ movie.Poster } title={ movie.Title } />);
    });

    it('displays div with poster title as contents', () => {
      const div = poster.getByText(movie.Title);
      expect(div).toBeInTheDocument();
    });
  });
});
