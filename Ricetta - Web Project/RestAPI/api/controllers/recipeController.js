'use strict'
var mongoose = require('mongoose')
Recipe = mongoose.model('Recipes')
Comments = mongoose.model('Comments')
Like = mongoose.model('Likes')

// User = mongoose.model('User')

// ------------------------------------------------------------------------
exports.listAllRecipe = function(req, res){
    var query = {
        sort: {
            _id: 1
        }
    }
    Recipe.find({}, null, query, function (err, recipe) {
        if (err) throw err
       // console.log(object)
        res.json(recipe)
    })
}
// ------------------------------------------------------------------------
exports.listARecipe = function(req, res){
    Recipe.findById(req.params.recipeID, function (err,recipe) {
        if (err) throw err
        //console.log(object)
        res.json(recipe)
    })
}
// ------------------------------------------------------------------------
exports.listPopularRecipe = function(req, res){
    var query = {
        sort: {
            numberOfLike: -1
        }
    }
    Recipe.find({}, null, query, function (err, recipe) {
        if (err) throw err
       // console.log(object)
        res.json(recipe)
    })
}
// ------------------------------------------------------------------------
exports.listNewRecipe = function(req, res){
    var query = {
        sort: {
            createdDate: -1
        }
    }
    Recipe.find({}, null, query, function (err, recipe) {
        if (err) throw err
       // console.log(object)
        res.json(recipe)
    })
}
// ------------------------------------------------------------------------
exports.listTagRecipe = function(req, res){

    Recipe.find({'tag':req.params.tagQuery}, function (err, recipe) {
        if (err) throw err
       // console.log(object)
        res.json(recipe)
    })
}

// ------------------------------------------------------------------------
exports.listUserRecipe = function(req, res){

    Recipe.find({'owner':req.params.userID}, function (err, recipe) {
        if (err) throw err
       // console.log(object)
        res.json(recipe)
    })
}

// ------------------------------------------------------------------------
exports.createNewRecipe = function (req, res) {
    var newRecipe = new Recipe(req.body)

    newRecipe.save(function (err, recipe) {
        if (err) throw err
        res.json(recipe)
    })
}

exports.editARecipe = function (req, res) {
    console.log(req.params.recipeId)
    var newRecipe = {}
    newRecipe = req.body
    console.log(newRecipe)
    Recipe.findByIdAndUpdate(req.params.recipeID, newRecipe, {
        new: true
    }, function (err, recipe) {
        if (err) throw err
        console.log(recipe)
        res.json(recipe)
    })
}


exports.deleteARecipe = function (req, res) {
    //console.log(req.params.userId)
    Recipe.findByIdAndRemove(req.params.recipeID, function (err, recipe) {
        if (err) throw err
        const response = {
            message: "Delete recipe id: " + req.params.recipeID + " successfully",
            id: recipe._id,
    
        }
        res.json(response)
        // Comments.deleteMany({_id: commentRemove})
        // Like.deleteMany({_id: likeRemove})


    })
}


//--------------------------------- Comment ---------------------------------------------------------------------
exports.listAllComment = function(req, res){

    Comments.find({'recipeID':req.params.recipeID}, null, {sort:{createdDate:-1}}, function (err, comment) {
        if (err) throw err
       // console.log(object)
        res.json(comment)
    })
}
//----------------------------------------------------------------------------------
exports.listAllUserComment = function(req, res){

    Comments.find({'userID':req.params.userID}, function (err, comment) {
        if (err) throw err
       // console.log(object)
        res.json(comment)
    })
}
//----------------------------------------------------------------------------------
exports.createNewComment = function (req, res) {
    var newComment = new Comments(req.body)
    

    newComment.save(function (err, comment) {
        if (err) throw err
        res.json(comment)
        // console.log(comment._id)
        Recipe.findByIdAndUpdate(
            comment.recipeID,
            {$push: {"comments": comment}},
            {safe: true, upsert: true},
            function(err, model) {
                //console.log(model);
            }
        );

    })



}


exports.deleteAComment = function (req, res) {
    //console.log(req.params.userId)
    Comments.findByIdAndRemove(req.params.commentID, function (err, del_comment) {
        if (err) throw err
        const response = {
            message: "Delete recipe id: " + req.params.commentID + " successfully",
            id: del_comment._id,
            recipeID: del_comment.recipeID
        }
        res.json(response)
        Recipe.findByIdAndUpdate(
            response.recipeID,
            {$pull: {"comments": response.id}},
            {safe: true, upsert: true},
            function(err, model) {
                //console.log(model);
            }
        );
    })
}




//--------------------------------- Like ---------------------------------------------------------------------

exports.listAllUserLike = function(req, res){

    Like.find({'userID':req.params.userID}, function (err, like) {
        if (err) throw err
       // console.log(object)
        res.json(like)
    })
}
//----------------------------------------------------------------------------------
exports.createNewLike = function (req, res) {
    var newLike = new Like(req.body)
    

    newLike.save(function (err, like) {

        if (err) {
           // console.log("Error code is "+err.code)
           if(err.code==11000)  res.send({ err });
           else throw err}
           else{
        res.json(like)
        // console.log(comment._id)
        Recipe.findByIdAndUpdate(
            like.recipeID,
           { 
            "$push": {"likes": like},
           "$inc": { "numberOfLike": 1 } },
            {safe: true, upsert: true},
            function(err, model) {
                //console.log(model);
            }
        );
        }
    })



}


exports.deleteALike = function (req, res) {
    //console.log(req.params.userId)
    Like.findByIdAndRemove(req.params.LikeID, function (err, del_like) {
        if (err) throw err
        const response = {
            message: "Delete recipe id: " + req.params.LikeID + " successfully",
            id: del_like._id,
            recipeID: del_like.recipeID
        }
        res.json(response)
        Recipe.findByIdAndUpdate(
            response.recipeID,
            { 
                "$pull": {"likes": response.id},
               "$inc": { "numberOfLike": -1 } },
            {safe: true, upsert: true},
            function(err, model) {
                //console.log(model);
            }
        );
    })
}

