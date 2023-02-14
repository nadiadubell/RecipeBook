import React, { useState, useRef, useEffect } from "react";
import "./Recipes.css";

type ImageMap = {
  [id: number]: any;
};

const imageMap: ImageMap = {
  0.8789811193145856: require("../pics/recipe1.jpg"),
  0.7722502051511897: require("../pics/recipe2.jpg"),
};

interface RecipeProps {
  items: {
    id: number;
    title: string;
    ingredients: string;
    instructions: string;
  }[];

  onDeleteRecipe: (id: number) => void;
  onEditRecipe: (
    id: number,
    title: string,
    ingredients: string,
    instructions: string
  ) => void;
  setNewTitle: (newTitle: string) => void;
  setNewInstructions: (newInstructions: string) => void;
  setNewIngredients: (newIngredients: string) => void;
  newTitle: string;
  newInstructions: string;
  newIngredients: string;
}

const Recipe: React.FC<RecipeProps> = (props) => {
  const {
    newTitle,
    newInstructions,
    newIngredients,
    items,
    onDeleteRecipe,
    onEditRecipe,
    setNewInstructions,
    setNewTitle,
    setNewIngredients,
  } = props;
  const [showForm, setShowForm] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<
    RecipeProps["items"][0] | null
  >(null);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const instructionsInputRef = useRef<HTMLInputElement>(null);
  const ingredientsInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (currentRecipe) {
      setNewTitle(currentRecipe.title);
      setNewInstructions(currentRecipe.instructions);
      setNewIngredients(currentRecipe.ingredients);
    }
  }, [currentRecipe, setNewTitle, setNewInstructions, setNewIngredients]);

  const recipeSumbitHandler = (id: number, event: React.FormEvent) => {
    event.preventDefault();
    const newTitle = titleInputRef.current!.value;
    const newInstructions = instructionsInputRef.current!.value;
    const newIngredients = ingredientsInputRef.current!.value;
    onEditRecipe(id, newTitle, newIngredients, newInstructions);
    setShowForm(false);
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const onInstructionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewInstructions(event.target.value);
  };

  const onIngredientsChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewIngredients(event.target.value);
  };

  return items ? (
    <div id="recipes-container">
      {items.map((recipe) => {
        return (
          <div key={recipe.id} id="recipe-container">
            <span id="recipe-info-container">
              <div id="recipe-info-pic">
                <img src={imageMap[recipe.id]} alt={recipe.title} />
              </div>
              <div id="recipe-info-text">
                <h3 id="recipe-title">{recipe.title}</h3>
                <div id="recipe-ingredients">
                  <h4>Ingredients:</h4>
                  {recipe.ingredients &&
                    recipe.ingredients.split(",").map((ingredient, index) => (
                      <ul key={index}>
                        <li id="ingredient">{ingredient}</li>
                        <br />
                      </ul>
                    ))}
                </div>
                <div id="recipe-instructions">
                  {recipe.instructions &&
                    recipe.instructions
                      .split(", ")
                      .map((instruction, index) => (
                        <div key={index}>
                          <p>{instruction}</p>
                          <br />
                        </div>
                      ))}
                </div>
              </div>
            </span>
            <span id="buttons-container">
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
            </span>
            {showForm && currentRecipe && currentRecipe.id === recipe.id ? (
              <form onSubmit={(event) => recipeSumbitHandler(recipe.id, event)}>
                Title:
                <input
                  id="recipe-title-input"
                  defaultValue={currentRecipe ? currentRecipe.title : newTitle}
                  ref={titleInputRef}
                  onChange={onTitleChange}
                />
                Ingredients: (please separate by commas)
                <textarea
                  id="recipe-ingredients-input"
                  defaultValue={
                    currentRecipe ? currentRecipe.ingredients : newIngredients
                  }
                  ref={ingredientsInputRef}
                  onChange={onIngredientsChange}
                ></textarea>
                Instructions: (please separate by commas)
                <input
                  id="recipe-instructions-input"
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
    <div>No recipes found</div>
  );
};

export default Recipe;
