import React, { useState, useRef, useEffect } from "react";
import { recipeList } from "../Recipe.model";
import "./Recipes.css";

interface RecipeProps {
  items: {
    id: number;
    title: string;
    ingredients: string;
    instructions: string;
  }[];

  onDeleteRecipe: (id: number) => void;
  onEditRecipe: (id: number, title: string, instructions: string) => void;
  setNewTitle: (newTitle: string) => void;
  setNewInstructions: (newInstructions: string) => void;
  setItems: (value: recipeList[]) => void;
  newTitle: string;
  newInstructions: string;
}

const Recipe: React.FC<RecipeProps> = (props) => {
  const {
    newTitle,
    newInstructions,
    items,
    onDeleteRecipe,
    onEditRecipe,
    setNewInstructions,
    setNewTitle,
  } = props;
  const [showForm, setShowForm] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<
    RecipeProps["items"][0] | null
  >(null);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const instructionsInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentRecipe) {
      setNewTitle(currentRecipe.title);
      setNewInstructions(currentRecipe.instructions);
    }
  }, [currentRecipe, setNewTitle, setNewInstructions]);

  useEffect(() => {
    localStorage.setItem("recipe", JSON.stringify(items));
  }, [items]);

  const recipeSumbitHandler = (id: number, event: React.FormEvent) => {
    event.preventDefault();
    const newTitle = titleInputRef.current!.value;
    const newInstructions = instructionsInputRef.current!.value;
    onEditRecipe(id, newTitle, newInstructions);
    setShowForm(false);
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const onInstructionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewInstructions(event.target.value);
  };

  return items.length ? (
    <div id="recipes-container">
      {items.map((recipe) => {
        return (
          <div key={recipe.id}>
            <span>
              <h3 id="recipe-title">{recipe.title}</h3>
              <div id="recipe-ingredients">
                <h4>Ingredients:</h4>
                {recipe.ingredients.split(",").map((ingredient, index) => (
                  <ul key={index}>
                    <li id="ingredient">{ingredient}</li>
                    <br />
                  </ul>
                ))}
              </div>
              <div id="recipe-instructions">
                {recipe.instructions.split(", ").map((instruction, index) => (
                  <div key={index}>
                    <p>{instruction}</p>
                    <br />
                  </div>
                ))}
              </div>
            </span>
            <button
              id="delete-recipe"
              onClick={onDeleteRecipe.bind(null, recipe.id)}
            >
              Delete
            </button>
            <button
              id="edit-recipe"
              onClick={() => {
                setCurrentRecipe(recipe);
                setShowForm(true);
              }}
            >
              Edit
            </button>
            {showForm && currentRecipe && currentRecipe.id === recipe.id ? (
              <form onSubmit={(event) => recipeSumbitHandler(recipe.id, event)}>
                Title:
                <input
                  id="recipe-title"
                  defaultValue={currentRecipe ? currentRecipe.title : newTitle}
                  ref={titleInputRef}
                  onChange={onTitleChange}
                />
                Instructions: (please enter exactly as shown in the placeholder
                but You can add more steps if needed)
                <input
                  id="recipe-instructions"
                  defaultValue={
                    currentRecipe ? currentRecipe.instructions : newInstructions
                  }
                  ref={instructionsInputRef}
                  onChange={onInstructionsChange}
                />
                <button id="save-button" type="submit">
                  Save
                </button>
                <button
                  id="cancel-button"
                  onClick={(event) => {
                    event.preventDefault();
                    setShowForm(false);
                  }}
                >
                  Cancel
                </button>
              </form>
            ) : null}
          </div>
        );
      })}
    </div>
  ) : (
    <div id="recipes-container">
      <h3>No Recipes Found</h3>
    </div>
  );
};

export default Recipe;
