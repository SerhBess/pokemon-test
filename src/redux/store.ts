import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { pokemonReducer } from '@/redux/reducers/pokemonSlice';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
