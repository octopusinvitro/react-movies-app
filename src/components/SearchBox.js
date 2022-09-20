import React from 'react';

const SearchBox = (props) => {
	const update = (event) => {
		props.setSearchValue(event.target.value);
	}

	return <input
	  value={props.searchValue}
		onChange={update}
		placeholder="Type to search..." />;
};

export default SearchBox;
