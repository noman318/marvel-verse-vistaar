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
    }),
    getSingleFilm: builder.query({
      query: (id) => ({
        url: `${MOVIE_URL}/${id}`,
      }),
    }),
  }),
});

export const {
  useCreateFilmMutation,
  useGetAllFilmsQuery,
  useGetSingleFilmQuery,
} = filmApiSlice;
