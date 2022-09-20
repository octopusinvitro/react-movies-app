import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'

import App from '../App';

jest.mock('../omdb-client');
import OMDBClient from '../omdb-client';

jest.mock('../favourites-database');
import FavouritesDatabase from '../favourites-database';

import responses from '../__fixtures__/responses';
import OMDBResult from '../omdb-result';

describe('App', () => {
  const movies = responses.success.Search;
  const result = new OMDBResult();
  let get, load, add, remove;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('when valid API key and search value', () => {
    beforeEach(async () => {
      firstRender('validAPIkey');

      mockClient(result.success(responses.success));
      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'new search query');
    });

    // afterEach(cleanup);

    it('triggers request', async () => {
      await waitFor(() => {
        expect(get).toHaveBeenCalledTimes(1);
      });
    });

    it('attempts to load favourites from database', () => {
      expect(load).toHaveBeenCalledTimes(1);
    });

    it('renders headings', () => {
      expect(screen.getAllByRole('heading').length).toBe(2);
    });

    it('renders searchbox', () => {
      expect(screen.getAllByRole('textbox').length).toBe(1);
    });

    it('does not render search prompt', async () => {
      await waitFor(() => {
        expect(screen.queryByText(/Use the search box/)).toBe(null);
      });
    });

    it('renders movies', async () => {
      await waitFor(() => {
        expect(screen.getAllByText(/Add to Favourites/).length).toBe(3);
      });
    });

    it('does not render favourites if none in database', () => {
      expect(screen.queryByText(/Remove from favourites/)).toBe(null);
    });

    it('renders favourites if any', () => {
      mockDatabase(movies);
      render(<App apiKey="validAPIkey" delay="0" />);
      expect(screen.queryAllByText(/Remove from favourites/).length).toBe(3);
    });

    xit('does not overwrite displayed movies if request errors', async () => {
      mockClient(result.error(responses.invalid));
      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'erroring search');

      await waitFor(() => {
        expect(screen.getAllByText(/Add to Favourites/).length).toBe(3);
      });
    });

    it('overwrites displayed movies if no search results', async () => {
      mockClient(result.empty());
      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'no results search');

      await waitFor(() => {
        expect(screen.queryByText(/Add to Favourites/)).toBe(null);
      });
    });

    xdescribe('when adding to favourites', () => {
      beforeEach(async () => {
        mockDatabase(movies[1]);
      });

      it('adds movie to database', async () => {
        await waitFor(() => {
          const clickables = screen.getAllByText(/Add to Favourites/);
          userEvent.click(clickables[1]);
          expect(add).toHaveBeenCalledWith(movies[1]);
        });
      });

      it('renders favourites', async () => {
        await waitFor(() => {
          const clickables = screen.getAllByText(/Add to Favourites/);
          userEvent.click(clickables[1]);
          expect(screen.getAllByText(/Remove from favourites/).length).toBe(1);
        });
      });
    });

    xdescribe('when removing from favourites', () => {
      beforeEach(async () => {
        mockDatabase([]);
      });

      it('removes movie from database', async () => {
        await waitFor(() => {
          const clickables = screen.getAllByText(/Remove from favourites/);
          userEvent.click(clickables[0]);
          expect(remove).toHaveBeenCalledWith(movies[0]);
        });
      });

      it('renders favourites', async () => {
        await waitFor(() => {
          const clickables = screen.getAllByText(/Add to Favourites/);
          userEvent.click(clickables[0]);
          expect(screen.gqueryByText(/Remove from favourites/)).toBe(null);
        });
      });
    });
  });

  describe('when invalid API key and search value', () => {
    beforeEach(async () => {
      firstRender('invalidAPIkey');

      mockClient(result.error(responses.invalid));
      const input = screen.getByRole('textbox');
      await userEvent.type(input, 'new search query');
    });

    // afterEach(cleanup);

    it('triggers request', async () => {
      await waitFor(() => { expect(get).toHaveBeenCalledTimes(1); });
    });

    it('attempts to load favourites from database', () => {
      expect(load).toHaveBeenCalledTimes(1);
    });

    it('renders headings', () => {
      expect(screen.getAllByRole('heading').length).toBe(2);
    });

    it('renders searchbox', () => {
      expect(screen.getAllByRole('textbox').length).toBe(1);
    });

    xit('renders error prompt', () => {
      expect(screen.getByText(/API key is invalid/)).toBeInTheDocument();
    });

    it('does not render movies', () => {
      expect(screen.queryByText(/Add to Favourites/)).toBe(null);
    });

    it('does not render favourites if none in database', () => {
      expect(screen.queryByText(/Remove from favourites/)).toBe(null);
    });

    it('renders favourites if any', () => {
      mockDatabase(movies);
      render(<App apiKey="invalid" />);
      expect(screen.queryAllByText(/Remove from favourites/).length).toBe(3);
    });
  });

  describe('when API key but no search value', () => {
    beforeEach(() => {
      firstRender('APIkey');
    });

    it('does not trigger request', () => {
      expect(get).toHaveBeenCalledTimes(0);
    });

    it('attempts to load favourites from database', () => {
      expect(load).toHaveBeenCalledTimes(1);
    });

    it('renders headings', () => {
      expect(screen.getAllByRole('heading').length).toBe(2);
    });

    it('renders searchbox', () => {
      expect(screen.getAllByRole('textbox').length).toBe(1);
    });

    it('renders search prompt', () => {
      expect(screen.getByText(/Use the search box/)).toBeInTheDocument();
    });

    it('does not render movies', () => {
      expect(screen.queryByText(/Add to Favourites/)).toBe(null);
    });

    it('does not render favourites if none in database', () => {
      expect(screen.queryByText(/Remove from favourites/)).toBe(null);
    });

    it('renders favourites if any', () => {
      mockDatabase(movies);
      render(<App apiKey="1234" />);
      expect(screen.queryAllByText(/Remove from favourites/).length).toBe(3);
    });
  });

  describe('when no API key', () => {
    beforeEach(() => {
      firstRender(null);
    });

    it('does not trigger request', () => {
      expect(get).toHaveBeenCalledTimes(0);
    });

    it('informs user', () => {
      expect(screen.getByText(/You forgot your API key/i)).toBeInTheDocument();
    });
  });

  const firstRender = (apiKey) => {
    mockClient('irrelevant');
    mockDatabase([]);
    render(<App apiKey={apiKey} delay="0" />);
  }

  const mockClient = (result) => {
    get = jest.fn().mockReturnValueOnce(result);
    OMDBClient.mockImplementation(() => { return { get: get }; });
  }

  const mockDatabase = (contents) => {
    load = jest.fn().mockReturnValueOnce(contents);
    add = jest.fn().mockReturnValueOnce(contents);
    remove = jest.fn().mockReturnValueOnce(contents);

    FavouritesDatabase.mockImplementation(() => {
      return { load: load, add: add, remove: remove };
    });
  }
});
