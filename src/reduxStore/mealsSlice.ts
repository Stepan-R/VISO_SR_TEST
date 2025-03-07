import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Meal } from '../interfaces/Interfaces';

export const searchMeals = createAsyncThunk('meals/searchMeals', async (searchTerm: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
  const data = await response.json();
  return data.meals || [];
});

const fetchMealsByLetter = async (letter: string) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
  const data = await response.json();
  return data.meals || [];
};

export const fetchAllMeals = createAsyncThunk('meals/fetchAllMeals', async () => {
  const allMeals = [];
  const letters = 'abcdefghijklmnopqrstuvwxyz';

  for (const letter of letters) {
    const meals = await fetchMealsByLetter(letter);
    allMeals.push(...meals);
  }

  return allMeals;
});

export interface MealsState {
  meals: Meal[];
  filteredMeals: Meal[];
  selectedCategory: string | null;
  loading: boolean;
  error: string | null | undefined;
}

const mealsSlice = createSlice({
  name: 'meals',
  initialState: {
    meals: [],
    filteredMeals: [],
    selectedCategory: null,
    loading: false,
    error: null as string | null | undefined,
  } as MealsState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
      if (action.payload) {
        state.filteredMeals = state.meals.filter(meal => meal.strCategory === action.payload);
      } else {
        state.filteredMeals = state.meals;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.meals = action.payload;
        state.filteredMeals = action.payload;
      })
      .addCase(fetchAllMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchMeals.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchMeals.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredMeals = action.payload;
      })
      .addCase(searchMeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCategory } = mealsSlice.actions;
export default mealsSlice.reducer;