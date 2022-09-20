class OMDBResult {
  empty() {
    return this._result(null, []);
  }

  success(json) {
    const movies = (json.Search) ? json.Search : [];
    return this._result(null, movies);
  }

  error(json) {
    return this._result(json.Error, []);
  }

  _result(error, movies) {
    return { error: error, movies: movies };
  }
}

export default OMDBResult;
