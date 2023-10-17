import { FC, ComponentPropsWithoutRef } from 'react';
import { TPokemon } from '@/types/generalTypes';
import { typedObjectValues } from '@/utils/generalUtils';
import Image from 'next/image';
import s from './style.module.scss';

type TPokemonInfo = ComponentPropsWithoutRef<'div'> & {
  pokemon: TPokemon;
}

const PokemonInfo: FC<TPokemonInfo> = ({
  pokemon,
  ...restProps
}) => (
  <div
    className={ s['pokemon-info'] }
    { ...restProps }
  >
    <h2>
      { pokemon.name }
    </h2>
    <div className={ s['pokemon-info__stats'] }>
      <p>
        Weight:
        {' '}
        { pokemon.weight }
      </p>
      <p>
        Base experience:
        {' '}
        { pokemon.base_experience }
      </p>
    </div>
    <div className={ s['pokemon-info__images'] }>
      { typedObjectValues(pokemon.sprites).map((value) => {
        if (value !== null) {
          return (
            <Image
              width={ 100 }
              height={ 100 }
              key={ value }
              alt='pokemon img'
              src={ value }
            />
          );
        }
        return null;
      }) }
    </div>
  </div>
);

export default PokemonInfo;
