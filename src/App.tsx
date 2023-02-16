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
      {
        id: 1.23456789,
        title: "Avocado Toast",
        ingredients:
          "2 slices of bread, 1 ripe avocado, 1/4 teaspoon sea salt, 1/8 teaspoon black pepper, 1/4 teaspoon red pepper flakes",
        instructions:
          "1. Toast bread, 2. Cut avocado in half and remove the pit, 3. Mash avocado in a bowl and add salt black pepper and red pepper flakes, 4. Spread the mashed avocado onto the toast, 5. Serve and enjoy!",
      },
      {
        id: 0.6854932190658485,
        title: "Berry Smoothie",
        ingredients:
          "1 cup mixed berries, 1 cup almond milk, 1 banana, 1 tablespoon honey",
        instructions:
          "1. Add all ingredients to a blender, 2. Blend until smooth, 3. Pour into a glass and enjoy!",
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
