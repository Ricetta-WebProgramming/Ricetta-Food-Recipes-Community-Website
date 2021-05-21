<template>
  <div>
    <!-- ------------------------------------- Header ---------------------------------------------- -->
    <Navigate></Navigate>
    <br /><br />
    <!-- ------------------------------------- Name ---------------------------------------------- -->

    <div class="container border" style="border-color: #5782ba">
      <br />
      <h3 style="color: #3c7a94; font-weight: bold">
        {{ this.userInfo.displayName }}
      </h3>

      <h6 style="color: #3c7a94">{{ this.userInfo.email }}</h6>
      <br />
    </div>
    <br /><br />
    <div class="container" style="background-color: #3c7a94">
      <br />
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <!-- --------------------------------- Recipe ----------------------------------------- -->
            <h3 style="color: white">My Recipe</h3>
            <div
              id="Recipe"
              v-for="(recipe, index) in this.MyRecipe"
              :key="index"
            >
              <div class="container" style="background-color: #f8ffe3">
                <br />
                <div class="row">
                  <div class="col">
                    <router-link
                      :to="{
                        path: 'recipe',
                        name: 'Recipe',
                        params: { recipeID: recipe._id },
                      }"
                    >
                      <h5>{{ recipe.title }}</h5>

                      <img
                        @error="setAltImg"
                        class="card-img-top"
                        style="height: 8rem"
                        v-bind:src="recipe.title_img"
                        alt=""
                      />
                      <br />
                    </router-link>
                    <br />
                  </div>

                  <div class="col">
                    <br />
                    <br />
                    <router-link
                      :to="{
                        path: 'editrecipe',
                        name: 'EditRecipe',
                        params: { recipeID: recipe._id },
                      }"
                    >
                      <button class="btn btn-info">Edit</button>
                    </router-link>
                    <button
                      class="btn btn-danger"
                      @click="delRecipe(recipe._id)"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <br />
            </div>

            <!-- -------------------------------------- End Recipe------------------------------------------ -->
          </div>
          <div class="col-sm">
            <!-- --------------------------------- Like ----------------------------------------- -->
            <h3 style="color: white">My Like</h3>
            <div
              id="Like"
              v-for="(like, index) in this.MyRecipeLike"
              :key="index"
            >
              <div class="container" style="background-color: #f8ffe3">
                <br />
                <div class="row">
                  <div class="col">
                    <router-link
                      :to="{
                        path: 'recipe',
                        name: 'Recipe',
                        params: { recipeID: this.MyLike[index].recipeID },
                      }"
                    >
                      <h5>{{ like }}</h5>
                    </router-link>
                  </div>
                  <div class="col">
                    <button
                      class="btn btn-danger"
                      @click="unLikeThis(this.MyLike[index]._id)"
                    >
                      Unlike
                    </button>
                  </div>
                </div>
              </div>
              <br />
            </div>

            <!-- -------------------------------------- End Like------------------------------------------- -->
          </div>
          <div class="col-sm">
            <!-- --------------------------------- Comment ----------------------------------------- -->
            <h3 style="color: white">My Comment</h3>
            <div
              id="Comment"
              v-for="(comment, index) in this.MyRecipeComment"
              :key="index"
            >
              <div class="container" style="background-color: #f8ffe3">
                <br />
                <div class="row">
                  <div class="col">
                    <router-link
                      :to="{
                        path: 'recipe',
                        name: 'Recipe',
                        params: { recipeID: this.MyComment[index].recipeID },
                      }"
                    >
                      <h5>{{ comment }}</h5>
                    </router-link>
                    <h6>{{ this.MyComment[index].text }}</h6>
                  </div>
                  <div class="col">
                    <button
                      class="btn btn-danger"
                      @click="delComment(this.MyComment[index]._id)"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
              <br />
            </div>

            <!-- -------------------------------------- End Comment ------------------------------------------ -->
          </div>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import Navigate from "./Navigate.vue";
export default {
  name: "Profile",
  components: { Navigate },
  data() {
    return {
      MyRecipe: [],
      MyLike: [],
      MyComment: [],
      MyRecipeLike: [],
      MyRecipeComment: [],

      userInfo: {
        userID: "",
        displayName: "",
        email: "",
      },
    };
  },
  mounted() {
    //Read Data this user (who login) using Firebase AUtentication
    this.userInfo.userID = firebase.auth().currentUser.uid;
    this.userInfo.displayName = firebase.auth().currentUser.displayName;
    this.userInfo.email = firebase.auth().currentUser.email;
    // console.log(this.userInfo.userID);
    //----------------- get Recipe -------------------------
    axios
      .get("https://young-basin-17632.herokuapp.com/recipe/show/user/" + this.userInfo.userID)
      .then((response) => {
        this.MyRecipe = response.data;

        //  console.log(this.MyRecipe);
      })
      .catch((error) => {
        console.log(error);
      });

    //----------------- get Like -------------------------
    axios
      .get("https://young-basin-17632.herokuapp.com/like/show/user/" + this.userInfo.userID)
      .then((response) => {
        //  console.log(response.data);
        this.MyLike = response.data;
        for (var i = 0; i < this.MyLike.length; i++) {
          // console.log(this.MyLike[i].recipeID)
          axios
            .get(
              "https://young-basin-17632.herokuapp.com/recipe/show/id/" + this.MyLike[i].recipeID
            )
            .then((response) => {
              //  console.log(response.data.title);
              this.MyRecipeLike.push(response.data.title);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    //----------------- get Comment -------------------------
    axios
      .get("https://young-basin-17632.herokuapp.com/comment/show/user/" + this.userInfo.userID)
      .then((response) => {
        //   console.log(response.data);
        this.MyComment = response.data;
        for (var i = 0; i < this.MyComment.length; i++) {
          // console.log(this.MyLike[i].recipeID)
          axios
            .get(
              "https://young-basin-17632.herokuapp.com/recipe/show/id/" +
                this.MyComment[i].recipeID
            )
            .then((response) => {
              //  console.log(response.data.title);
              this.MyRecipeComment.push(response.data.title);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    // Delete Recipe Method
    delRecipe(recipeID) {
      if (confirm("Are you sure you want to delete this recipe?")) {
        axios
          .delete("https://young-basin-17632.herokuapp.com/recipe/delete/" + recipeID)
          .then(() => {
            console.log("Delete recipeId: " + recipeID);
          })
          .catch((error) => {
            console.log(error);
          });
        window.location.reload();
      } else {
      }
    },
    // Delete Like (== Unlike) Method
    unLikeThis(likeID) {
      if (confirm("Are you sure you want to unlike?")) {
        axios
          .delete("https://young-basin-17632.herokuapp.com/like/delete/" + likeID)
          .then(() => {
            console.log("Delete likeId: " + likeID);
          })
          .catch((error) => {
            console.log(error);
          });
        window.location.reload();
      } else {
      }
    },
    // Delete Comment Method
    delComment(commentID) {
      if (confirm("Are you sure you want to delete comment?")) {
        axios
          .delete("https://young-basin-17632.herokuapp.com/comment/delete/" + commentID)
          .then(() => {
            console.log("Delete commentId: " + commentID);
          })
          .catch((error) => {
            console.log(error);
          });
        window.location.reload();
      } else {
      }
    },
    setAltImg(event) {
      //"./src/assets/image.png" for Localhost
      event.target.src = "https://semantic-ui.com/images/wireframe/image.png";
    },
  },
};
</script>
