import React from 'react';
import Poster from './Poster';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;
	const truncateValue = 40;

	return (
		<ul className="movie-list">
			{props.movies.map(movie => (
				<li key={movie.imdbID}><picture>
					<Poster poster={ movie.Poster } title={ movie.Title } />

					<figcaption>
						{ movie.Title.substring(0, truncateValue) } { movie.Title.length >= truncateValue && '...' }
						<p className="year">{ movie.Year }</p>
						{ movie.Type }
					</figcaption>

					<div className="overlay" onClick={ () => props.favouriteOnClick(movie) }>
						<FavouriteComponent />
					</div>
				</picture></li>
			))}
		</ul>
	);
};

export default MovieList;
