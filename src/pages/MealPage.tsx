import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ApiResponse, Meal } from "../interfaces/Interfaces";
import classes from '../styles/MealPage.module.css';
import { useDispatch, useSelector } from "react-redux";
import { addCollected, removeCollected } from '../reduxStore/collectedSlice';
import { StoreState } from "../reduxStore/store";

export const MealPage = () => {
  const [currentMeal, setCurrentMeal ] = useState<Meal | null>(null);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const collectedMeals = useSelector((state: StoreState) => state.collectedProducts.collected);
  const isCollected = currentMeal ? collectedMeals.some(meal => meal.idMeal === currentMeal.idMeal) : false;

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        const result: ApiResponse = await response.json();
        setCurrentMeal(result.meals[0]);
      } catch (error) {
        console.log(error);
      }
    }

    fetchdata();
  }, [id]);


  const handleToggleCollected = () => {
    if (currentMeal) {
      console.log('Current Meal ID:', currentMeal.idMeal);
      console.log('Is Collected:', isCollected); 
      if (isCollected) {
        dispatch(removeCollected(currentMeal.idMeal));
        console.log('Removed from collection:', currentMeal.idMeal); 
      } else {
        dispatch(addCollected(currentMeal));
        console.log('Added to collection:', currentMeal.idMeal); 
      }
    }
  };

  return (
    <div className={classes.layout}>
      {currentMeal && (
        <div>
          <div className={classes.detail_block_1}>
            <img 
              src={currentMeal.strMealThumb} 
              alt="mealImg"
              className={classes.meal_img}
            />
            <div className={classes.detail_block_2}>
              <h1 className={classes.detail_h1}>{currentMeal.strMeal}</h1>
              <p><strong>Category: </strong>{currentMeal.strCategory}</p>
              <p><strong>HomeCountry: </strong>{currentMeal.strArea}</p>
              <p><strong>Ingredients: </strong><br></br>
                {currentMeal.strIngredient1 && (
                <span>
                  {currentMeal.strIngredient1} {currentMeal.strMeasure1} <br></br>
                </span>
                )}
                {currentMeal.strIngredient2 && (
                <span>
                  {currentMeal.strIngredient2} {currentMeal.strMeasure2} <br></br>
                </span>
                )}
                {currentMeal.strIngredient3 && (
                <span>
                  {currentMeal.strIngredient3} {currentMeal.strMeasure3} <br></br>
                </span>
                )}
                {currentMeal.strIngredient4 && (
                <span>
                  {currentMeal.strIngredient4} {currentMeal.strMeasure4} <br></br>
                </span>
                )}
                {currentMeal.strIngredient5 && (
                <span>
                  {currentMeal.strIngredient5} {currentMeal.strMeasure5} <br></br>
                </span>
                )}
                {currentMeal.strIngredient6 && (
                <span>
                  {currentMeal.strIngredient6} {currentMeal.strMeasure6} <br></br>
                </span>
                )}
                {currentMeal.strIngredient7 && (
                <span>
                  {currentMeal.strIngredient7} {currentMeal.strMeasure7} <br></br>
                </span>
                )}
                {currentMeal.strIngredient8 && (
                <span>
                  {currentMeal.strIngredient8} {currentMeal.strMeasure8} <br></br>
                </span>
                )}
                {currentMeal.strIngredient9 && (
                <span>
                  {currentMeal.strIngredient9} {currentMeal.strMeasure9} <br></br>
                </span>
                )}
                {currentMeal.strIngredient10 && (
                <span>
                  {currentMeal.strIngredient10} {currentMeal.strMeasure10} <br></br>
                </span>
                )}
                {currentMeal.strIngredient11 && (
                <span>
                  {currentMeal.strIngredient11} {currentMeal.strMeasure11} <br></br>
                </span>
                )}
                {currentMeal.strIngredient12 && (
                <span>
                  {currentMeal.strIngredient12} {currentMeal.strMeasure12} <br></br>
                </span>
                )}
                {currentMeal.strIngredient13 && (
                <span>
                  {currentMeal.strIngredient13} {currentMeal.strMeasure13} <br></br>
                </span>
                )}
              </p>
              <button 
                className={classes.btn}
                onClick={handleToggleCollected}
              >
                {isCollected ? 'Remove from collection' : 'Add to collection'}
              </button>
            </div>
          </div>
          <p
            className={classes.detail_cooking}>
            <strong>How to cook: </strong>
            <br></br>
            <br></br>
            {currentMeal.strInstructions}
          </p>
        </div>
      )}
    </div>
  )
}