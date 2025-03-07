import { configureStore } from '@reduxjs/toolkit';
import mealsReducer, { MealsState } from './mealsSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import categoriesReducer, { CategoriesState } from './categoriesSlice';
import collectedProductsReducer, { CollectedProductsState } from './collectedSlice';

export const store = configureStore({
  reducer: {
    meals: mealsReducer,
    categories: categoriesReducer,
    collectedProducts: collectedProductsReducer,
  },
});

export type StoreState = {
  meals: MealsState;
  categories: CategoriesState;
  collectedProducts: CollectedProductsState;
};

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;

export default store;