import React, { useRef } from "react";
import "./NewRecipes.css";

type onAddRecipe = {
  onAddRecipe: (recipeTitle: string, recipeInstructions: string) => void;
};

const NewRecipe: React.FC<onAddRecipe> = (props) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const instructionsInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const recipeSumbitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    let recipeTitle = titleInputRef.current!.value;
    let recipeInstructions = instructionsInputRef.current!.value;
    props.onAddRecipe(recipeTitle, recipeInstructions);
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
        Instructions: (please enter exactly as shown in the placeholder but You
        can add more steps if needed)
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
