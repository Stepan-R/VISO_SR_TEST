import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../reduxStore/store";
import { fetchCategories } from "../reduxStore/categoriesSlice";
import classes from '../styles/FilterCategory.module.css';
import { setSelectedCategory } from "../reduxStore/mealsSlice";

export const FilterCategory = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector(state => state.categories);
  const selectedCategory = useAppSelector(state => state.meals.selectedCategory);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    dispatch(setSelectedCategory(category));
  };

  return (
    <div>
      <select 
        className={classes.select_layout} 
        value={selectedCategory || 'Select a category'} 
        onChange={handleCategoryChange}
      >
        <option value="">Show all the meals</option>
        {categories.map(category => (
          <option key={category.idCategory} value={category.strCategory}>{category.strCategory}</option>
        ))}
      </select>
    </div>
  )
}