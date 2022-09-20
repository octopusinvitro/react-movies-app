import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'

import MovieList from '../../components/MovieList';
import AddFavourites from '../../components/AddFavourites';

import responses from '../../__fixtures__/responses';

describe('MovieList', () => {
  const movies = responses.success.Search;
  let list, overlayAction;

  beforeEach(() => {
    overlayAction = jest.fn();
    list = render(<MovieList
      movies={movies}
      favouriteOnClick={overlayAction}
      favouriteComponent={AddFavourites}
      />);
  });

  afterEach(() => {
    jest.restoreAllMocks()
  });

  it('shows all movies', () => {
    const movies = list.getAllByRole('listitem');
    expect(movies.length).toBe(3);
  });

  it('shows movie poster with URL as src', () => {
    const images = list.getAllByRole('img');
    expect(images[0].src).toContain('https://m.media-amazon.com/images/M/');
  });

  it('shows movie poster with movie title as alt text', () => {
    const images = list.getAllByRole('img');
    expect(images[1].alt).toContain(movies[1].Title)
  });

  it('shows movie caption with title, year and type', () => {
    const figcaption = list.getByText(new RegExp(movies[0].Title, 'i'));
    const text = `${movies[0].Title} ${movies[0].Year}${movies[0].Type}`;
    expect(figcaption).toHaveTextContent(text)
  });

  it('adds the specified overlay component to all', () => {
    const overlays = list.getAllByText('Add to Favourites');
    expect(overlays.length).toBe(3);
  });

  it('runs the overlay action when clicking overlay component', () => {
    const overlay = list.getAllByText('Add to Favourites')[0];
    fireEvent.click(overlay);
    expect(overlayAction).toHaveBeenCalledTimes(1);
  });

  it('runs the right function with the movie', () => {
    const overlay = list.getAllByText('Add to Favourites')[0];
    fireEvent.click(overlay);
    expect(overlayAction).toHaveBeenCalledWith(movies[0]);
  });
});
