import React, { useRef } from "react";
import "./NewRecipes.css";

type onAddRecipe = {
  onAddRecipe: (
    recipeTitle: string,
    recipeIngredients: string,
    recipeInstructions: string
  ) => object;
};

const NewRecipe: React.FC<onAddRecipe> = (props) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const instructionsInputRef = useRef<HTMLInputElement>(null);
  const ingredientsInputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const recipeSumbitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const recipeTitle = titleInputRef.current!.value;
    const recipeInstructions = instructionsInputRef.current!.value;
    const recipeIngredients = ingredientsInputRef.current!.value;
    const recipe = props.onAddRecipe(
      recipeTitle,
      recipeIngredients,
      recipeInstructions
    );
    if (recipe) {
      localStorage.setItem("recipe", JSON.stringify(recipe));
    }
    formRef.current!.reset();
  };

  return (
    <form ref={formRef} id="recipe-form" onSubmit={recipeSumbitHandler}>
      <div>
        <label id="new-recipe" htmlFor="new-recipe">
          New Recipe
        </label>
        Title:
        <input
          id="recipe-title"
          ref={titleInputRef}
          placeholder="Recipe Title"
          required
        />
        Indgredients (please separate with commas)
        <textarea
          id="recipe-ingredients"
          ref={ingredientsInputRef}
          placeholder="ingredient,ingredient,ingredient"
        ></textarea>
        Instructions: (please separate with commas)
        <input
          id="recipe-instructions"
          ref={instructionsInputRef}
          placeholder="1.ahihodih 2.ashdaohgih 3.ahdihogh"
          required
        />
        <button id="add-recipe" type="submit">
          Add Recipe
        </button>
      </div>
    </form>
  );
};

export default NewRecipe;
