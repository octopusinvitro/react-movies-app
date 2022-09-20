class FavouritesDatabase {
  constructor(name = 'react-movie-app-favourites') {
    this._name = name;
  }

  load() {
		return JSON.parse(localStorage.getItem(this._name)) || [];
	}

  add(movie) {
    const favourites = this.load();
    if (this._repeated(favourites, movie).length) { return favourites; }

    const updatedFavourites = [...favourites, movie];
    this._save(updatedFavourites);
    return updatedFavourites;
  }

  remove(movie) {
    const updatedFavourites = this._different(this.load(), movie);
    this._save(updatedFavourites);
    return updatedFavourites;
  }

  _repeated(favourites, movie) {
    return favourites.filter(favourite => favourite.imdbID === movie.imdbID);
  }

  _different(favourites, movie) {
    return favourites.filter(favourite => favourite.imdbID !== movie.imdbID);
  }

  _save(contents) {
    localStorage.setItem(this._name, JSON.stringify(contents));
  }
}

export default FavouritesDatabase;
