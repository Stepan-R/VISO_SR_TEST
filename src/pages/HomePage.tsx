import { FilterCategory } from "../components/FilterCategory";
import { Meals } from "../components/Meals";
import { Search } from "../components/Search";
import classes from '../styles/HomePage.module.css';

export const HomePage = () => {
  return (
    <div>
      <div className={classes.home_layout}>
        <Search />
        <FilterCategory />
      </div>
      <Meals />
    </div>
  )
}