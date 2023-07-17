import { addQueryCases } from 'shared/helpers/helpers';
import { ISearchParams, ISearchResults } from './../types/searchResultsSchema';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATUSES } from "shared/constants/constants";


const name = 'searchResults'

const ENDPOINTS = {
    SEARCH: '/repositories'
}

const initialState: ISearchResults =  {
    searchStatus: REQUEST_STATUSES.NOT_REQUESTED,
    searchRepoResults: {
        total_count: 0,
        items: [],
    },
    searchError: null,
}



export const getSearchResults = createAsyncThunk(
    `${name}/getSearchResults`,
    async (params: ISearchParams,{ extra: api }: any) => {
        try {
            const response = await api.get(ENDPOINTS.SEARCH, { params: { ...params } })
            return response.data;       
        } catch(error) {
            return error;
        }
    }
)




export const searchResultsSlice = createSlice({
    name: name,
    initialState,
    reducers: {},
    extraReducers(builder) {
        addQueryCases(builder, getSearchResults, {
            status: 'searchStatus',
            data: 'searchRepoResults',
            error: 'searchError'
        })
    }
    
})

export const { reducer: searchResultsReducer } = searchResultsSlice;
