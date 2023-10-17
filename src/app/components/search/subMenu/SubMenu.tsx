import { FC, ComponentPropsWithoutRef } from 'react';
import { SubMenuItem } from '@/app/components/search/subMenu/subMenuItem/';
import s from './style.module.scss';

type TSubMenu = ComponentPropsWithoutRef<'div'> & {
  searchHistory: string[]
}

const SubMenu: FC<TSubMenu> = ({
  searchHistory,
}) => (
  <div className={ s.search__submenu }>
    { searchHistory.length < 1
      ? (
        <p>you havent`t search history</p>
      )
      : searchHistory.map((item, index) => (
        <SubMenuItem text={ item } key={ `${item}-${index}` } />
      )) }
  </div>
);

export default SubMenu;
