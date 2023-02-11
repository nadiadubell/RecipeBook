import React, { useState } from "react";
import Recipes from "./components/Recipes";
import NewRecipe from "./components/NewRecipe";
import { recipeList } from "./Recipe.model";
import "./App.css";

const App: React.FC = () => {
  const [newRecipes, setNewRecipes] = useState<recipeList[]>([]);

  const [newRecipeTitle, setNewRecipeTitle] = useState("");
  const [newRecipeInstructs, setNewRecipeInstructs] = useState("");

  const recipeAddHandler = (
    title: string,
    ingredients: string,
    instructions: string
  ) => {
    setNewRecipes((prevRecipes) => [
      ...prevRecipes,
      {
        id: Math.random(),
        title: title,
        ingredients: ingredients,
        instructions: instructions,
      },
    ]);
    return [...newRecipes];
  };

  const recipeDeleteHandler = (id: number) => {
    setNewRecipes((prevRecipes) => {
      return prevRecipes.filter((recipe) => recipe.id !== id);
    });
  };

  const recipeEditHandler = (
    id: number,
    title: string,
    instructions: string
  ) => {
    const updatedRecipes = newRecipes.map((recipe) => {
      if (recipe.id === id) {
        return { ...recipe, title, instructions };
      }
      return recipe;
    });

    setNewRecipes(updatedRecipes);
    setNewRecipeTitle("");
    setNewRecipeInstructs("");
  };

  return (
    <div className="App">
      <h1 id="site-title">Recipe Book</h1>
      <NewRecipe onAddRecipe={recipeAddHandler} />
      <Recipes
        onDeleteRecipe={recipeDeleteHandler}
        onEditRecipe={recipeEditHandler}
        setNewTitle={setNewRecipeTitle}
        setNewInstructions={setNewRecipeInstructs}
        setItems={setNewRecipes}
        items={newRecipes}
        newTitle={newRecipeTitle}
        newInstructions={newRecipeInstructs}
      />
    </div>
  );
};

export default App;
