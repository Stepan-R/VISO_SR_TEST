import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Meal } from '../interfaces/Interfaces';

export interface CollectedProductsState {
  collected: Meal[];
}

const initialState: CollectedProductsState = {
  collected: JSON.parse(localStorage.getItem('collectedProducts') || '[]'),
};

const collectedProductsSlice = createSlice({
  name: 'collectedProducts',
  initialState,
  reducers: {
    addCollected(state, action: PayloadAction<Meal>) {
      state.collected.push(action.payload);
      localStorage.setItem('collectedProducts', JSON.stringify(state.collected));
    },
    removeCollected(state, action: PayloadAction<string>) {
      state.collected = state.collected.filter(meal => meal.idMeal !== action.payload);
      localStorage.setItem('collectedProducts', JSON.stringify(state.collected));
    },
  },
});

export const { addCollected, removeCollected } = collectedProductsSlice.actions;
export default collectedProductsSlice.reducer;