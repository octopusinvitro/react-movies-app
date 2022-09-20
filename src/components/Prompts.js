import React from 'react';

const apiURL = 'http://www.omdbapi.com/apikey.aspx';

const APIKeyPrompt = () => {
  return (<>
    <p>You forgot your API key at the end of the URL!</p>
    <p>Like this: <code>?apikey=YOUR_API_KEY</code>.</p>
    <p>If you don't have one, <a href={ apiURL }>go to the "Open Movie Database API" site</a> to get one.</p>
  </>);
}

const SearchPrompt = () => {
  return <p>Use the search box to search for movies! 👆</p>;
}

const ErrorPrompt = () => {
  return (<>
    <p>Looks like that API key is invalid. <a href={ apiURL }>Go to the "Open Movie Database API" site</a> to get a new one</p>;
    </>);
  }

export { APIKeyPrompt, SearchPrompt, ErrorPrompt };
