import React from 'react';

const Poster = (props) => {
	if (props.poster === 'N/A') {
		return  <div className="placeholder">{ props.title }</div>;
  }

	return <img className="poster" src={ props.poster } alt={ `${props.title} poster` } />;
};

export default Poster;
