import { useState } from 'react';
import classes from '../styles/Search.module.css';
import { useAppDispatch } from '../reduxStore/store';
import { debounce } from '../utils/debounce';
import { searchMeals } from '../reduxStore/mealsSlice';

export const Search = () => {
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = debounce((term: string) => {
    dispatch(searchMeals(term));
  }, 500);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };
  return (
    <div className={classes.search_layout}>
      <input 
        className={classes.inpuT} 
        placeholder='Get your recipe by name.'
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  )
}