# README

This is my first React app ever ☺.

It shows you a lists of movies that are the result of a search, and you can add or remove them from your favourites. The favourite movies are stored using the `localStorage` feature of your browser. It uses the [OMDB database API](https://www.omdbapi.com/).

The request is in a `useEffect` hook that gets triggered everytime the search input value changes. Unfortunately this means it will trigger a request everytime the user types the next letter of their search term. Because of this, I decided to delay the request to the API 500ms to give the user enough time to finish typing while still feeling fast, so that we don't hit the API limit.

## Setup

You need an API key to use the API. Go to http://www.omdbapi.com/apikey.aspx, enter you email and you will receive and email with the key. Click the provided link to activate the key. You can use it like this:

```
http://www.omdbapi.com/?i=tt3896198&apikey=YOUR_API_KEY
```


## To do

* [ ] I would like to render an error message when the API key is unauthorized, but I don't know how to trigger a render of the `ErrorPrompt` in `App.js` when that happens. The error and success logic for the request is already in place in both the client and `getMovieRequest`, so I just need to figure out how to render the component.

* [ ] Fix the skipped tests in `App.test.js`

* [ ] I would like to move the client mock and the database mock in `App.test.js` to the `__mocks__` folder, but when I tried it the tests errored because the mocked functions are considered "read only" by the framework. I have to figure out why.
