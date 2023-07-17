import { useLocation, useNavigate } from 'react-router-dom';
import classes from './Header.module.scss';
import React, { useRef } from 'react';
import search from 'shared/assets/icons/search.svg';


type FormFields = {
  q: HTMLInputElement;
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const defaultValue = searchParams.get('q') || '';

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement & FormFields>) => {
    event.preventDefault();
    const value = event.currentTarget.q.value;
    if (value.length < 3) return;
    searchParams.set('q', value);
    navigate({ search: searchParams.toString() });
  };

  return (
    <form onSubmit={handleSubmit} className={classes.headerWrapper}>
      <input
        ref={inputRef}
        type="text"
        name="q"
        defaultValue={defaultValue}
        placeholder="Начните вводить текст для поиска (не менее трех символов)"
      />
      <button type='submit'>
        <img src={search} alt="" />
      </button>
    </form>
  );
};

export default Header;
