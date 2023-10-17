/* eslint-disable camelcase */
/* eslint-disable max-len */
import {
  createAsyncThunk, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { isError } from '@/redux/isErrorFunction';
import { RequestStatuses, TPokemon } from '@/types/generalTypes';
import axios from 'axios';

type TPokemonErrors = {
  errorsPokemon: null | string;
}

type TPokemonLoadings = {
  loadingPokemon: RequestStatuses;
}

type TPokemonInitialState = {
  pokemon: TPokemon | null;
  errors: TPokemonErrors;
  loadings: TPokemonLoadings;
}

const initialState: TPokemonInitialState = {
  pokemon: null,
  errors: {
    errorsPokemon: null,
  },
  loadings: {
    loadingPokemon: RequestStatuses.INIT,
  },
};

export const getPokemonByName = createAsyncThunk<TPokemon, { pokemonName: string }, {
  rejectValue: { loadingName: string, error: string, errorField: string }
}>(
  'pokemonSlice/getPokemonByName',
  async ({ pokemonName }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<TPokemon>(`${process.env.NEXT_PUBLIC_POKEMON_API_URI}${pokemonName.toLowerCase()}/`);

      const dataSpritesWithoutExtraInfo = {
        back_default: data.sprites.back_default,
        back_female: data.sprites.back_female,
        back_shiny: data.sprites.back_shiny,
        back_shiny_female: data.sprites.back_shiny_female,
        front_default: data.sprites.front_default,
        front_female: data.sprites.front_female,
        front_shiny: data.sprites.front_shiny,
        front_shiny_female: data.sprites.front_shiny_female,
      };

      data.sprites = dataSpritesWithoutExtraInfo;

      return data;
    } catch (err) {
      return rejectWithValue({
        loadingName: 'loadingPokemon',
        errorField: 'errorsPokemon',
        error: JSON.stringify(err),
      });
    }
  },
);

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPokemonByName.pending, (state) => {
        state.loadings.loadingPokemon = RequestStatuses.LOADING;
        state.errors.errorsPokemon = null;
      })
      .addCase(getPokemonByName.fulfilled, (state, action) => {
        state.loadings.loadingPokemon = RequestStatuses.FULFILLED;
        state.pokemon = action.payload;
      })
      .addMatcher(isError, (state, action: PayloadAction<{ loadingName: keyof TPokemonLoadings, error: string, errorField: keyof TPokemonErrors }>) => {
        state.errors[action.payload.errorField] = action.payload.error;
        state.loadings[action.payload.loadingName] = RequestStatuses.ERROR;
      });
  },
});

export const {
  reducer: pokemonReducer,
  actions: pokemonActions,
} = pokemonSlice;
