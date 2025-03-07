import { useSelector } from "react-redux";
import { Meal } from "../interfaces/Interfaces";
import { CollectedCard } from "../components/CollectedCard";
import classes from '../styles/CollectedMeals.module.css';

export const CollectedMeals = () => {
  const collectedProducts = useSelector((state: { collectedProducts: { collected: Meal[] } }) => state.collectedProducts.collected);

  return (
    <div className={classes.layout}>
      <div className={classes.cards}>
        {collectedProducts.map(meal => (
          <CollectedCard meal={meal} />
        ))}
      </div>
      <div>
      <h2>Collected Ingredients: </h2>
      {collectedProducts.map((meal: Meal) => (
        <div key={meal.idMeal}>
          {Array.from({ length: 13 }, (_, index) => {
            const ingredient = meal[`strIngredient${index + 1}` as keyof Meal];
            const measure = meal[`strMeasure${index + 1}` as keyof Meal];
            return ingredient ? (
              <span key={index}>
                {ingredient} {measure} <br />
              </span>
            ) : null;
          })}
        </div>
      ))}
      </div>
    </div>
  )
}