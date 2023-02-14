import React, { useState, useEffect } from "react";
import Recipes from "./components/Recipes";
import NewRecipe from "./components/NewRecipe";
import { recipeList } from "./Recipe.model";
import "./App.css";

const App: React.FC = () => {
  const [newRecipes, setNewRecipes] = useState<recipeList[]>(
    JSON.parse(localStorage.getItem("recipes") || "[]")
  );

  const [newRecipeTitle, setNewRecipeTitle] = useState("");
  const [newRecipeInstructs, setNewRecipeInstructs] = useState("");
  const [newRecipeIngredients, setNewRecipeIngredients] = useState("");

  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      setNewRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(newRecipes));
  }, [newRecipes]);

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
  };

  const recipeDeleteHandler = (id: number) => {
    setNewRecipes((prevRecipes) => {
      return prevRecipes.filter((recipe) => recipe.id !== id);
    });
  };

  const recipeEditHandler = (
    id: number,
    title: string,
    ingredients: string,
    instructions: string
  ) => {
    const updatedRecipes = newRecipes.map((recipe) => {
      if (recipe.id === id) {
        return { ...recipe, title, ingredients, instructions };
      }
      return recipe;
    });

    setNewRecipes(updatedRecipes);
    setNewRecipeTitle("");
    setNewRecipeInstructs("");
    setNewRecipeIngredients("");
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
        setNewIngredients={setNewRecipeIngredients}
        items={newRecipes}
        newTitle={newRecipeTitle}
        newInstructions={newRecipeInstructs}
        newIngredients={newRecipeIngredients}
      />
    </div>
  );
};

export default App;
