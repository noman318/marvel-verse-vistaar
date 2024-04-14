import { MOVIE_URL } from "../constants/url";
import { apiSlice } from "./apiSlice";

export const filmApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFilm: builder.mutation({
      query: (data) => ({
        url: `${MOVIE_URL}`,
        body: data,
        method: "POST",
      }),
    }),
    getAllFilms: builder.query({
      query: () => ({
        url: `${MOVIE_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getSingleFilm: builder.query({
      query: (id) => ({
        url: `${MOVIE_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    searchDetails: builder.query({
      query: ({ keyword, genre }) => ({
        url: `${MOVIE_URL}/filter?keyword=${keyword}&genre=${genre}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAllGenres: builder.query({
      query: () => ({
        url: `${MOVIE_URL}/genre`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateFilm: builder.mutation({
      query: ({ id, data }) => ({
        url: `${MOVIE_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `${MOVIE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateFilmMutation,
  useGetAllFilmsQuery,
  useGetSingleFilmQuery,
  useUpdateFilmMutation,
  useDeleteMovieMutation,
  useSearchDetailsQuery,
  useGetAllGenresQuery,
} = filmApiSlice;
