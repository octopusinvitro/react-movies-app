import React, { useState, useEffect } from 'react';

import './App.css';

import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';

import MovieList from './components/MovieList';
import { APIKeyPrompt, SearchPrompt, ErrorPrompt } from './components/Prompts';

import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

import FavouritesDatabase from './favourites-database';
import OMDBClient from './omdb-client';

const App = (props) => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const database = new FavouritesDatabase();
	const client = new OMDBClient(props.apiKey);
	let Prompt = SearchPrompt;

	const getMovieRequest = async (searchValue) => {
		const result = await client.get(searchValue);

		if (result.error) {
			Prompt = ErrorPrompt;
		} else {
			Prompt = SearchPrompt;
			setMovies(result.movies);
		}
	};

	const delayedRequest = () => {
		const id = setTimeout(() => getMovieRequest(searchValue), parseInt(props.delay));
    return () => clearTimeout(id);
	}

	const loadFavourites = () => {
		const movieFavourites = database.load();
		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}

	const addFavouriteMovie = movie => setFavourites(database.add(movie));
	const removeFavouriteMovie = movie => setFavourites(database.remove(movie));

	useEffect(delayedRequest, [searchValue]);
	useEffect(loadFavourites, []);

	if (!props.apiKey) { return <APIKeyPrompt />; }

	return (
		<>
		<article>
			<header>
				<MovieListHeading heading="Movies" />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</header>

			{ !movies.length ?
			<Prompt /> :
			<MovieList
				movies={movies}
				favouriteOnClick={addFavouriteMovie}
				favouriteComponent={AddFavourites}
			/>
		  }
		</article>

		<article>
			<header>
				<MovieListHeading heading='Favourites' />
			</header>

			<MovieList
				movies={favourites}
				favouriteOnClick={removeFavouriteMovie}
				favouriteComponent={RemoveFavourites}
			/>
		</article>
		</>
	);
};

export default App;
