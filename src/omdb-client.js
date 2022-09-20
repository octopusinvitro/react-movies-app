import OMDBResult from './omdb-result';

class OMDBClient {
  constructor(apiKey) {
    this._apiKey = apiKey;
    this._baseurl = `http://www.omdbapi.com/?apikey=${apiKey}`;
    this._result = new OMDBResult();
  }

  async get(searchValue) {
    if (!this._apiKey || !searchValue) return this._result.empty();

    const response = await fetch(`${this._baseurl}&s=${searchValue}`);
    const responseJSON = await response.json();

    if (response.status === 401) {
      return this._result.error(responseJSON);
    }

    return this._result.success(responseJSON);
  }
}

export default OMDBClient;
