'use strict'
module.exports = function(app){
    var recipeList = require('../controllers/recipeController')

//----------------------------- Recipe --------------------------------------

// get All Recipe data
    app.route('/recipe/show/all')
        .get(recipeList.listAllRecipe)

// get one Recipe data
    app.route('/recipe/show/id/:recipeID')
        .get(recipeList.listARecipe)

// get All Recipe data by Most Like
    app.route('/recipe/show/mostlike')
        .get(recipeList.listPopularRecipe)   

// get All Recipe data by Newly 
    app.route('/recipe/show/newly')
        .get(recipeList.listNewRecipe)   
// get All Recipe data by Tag (Type)    
    app.route('/recipe/show/tag/:tagQuery')
        .get(recipeList.listTagRecipe)   
// get All Recipe data by UserID     
    app.route('/recipe/show/user/:userID')
        .get(recipeList.listUserRecipe)   


    app.route('/recipe/add')
        .post(recipeList.createNewRecipe)
    
    app.route('/recipe/edit/:recipeID')
        .post(recipeList.editARecipe)
    
    app.route('/recipe/delete/:recipeID')
        .delete(recipeList.deleteARecipe)
    
//----------------------------- Comment (Not Editable!) --------------------------------------
// get All comment by Recipe ID  --- จริงๆ ดึงจาก Recipe ได้อยู่แล้ว มีเผื่อไว้เฉยๆ ไม่ต้องใช้ก็ได้
    app.route('/comment/show/recipe/:recipeID')
        .get(recipeList.listAllComment)
// get All comment by User ID  
    app.route('/comment/show/user/:userID')
        .get(recipeList.listAllUserComment)

// Add new Comment  
    app.route('/comment/add')
        .post(recipeList.createNewComment)


 // Delete a Comment     
    app.route('/comment/delete/:commentID')
        .delete(recipeList.deleteAComment)       






//----------------------------- Likes  --------------------------------------

// get All like by User ID  
app.route('/like/show/user/:userID')
.get(recipeList.listAllUserLike)

// Add new Like  
app.route('/like/add')
.post(recipeList.createNewLike)


// Delete a like     
app.route('/like/delete/:LikeID')
.delete(recipeList.deleteALike)       

}