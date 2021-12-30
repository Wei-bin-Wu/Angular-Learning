import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipes/recipe.model";
import {RecipeService} from "../recipes/recipe.service";
import {map, tap} from "rxjs/operators";


@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http:HttpClient,
              private recipeService: RecipeService) {}

  // one way
  // storeRecipes(recipes: Recipe[]){}

  // another way recipe service
  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://angularcourse-1c491-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes(){
    return this.http
      .get<Recipe[]>(
      'https://angularcourse-1c491-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
      .pipe(map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}; // to fix bug when ingredients are empty
         });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
