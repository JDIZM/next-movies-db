import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Movie } from '@/types/movies';

interface MoviesApiResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export const moviesApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}` }),
  reducerPath: 'moviesApi',
  tagTypes: ['Movies', 'Search', 'Trending', 'PopularOverTime', 'GenreDistribution'],
  endpoints: (build) => ({
    getMovies: build.query<MoviesApiResponse, number>({
      query: (page = 1) => `/movies?page=${page}`,
      providesTags: (result, error, page) => [{ type: 'Movies', id: page }],
    }),
    searchMovies: build.query<MoviesApiResponse, { query: string; page: number }>({
      query: ({ query, page = 1 }) => `/movies/search?query=${query}&page=${page}`,
      providesTags: (result, error, { query, page }) => [
        { type: 'Search', id: `${query}-${page}` },
      ],
    }),
    trendingMovies: build.query<MoviesApiResponse, number>({
      query: (page = 1) => `/movies/trending?page=${page}`,
      providesTags: (result, error, page) => [{ type: 'Trending', id: page }],
    }),
    popularMoviesOverTime: build.query<
      { month: string; avgPopularity: number }[],
      { startDate: string; endDate: string }
    >({
      query: ({ startDate, endDate }) =>
        `/movies/popular?start_date=${startDate}&end_date=${endDate}`,
      providesTags: ['PopularOverTime'],
    }),
    genreDistribution: build.query<{ name: string; value: number }[], void>({
      query: () => `/movies/genre-distribution`,
      providesTags: ['GenreDistribution'],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useSearchMoviesQuery,
  useTrendingMoviesQuery,
  usePopularMoviesOverTimeQuery,
  useGenreDistributionQuery,
} = moviesApiSlice;
