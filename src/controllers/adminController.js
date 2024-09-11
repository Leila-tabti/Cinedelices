import { HTTPError } from '../errors/httpError.js';
import {Recipe} from '../models/recipe.js';
import { User } from '../models/user.js';
import { MovieAndSerie } from '../models/movieAndSerie.js';

export const adminController = {

   getAllUsers: async (req, res) => {

    const users = await User.findAll();
    return res.json(users);
},
    deleteUsers: async(req, res) => {

        const user = await User.findByPk(req.params.id);
        if(!user) {
            throw new HTTPError(404, "Utilisateur non trouvé");
        }
        await user.destroy();
        return res.status(204).end();
    },

    getAllRecipes: async (req,  res) => {
        const recipes = await Recipe.findAll({
            include : ["ingredient", "recipeCategory"]
        });
        return res.json(recipes);
    },

    createRecipe: async(req, res) => {

        const recipe = await Recipe.create(req.body);
        return res.status(201).json(recipe);
    },

    editRecipe: async(req,res) => {
        const recipe = await Recipe.findByPk(req.params.id);
        if(!recipe){
            throw new HTTPError(404, "Recette non trouvée");
        }
        await recipe.update(req.body);
        return res.json(recipe);
    },

    deleteRecipe: async(req,res) => {

        const recipe = await Recipe.findByPk(req.params.id);
        if(!recipe) {
            throw new HTTPError(404, "Recette non trouvée");
        }

        await recipe.destroy();
        return res.status(204).end();
    },

    getAllMoviesAndSeriesCategory: async (req, res) => {

        const MoviesAndSeriesCategory = await MovieAndSerie.findAll({
            include: {
                association: "movieAndSerieCategory"
            }
        })
        return res.json(MoviesAndSeriesCategory);

    
    },
    editMoviesAndSeriesCategory: async (req, res) => {

    const movieAndSerie = await MovieAndSerie.findByPk(req.params.id, {

        include: {
            association: "movieAndSerieCategory"
        }
    })

    if(!movieAndSerie) {
        throw new HTTPError(404, "Categorie non trouvée");
    }

    await movieAndSerie.update(req.body);
    return res.json(movieAndSerie);
    },

    destroyMoviesAndSeriesCategory: async (req, res) => {
        const movieAndSerie = await MovieAndSerie.findByPk(req.params.id, {
            include: {
                association: "movieAndSerieCategory"
            }
        });
        if(!movieAndSerie) {
            throw new HTTPError(404, "Categorie non trouvée");
        }
        await movieAndSerie.destroy();
        return res.status(204).end();
    }
}