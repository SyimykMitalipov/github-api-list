import { configureStore } from "@reduxjs/toolkit";
import { searchResultsReducer } from "entities/SearchResults";
import { requester } from "shared/config/requester";



export function createReduxStore() {
    return configureStore({
        reducer: {
            searchResults: searchResultsReducer,
        },
        middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ thunk: { extraArgument: requester } }),
    })
    
}

export const store = createReduxStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof createReduxStore>;