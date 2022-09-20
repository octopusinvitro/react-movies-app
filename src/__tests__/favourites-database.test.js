import FavouritesDatabase from '../favourites-database';

describe('FavouritesDatabase', () => {
  let database, title = 'test';

  beforeEach(() => {
    database = new FavouritesDatabase(name);
  });

  afterEach(() => {
    localStorage.setItem(name, null);
  });

  describe('#load', () => {
    it('has no contents by default', () => {
      expect(database.load()).toEqual([]);
    });

    it('loads contents from localStorage', () => {
      const contents = [{ imdbID: 'favourite1'}, { imdbID: 'favourite2' }];
      localStorage.setItem(name, JSON.stringify(contents));
      expect(database.load()).toEqual(contents);
    });
  });

  describe('#add', () => {
    const movie1 = { imdbID: 'favourite1' };
    const movie2 = { imdbID: 'favourite2' };

    it('adds movies to localStorage', () => {
      database.add(movie1);
      database.add(movie2);
      const contents = JSON.parse(localStorage.getItem(name));
      expect(contents).toEqual([movie1, movie2]);
    });

    it('overwrites existing localStorage contents', () => {
      localStorage.setItem(name, JSON.stringify([movie1, movie2]));
      database.add({ imdbID: 'hi' });
      const contents = JSON.parse(localStorage.getItem(name));
      expect(contents).toEqual([movie1, movie2, { imdbID: 'hi' }]);
    });

    it('returns updated localStorage contents', () => {
      expect(database.add(movie1)).toEqual([movie1]);
    });

    it('does nothing if movie exists already in localStorage', () => {
      localStorage.setItem(name, JSON.stringify([movie1, movie2]));
      expect(database.add(movie1)).toEqual([movie1, movie2]);
    });
  });

  describe('#remove', () => {
    const movie1 = { imdbID: 'favourite1' };
    const movie2 = { imdbID: 'favourite2' };

    beforeEach(() => {
      localStorage.setItem(name, JSON.stringify([movie1, movie2]));
    });

    it('removes movies from localStorage', () => {
      database.remove(movie1);
      const contents = JSON.parse(localStorage.getItem(name));
      expect(contents).toEqual([movie2]);
    });

    it('returns updated localStorage contents', () => {
      expect(database.remove(movie1)).toEqual([movie2]);
    });
  });
});
