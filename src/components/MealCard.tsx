import { Link } from "react-router-dom";
import { Meal } from "../interfaces/Interfaces"
import classes from '../styles/MealCard.module.css';

interface Props {
  meal: Meal,
}

export const MealCard: React.FC<Props> = ({ meal }) => {
  return (
    <Link to={`/meal/${meal.idMeal}`} className={classes.link_st}>
      <img 
        src={meal.strMealThumb} 
        alt="mealImg"
        className={classes.meal_img}
      />
      <h2 className={classes.meal_h2}>{meal.strMeal}</h2>
      <p>{meal.strArea} {meal.strCategory}</p>
    </Link>
  )
}