'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var RecipeSchema = new Schema({
    title: {
        type: String,
        Required: 'Recipe Titile'
    },

    owner:{
        type: String,
        Required: 'User ID'  
        // From Firebase
    },
    owner_displayName:{
        type: String,
        Requied : "User Name"
    }
    
    ,
    description: {
        type: String
    },
    serving: {
        type: Number,
        Required: 'Number of Serving'
    },
    tag: {
        type: [String]
        // Type of Food
    },

    createdDate: {
        type: Date,
        default: Date.now
    },
    cookTime:{
        type: Number,
        Required: 'Cooking Time in Minute'

    },
    ingredients:{
        type: [String],
        Required: 'Ingredients in Array'

    },

    instructions:{
        type:[String],
        Required: 'Instructions in Array'
    },
    title_img:{
        type: String,
        default: 'image.png'

    },

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
      }],
    numberOfLike :{
        type: Number,
        default: 0
    }

})

var CommentSchema = new Schema({
    userID :{
        type: String,
        Required: 'Owner of comment'
    },
    user_displayName:{
        type: String,
        Requied : "User Name"
    },
    text :{
        type: String,
        Required: 'Detail od comment'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    recipeID: {
        type: String,
        Required: 'Recipe that this Comment'
    }
})

var LikeSchema = new Schema({
    userID :{
        type: String,
        Required: 'Owner of Like'
    },
    user_displayName:{
        type: String,
        Requied : "User Name"
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    recipeID: {
        type: String,
        Required: 'Recipe that this Like'
    },
})

LikeSchema.index({ "userID": 1, "recipeID": 1}, { "unique":[ true ,"User already liked"]});



module.exports = mongoose.model('Recipes', RecipeSchema)
module.exports = mongoose.model('Comments',CommentSchema)
module.exports = mongoose.model('Likes',LikeSchema)


// module.exports = mongoose.model('User',UserSchema)