const API_KEY = '3f0d73f5d28c63ac47ca441b3cf16d1d';
// const BASE_URL: `https://image.tmdb.org`;

interface GenresInterface {
  [key: number]: string;
}

const genres: GenresInterface = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'Tv Movie',
};

interface MoviesInterface {
  id: number;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  genre_ids: number[];
}

const getImagePath = (path: any) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;

const getBackdropPath = (path: any) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

const getMovies = async () => {
  const {results} = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=3f0d73f5d28c63ac47ca441b3cf16d1d`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch Movies! try again.');
    }
  });


  const movies = results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }: MoviesInterface) => ({
      id: Number(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genres: genre_ids.map(
        (genre: number) => genres[genre] || 'Unknown Genre',
      ),
    }),
  );
  return movies;
};

export {getMovies};
