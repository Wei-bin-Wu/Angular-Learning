import {Recipe} from "./recipe.model";
import {EventEmitter} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('TestRecipe1','test description',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
      [
        new Ingredient('Meat',1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('TestRecipe2','test description',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
      [
        new Ingredient('Buns',1),
        new Ingredient('Meat',1)
      ])
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
