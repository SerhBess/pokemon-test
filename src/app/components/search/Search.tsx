import {
  FC,
  ComponentPropsWithoutRef,
  useState,
  MouseEvent,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from 'react';
import s from './style.module.scss';
import { SubMenu } from './subMenu';

type TSearch = ComponentPropsWithoutRef<'div'> & {
  placeholder: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  setValueForPokemonApiCall: () => void;
  searchHistory: string[];
}

const Search: FC<TSearch> = ({
  placeholder,
  value,
  setValue,
  setValueForPokemonApiCall,
  searchHistory,
  ...restProps
}) => {
  const [ subMenuOpen, setSubMenuOpen ] = useState(false);

  const handleSetSubMenuClose = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setSubMenuOpen(true);
  };

  useEffect(() => {
    const handleSetResultsStatus = () => setSubMenuOpen(false);
    document.body.addEventListener('click', handleSetResultsStatus);

    return () => document.body.removeEventListener('click', handleSetResultsStatus);
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  return (
    <div
      className={ s.search }
      { ...restProps }
    >
      <input
        onClick={ handleSetSubMenuClose }
        type='text'
        value={ value }
        onChange={ handleInputChange }
        placeholder={ placeholder }
      />
      <button
        type='button'
        onClick={ setValueForPokemonApiCall }
        className={ s.search__button }
      >
        Search
      </button>
      { subMenuOpen && (
        <SubMenu searchHistory={ searchHistory } />
      ) }
    </div>
  );
};

export default Search;
