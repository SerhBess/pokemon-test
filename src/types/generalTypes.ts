export type TPokemonSprites = {
  back_default: string | null,
  back_female: string | null,
  back_shiny: string | null,
  back_shiny_female: string | null,
  front_default: string | null,
  front_female: string | null,
  front_shiny: string | null,
  front_shiny_female: string | null,
}

export type TPokemon = {
  name: string;
  sprites: TPokemonSprites;
  base_experience: number;
  weight: number;
}

export enum RequestStatuses {
  INIT = 'init',
  LOADING = 'loading',
  ERROR = 'error',
  FULFILLED = 'fulfilled',
}
