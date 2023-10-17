/* eslint-disable max-len */
import { RootState } from '@/app/redux/store';

export const selectPokemon = (state: RootState) => state.pokemon.pokemon;
