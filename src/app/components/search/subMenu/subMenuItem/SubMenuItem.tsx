import { FC, ComponentPropsWithoutRef } from 'react';
import s from './style.module.scss';

type TSubMenuItem = ComponentPropsWithoutRef<'li'> & {
  text: string;
}

const SubMenuItem: FC<TSubMenuItem> = ({
  text,
  ...restProps
}) => (
  <li
    className={ s.submenu__item }
    { ...restProps }
  >
    { text }
  </li>
);

export default SubMenuItem;
