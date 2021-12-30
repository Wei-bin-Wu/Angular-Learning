import {Injectable} from "@angular/core";
import {Recipe} from "./recipe.model";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {DataStorageService} from "../shared/data-storage.service";
import {Observable} from "rxjs";
import {RecipeService} from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService,
              private recipesService: RecipeService) {}

  // to ensure that page is loading when data is there
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    // check what ever we do have recipes only fetch new one if we don't
    // to allow editing recipes and save it locally
    const recipes = this.recipesService.getRecipes();

    if (recipes.length === 0){
      return this.dataStorageService.fetchRecipes(); // resolve method automatically subscribe if the object if found
    } else {
      return recipes;
    }
  }
}
