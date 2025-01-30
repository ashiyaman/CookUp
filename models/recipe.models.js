const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,
            enum: ['Easy', 'Intermediate', 'Difficult']
        },
        prepTime: {
            type: Number,
            required: true
        },
        cookTime: {
            type: Number,
            required: true
        },
        ingredients: {
            type: [Strings],
            required: true
        },
        instructions: {
            type: [Strings],
            required: true
        },
        imageUrl: String
    },
    {timestamps: true}
)

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe