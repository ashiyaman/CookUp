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

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})