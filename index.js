const express = require('express')
const Recipe = require('./models/recipe.models.js')
const {initializeDatabase} = require('./db/db.connect')
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
initializeDatabase()

app.get('/', (req, res) => {
    res.send('Welcome to Recipe App Server')
})

// Add new recipe to db

const createRecipe = async(newRecipe) => {
    try{
        const recipe = new Recipe(newRecipe)
        const saveNewRecipe =  await recipe.save()
        return saveNewRecipe
    }
    catch(error){
        throw error
    }
}

app.post('/recipes', async (req, res) => {
    try{
        const recipe = await createRecipe(req.body)
        if(recipe){
            res.status(200).json({message: 'New Recipe added successfully.', recipe: recipe})
        }
    }
    catch{
        res.status(500).json({error: 'Failed to add New Recipe.'})
    }
})

//Get all recipes

const readAllRecipes = async() => {
    try{
        const recipes = await Recipe.find()
        if(recipes) {
            return recipes
        }
    }
    catch(error){
        throw error
    }
}

app.get('/recipes', async (req, res) => {
    try {
        const recipes = await readAllRecipes()
        if(recipes){
            res.send(recipes)
        }
        else{
            res.status(404).json({error: 'No recipes found.'})
        }
    }
    catch{
        res.status(500).json({error: 'error while fetching Recipes.'})
    }
})

//Get recipe by its title

const readRecipeByTitle = async(recipeTitle) => {
    try{
        const recipe = await Recipe.find({title: recipeTitle})
        return recipe
    }
    catch(error){
        throw error
    }
}

app.get('/recipes/title/:recipeTitle', async (req, res) => {
    try{
        const recipe = await readRecipeByTitle(req.params.recipeTitle)
        if(recipe){
            res.send(recipe)
        }
        else{
            res.status(404).json({error: 'No recipes found.'})
        }
    }
    catch{
        res.status(500).json({error: 'Error while fetching recipes.'})
    }
})

//Get recipe by its author

const readRecipeByAuthor = async(author) => {
    try{
        const recipe = await Recipe.find({author: author})
        return recipe
    }
    catch(error){
        throw error
    }
}

app.get('/recipes/author/:recipeAuthor', async (req, res) => {
    try{
        const recipe = await readRecipeByAuthor(req.params.recipeAuthor)
        if(recipe){
            res.send(recipe)
        }
        else{
            res.status(404).json({error: 'No recipes found.'})
        }
    }
    catch{
        res.status(500).json({error: 'Error while fetching recipes.'})
    }
})

//Find recipe by id and update it value

const updateRecipe = async(recipeId, dataToUpdate) => {
    try{
        const recipe = await Recipe.findByIdAndUpdate(recipeId, dataToUpdate, {new: true})
        if(recipe){
            return recipe
        }
    }
    catch(error){
       throw error 
    }
}

app.post('/recipes/:recipeId', async (req, res) => {
    try{
        const updatedRecipe = await updateRecipe(req.params.recipeId, req.body)
        if(updatedRecipe){
            res.status(200).json({message: 'Recipe updated successfully.', recipe: updatedRecipe})
        }
        else{
            res.status(404).json({error: 'Recipe not found.'})
        }        
    }
    catch{
        res.status(500).json({error: 'Error while fetching recipe.'})
    }
})

//Find recipe by title and update it value

const updateRecipeByTitle = async(recipeTitle, dataToUpdate) => {
    try{
        console.log(recipeTitle, dataToUpdate)
        const recipe = await Recipe.findByIdAndUpdate(await readRecipeByTitle(recipeTitle), dataToUpdate, {new: true})
        if(recipe){
            return recipe
        }
    }
    catch(error){
       throw error 
    }
}

app.post('/recipes/title/:recipeTitle', async (req, res) => {
    try{
        const updatedRecipe = await updateRecipeByTitle(req.params.recipeTitle, req.body)
        console.log('...upda...', updatedRecipe)
        if(updatedRecipe){
            res.status(200).json({message: 'Recipe updated successfully.', recipe: updatedRecipe})
        }
        else{
            res.status(404).json({error: 'Recipe not found.'})
        }        
    }
    catch{
        res.status(500).json({error: 'Error while fetching recipe.'})
    }
})

//Find recipe by id and delete from db

const deleteRecipe = async(recipeId) => {
    try{
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId)
        return deletedRecipe
    }
    catch(error){
        throw error
    }
}

app.delete('/recipes/:recipeId', async(req, res) => {
    try{
        const deletedRecipe = await deleteRecipe(req.params.recipeId)
        if(deletedRecipe){
            res.status(200).json({message: 'Recipe deleted successfully', recipe: deletedRecipe})
        }
        else{
            res.status(404).json({error: 'Recipe not found'})
        }
    }
    catch{
        res.status(500).json({error: 'Error while deleting recipe'})
    }
})

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})