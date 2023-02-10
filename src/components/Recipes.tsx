import React, { useState, useRef, useEffect } from "react";
import "./Recipes.css";

interface RecipesProps {
  items: {
    id: number;
    title: string;
    instructions: string;
  }[];

  onDeleteRecipe: (id: number) => void;
  onEditRecipe: (id: number, title: string, instructions: string) => void;
  newTitle: string;
  newInstructions: string;
  setNewTitle: (newTitle: string) => void;
  setNewInstructions: (newInstructions: string) => void;
}

const Recipe: React.FC<RecipesProps> = (props) => {
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
    RecipesProps["items"][0] | null
  >(null);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const instructionsInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentRecipe) {
      setNewTitle(currentRecipe.title);
      setNewInstructions(currentRecipe.instructions);
    }
  }, [currentRecipe, setNewTitle, setNewInstructions]);

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

  return (
    <div id="recipes-container">
      {items.map((recipe) => {
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
            {showForm ? (
              <form onSubmit={(event) => recipeSumbitHandler(recipe.id, event)}>
                Title:
                <input
                  id="recipe-title"
                  defaultValue={newTitle}
                  ref={titleInputRef}
                  onChange={onTitleChange}
                />
                Instructions: (please enter exactly as shown in the placeholder
                but You can add more steps if needed)
                <input
                  id="recipe-instructions"
                  defaultValue={newInstructions}
                  ref={instructionsInputRef}
                  onChange={onInstructionsChange}
                />
                <button id="save-button" type="submit">
                  Save
                </button>
              </form>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Recipe;
