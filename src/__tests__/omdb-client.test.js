import OMDBClient from '../omdb-client';
import mockFetch from '../__mocks__/mockFetch';
import responses from '../__fixtures__/responses';

describe('OMDBClient', () => {
  let client;

  beforeEach(() => {
    client = new OMDBClient('1234');
  });

  afterEach(() => {
    fetch.mockClear();
    jest.restoreAllMocks()
  });

  describe('#get', () => {
    const emptyResult = { error: null, movies: [] };

    describe('on success', () => {
      const movies = responses.success.Search;
      const successResult = { error: null, movies: movies };

      beforeEach(async () => { mockFetch(responses.success); });

      it('uses the search value', async () => {
        const fullURL = 'http://www.omdbapi.com/?apikey=1234&s=kittens';
        await client.get('kittens');
        expect(fetch).toHaveBeenCalledWith(fullURL);
      });

      it('returns search results', async () => {
        expect(await client.get('puppies')).toEqual(successResult);
      });

      it('returns nothing if no results', async () => {
        mockFetch(responses.empty)
        expect(await client.get('puppies')).toEqual(emptyResult);
      });
    });

    describe('on failure', () => {
      let response;

      describe('if no API key', () => {
        beforeEach(async () => {
          mockFetch('irrelevant');
          response = await (new OMDBClient(null)).get('pandas');
        });

        it('avoids request', async () => {
          expect(fetch).toHaveBeenCalledTimes(0);
        });

        it('returns null result', async () => {
          expect(response).toEqual(emptyResult);
        });
      });

      describe('if no search value', () => {
        beforeEach(async () => {
          mockFetch('irrelevant');
          response = await client.get('');
        });

        it('avoids request', async () => {
          expect(fetch).toHaveBeenCalledTimes(0);
        });

        it('returns null result', async () => {
          expect(response).toEqual(emptyResult);
        });
      });

      describe('if invalid API key', () => {
        const invalidResult = { error: 'Invalid API key!', movies: [] };

        it('returns error', async () => {
          mockFetch(responses.invalid, 401);
          expect(await client.get('kittens')).toEqual(invalidResult);
        });
      });

      // Simulate an exception:
      // fetch.mockImplementationOnce(() => Promise.reject(response));
    });
  });
});
