import "./App.css";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { Route, Routes } from 'react-router-dom';
import { MealPage } from "./pages/MealPage";
import { CollectedMeals } from "./pages/CollectedMeals";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meal/:id" element={<MealPage />} />
        <Route path="/collection" element={<CollectedMeals />} />
      </Routes>
    </div>
  )
}

export default App;
