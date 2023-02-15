import React, { useRef } from "react";
import "./NewRecipes.css";

type onAddRecipe = {
  onAddRecipe: (
    recipeTitle: string,
    recipeIngredients: string,
    recipeInstructions: string
  ) => void;
};

const NewRecipe: React.FC<onAddRecipe> = (props) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const instructionsInputRef = useRef<HTMLInputElement>(null);
  const ingredientsInputRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const recipeSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const recipe = {
      title: titleInputRef.current!.value,
      ingredients: ingredientsInputRef.current!.value,
      instructions: instructionsInputRef.current!.value,
    };

    props.onAddRecipe(recipe.title, recipe.ingredients, recipe.instructions);
    formRef.current!.reset();
  };

  return (
    <form ref={formRef} id="recipe-form" onSubmit={recipeSubmitHandler}>
      <label id="new-recipe" htmlFor="new-recipe">
        New Recipe
      </label>
      Title:
      <input
        id="recipe-title-input"
        ref={titleInputRef}
        placeholder="Recipe Title"
        required
      />
      Indgredients:(please separate with commas)
      <textarea
        id="recipe-ingredients-input"
        ref={ingredientsInputRef}
        placeholder="ingredient,ingredient,ingredient"
      ></textarea>
      Instructions:(please separate with commas)
      <input
        id="recipe-instructions-input"
        ref={instructionsInputRef}
        placeholder="1.ahihodih 2.ashdaohgih 3.ahdihogh"
        required
      />
      <button id="add-recipe" type="submit">
        Add Recipe
      </button>
    </form>
  );
};

export default NewRecipe;
