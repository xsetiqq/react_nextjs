import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import snekerType from "@/types/snekerType";

export const sneakersApi = createApi({
  reducerPath: "sneakersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://bf8500b0f4f0c135.mokky.dev/" }),
  endpoints: (builder) => ({
    getSneakers: builder.query<snekerType[], void>({
      query: () => "items",
    }),
  }),
});

export const { useGetSneakersQuery } = sneakersApi;
