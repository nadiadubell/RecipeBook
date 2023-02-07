import React from "react";
import "./Recipes.css";

interface recipesList {
  items: {
    id: number;
    title: string;
    instructions: string;
  }[];

  onDeleteRecipe: (id: number) => void;
}

const Recipe: React.FC<recipesList> = (props) => {
  return (
    <div id="recipes-container">
      {props.items.map((recipe) => {
        return (
          <div key={recipe.id}>
            <span>
              <h3 id="recipe-title">{recipe.title}</h3>
              <div id="recipe-instructions">
                {recipe.instructions.split(" ").map((instruction, index) => (
                  <p key={index}>
                    {instruction}
                    <br />
                  </p>
                ))}
              </div>
            </span>
            <button
              id="delete-recipe"
              onClick={props.onDeleteRecipe.bind(null, recipe.id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Recipe;
