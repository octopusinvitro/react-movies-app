const success = {
  totalResults: '3',
  Response: 'True',
  Search: [
    {
      imdbID: 'tt1446192',
      Title: 'Rise of the Guardians',
      Year: '2012',
      Type: 'movie',
      Poster: 'https://m.media-amazon.com/images/M/MV5BMTkzMjgwMDg1M15BMl5BanBnXkFtZTcwMTgzNTI1OA@@._V1_SX300.jpg'
    },
    {
      imdbID: 'tt4176370',
      Title: 'Guardians of the Galaxy',
      Year: '2015–2019',
      Type: 'series',
      Poster: 'https://m.media-amazon.com/images/M/MV5BNDM4NDQxMDU2MV5BMl5BanBnXkFtZTgwMDY2MDQ5NjE@._V1_SX300.jpg'
    },
    {
      imdbID: 'tt3467114',
      Title: 'Halo 5:  Guardians',
      Year: '2015',
      Type: 'game',
      Poster: 'https://m.media-amazon.com/images/M/MV5BMjAzMjIzMjY4OF5BMl5BanBnXkFtZTgwNDM5NzQxNzE@._V1_SX300.jpg'
    }
  ]
};

const empty = { totalResults: '0', Response: 'True', Search: [] };

const invalid = { Response: 'False', Error: 'Invalid API key!' };

export default { success: success, empty: empty, invalid: invalid };
