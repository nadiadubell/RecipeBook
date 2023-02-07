import React, { useState } from "react";
import Recipes from "./components/Recipes";
import NewRecipe from "./components/NewRecipe";
import { recipeList } from "./Recipe.model";
import "./App.css";

const App: React.FC = () => {
  const [newRecipes, setNewRecipes] = useState<recipeList[]>([
    {
      id: 1,
      title: "Pizza",
      instructions: `1.ahiohdhihihi 2.ahidhihihgihi 3.adiohoiihihihi`,
    },
  ]);

  const recipeAddHandler = (title: string, instructions: string) => {
    setNewRecipes((prevRecipes) => [
      ...prevRecipes,
      { id: Math.random(), title: title, instructions: instructions },
    ]);
  };

  const recipeDeleteHandler = (id: number) => {
    setNewRecipes((prevRecipes) => {
      return prevRecipes.filter((recipe) => recipe.id !== id);
    });
  };

  return (
    <div className="App">
      <h1 id="site-title">Recipe Book</h1>
      <NewRecipe onAddRecipe={recipeAddHandler} />
      <Recipes items={newRecipes} onDeleteRecipe={recipeDeleteHandler} />
    </div>
  );
};

export default App;
