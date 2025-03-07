import { useEffect } from "react";
import { MealCard } from "./MealCard";
import classes from '../styles/Meals.module.css';
import { fetchAllMeals } from "../reduxStore/mealsSlice";
import { useAppDispatch, useAppSelector } from "../reduxStore/store";
import { useSearchParams } from "react-router-dom";

export const Meals = () => {
  const dispatch = useAppDispatch();
  const filteredMeals = useAppSelector((state) => state.meals.filteredMeals);
  const loading = useAppSelector((state) => state.meals.loading);
  const error = useAppSelector((state) => state.meals.error);

  const [searchParams, setSearchParams] = useSearchParams();
  const postsPerPage = +(searchParams.get('postsPerPage') || 20);
  const currentPage = +(searchParams.get('currentPage') || 1);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const totalPages = Math.ceil(filteredMeals.length / postsPerPage);

  function handleCurrentPage(current: string) {
    const params = new URLSearchParams(searchParams);

    params.set('currentPage', current);
    setSearchParams(params);
  }

  const currentCards = filteredMeals.slice(firstPostIndex, lastPostIndex);

  function handlePrevPage() {
    const params = new URLSearchParams(searchParams);

    if (currentPage === 1) {
      params.set('currentPage', totalPages.toString());
    } else {
      params.set('currentPage', (+currentPage - 1).toString());
    }

    setSearchParams(params);
  }

  function handleNextPage() {
    const params = new URLSearchParams(searchParams);

    if (+currentPage === totalPages) {
      params.set('currentPage', '1');
    } else {
      params.set('currentPage', (+currentPage + 1).toString());
    }

    setSearchParams(params);
  }

  useEffect(() => {
    dispatch(fetchAllMeals());
  }, [dispatch]);

  if (loading) {
    return <h1>Loading meals...</h1>;
  }

  if (error) {
    return <h1>Error fetching meals: {error}</h1>;
  }

  if (filteredMeals.length === 0) {
    return (
      <h1>There is no meals according to your category, please choose another one.</h1>
    )
  }

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 7;

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={i === currentPage ? classes.active : classes.btn}
            onClick={() => handleCurrentPage(i.toString())}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage > 7) {
        buttons.push(<button key={1} className={classes.btn} onClick={() => handleCurrentPage('1')}>1</button>);
        buttons.push(<span key="ellipsis"> ... </span>);
      }

      const endPage = Math.min(totalPages - 1, currentPage + 3);
      const startPage = Math.max(1, currentPage - 3);

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <button
            key={i}
            className={i === currentPage ? classes.active : classes.btn}
            onClick={() => handleCurrentPage(i.toString())}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages) {
        buttons.push(<span key="ellipsis-end">...</span>);
        buttons.push(
          <button
            key={totalPages}
            onClick={() => handleCurrentPage(totalPages.toString())}
          >
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
  };

  return (
    <div className={classes.cards_layout}>
      <div className={classes.blocks}>
        {currentCards.map(meal => (
          <div key={meal.idMeal} className={classes.card_layout}>
            <MealCard meal={meal} />
          </div>
        ))}
      </div>

      <div className={classes.btns}>
        <button className={classes.btn} onClick={handlePrevPage}>
          -
        </button>
        {renderPaginationButtons()}
        <button className={classes.btn} onClick={handleNextPage}>
          +
        </button>
       </div>
    </div>
  )
}