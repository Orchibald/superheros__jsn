import { configureStore } from '@reduxjs/toolkit';
import superheroesReducer from './slices/superherosSlice';

export const store = configureStore({
  reducer: {
    superheroes: superheroesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;