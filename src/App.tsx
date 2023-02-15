import React, { useState } from "react";
import Recipes from "./components/Recipes";
import NewRecipe from "./components/NewRecipe";
import { recipeList } from "./Recipe.model";
import "./App.css";

const App: React.FC = () => {
  const [newRecipes, setNewRecipes] = useState<recipeList[]>(
    // JSON.parse(localStorage.getItem("recipes") || "[]")
    [
      {
        id: 0.8789811193145856,
        title: "Hummus",
        ingredients:
          "one 15-ounce can chickpeas (drained and rinsed), 2 cloves garlic (smashed), juice of 1 lemon, sea salt and pepper to taste",
        instructions:
          "1.put ingredients in a food processor, 2.blend until smooth, 3.enjoy with your favorite veggies!",
      },
    ]
  );

  const [newRecipeTitle, setNewRecipeTitle] = useState("");
  const [newRecipeInstructs, setNewRecipeInstructs] = useState("");
  const [newRecipeIngredients, setNewRecipeIngredients] = useState("");

  // useEffect(() => {
  //   const storedRecipes = localStorage.getItem("recipes");
  //   if (storedRecipes) {
  //     setNewRecipes(JSON.parse(storedRecipes));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("recipes", JSON.stringify(newRecipes));
  // }, [newRecipes]);

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
