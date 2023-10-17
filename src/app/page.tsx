'use client';

import { useActionCreator } from '@/hooks/useActionCreator';
import { pokemonActions, getPokemonByName } from '@/redux/reducers/pokemonSlice';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { selectPokemon } from '@/redux/reducers/pokemonSelectors';
import styles from './page.module.scss';
import { Search } from './components/search';
import { PokemonInfo } from './components/pokemonInfo';

const allActions = {
  ...pokemonActions,
  getPokemonByName,
};

export default function Home() {
  const wrappedPokemonActions = useActionCreator(allActions);
  const pokemon = useAppSelector(selectPokemon);
  const [ searchValue, setSearchValue ] = useState('');
  const [ valueForPokemonApiCall, setValueForPokemonApiCall ] = useState('');
  const [ searchHistory, setSearchHistory ] = useState<string[]>([]);

  const handleSetValueForPokemonApiCall = () => {
    const storedArray = localStorage.getItem('history');
    const existingHistory = storedArray ? JSON.parse(storedArray) : [];

    existingHistory.push(searchValue);

    localStorage.setItem('history', JSON.stringify(existingHistory));
    setValueForPokemonApiCall(searchValue);
    setSearchHistory((prev) => [ ...prev, searchValue ]);
  };

  useEffect(() => {
    const storedArray = localStorage.getItem('history');
    const existingHistory = storedArray ? JSON.parse(storedArray) : [];
    setSearchHistory(existingHistory);
  }, []);

  useEffect(() => {
    if (valueForPokemonApiCall.length > 0) {
      wrappedPokemonActions.getPokemonByName({ pokemonName: valueForPokemonApiCall });
    }
  }, [ valueForPokemonApiCall, wrappedPokemonActions ]);

  return (
    <main className={ styles.main }>
      <Search
        searchHistory={ searchHistory }
        placeholder='type pokemon name'
        setValue={ setSearchValue }
        value={ searchValue }
        setValueForPokemonApiCall={ handleSetValueForPokemonApiCall }
      />
      {pokemon && <PokemonInfo pokemon={ pokemon } />}
    </main>
  );
}
