import { Link } from "react-router-dom";
import { Meal } from "../interfaces/Interfaces"
import classes from '../styles/CollectedCard.module.css';
import { useDispatch } from "react-redux";
import { removeCollected } from "../reduxStore/collectedSlice";

interface Props {
  meal: Meal
}

export const CollectedCard: React.FC<Props> = ({ meal }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeCollected(meal.idMeal));
  };

  return (
    <div className={classes.layout}>
      <Link to={`/meal/${meal.idMeal}`} className={classes.link}>
        <img src={meal.strMealThumb} alt="meal" className={classes.card_img}></img>
      </Link>
      <div className={classes.info}>
        <h2>{meal.strMeal}</h2>
        <p>{meal.strCategory}</p>
        <img 
          src="./bin.svg" 
          alt="delete" 
          className={classes.bin}
          onClick={handleRemove} 
        />
      </div>
    </div>
  )
}