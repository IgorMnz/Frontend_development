import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

//Эта функция автоматически генерирует нам хук для запоросов get, post, put...  по названию того эндпоинта, который мы указали в endpoints:, а так же эта функция генерирует reducer на подобии команды createSlice
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Heroes'],
    endpoints: builder => ({
        getHeroes: builder.query({
            query: () => '/heroes',
            providesTags: ['Heroes']
        }),
        createHero: builder.mutation({
            query: hero => ({
                url: '/heroes',
                method: 'POST',
                body: hero
            }),
            invalidatesTags: ['Heroes']
        }),
        deleteHero: builder.mutation({
            query: id => ({
                url: `/heroes/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Heroes']
        })
    })
})

export const {useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation} = apiSlice