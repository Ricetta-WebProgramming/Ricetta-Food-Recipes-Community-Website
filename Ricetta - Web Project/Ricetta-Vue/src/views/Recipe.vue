<template>
  <div class="Recipe">
    <!-- -------------------- Header ----------------------------- -->
    <Navigate></Navigate>
    <br />
    <!-- -------------------- Content1 ----------------------------- -->

    <div class="container" style="background-color: #def5ff">
      <br />
      <!-- -------------------- Title ----------------------------- -->

      <h1 style="color:#3C7A94 font-weight: bold;">{{ this.Recipe.title }}</h1>
      <img
        class="recipeTitleImg"
        v-bind:src="this.Recipe.title_img"
        alt="Title Picture"
      />
      <br /><br />
      <!-- -------------------- Description ----------------------------- -->

      <h5 style="text-align: justify">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ this.Recipe.description }}
      </h5>
      <h4 style="text-align: right">
        {{ this.Recipe.serving }} Servings<img
          class="icons"
          style="width: 60px"
          src="/src/assets/serving.png"
          alt=""
        />
      </h4>
      <h4 style="text-align: right">
        {{ this.Recipe.cookTime }} Mins<img
          class="icons"
          style="width: 50px"
          src="/src/assets/clock.png"
          alt=""
        />
      </h4>
      <!-- -------------------- Tag ----------------------------- -->

      <ul style="text-align: left" id="Tag">
        <div v-for="(myTag, index) in this.Recipe.tag" :key="index">
          <img class="icons" src="/src/assets/tag.png" alt="" /><button
            class="btn"
            style="border-radius: 25px; border-color: #397b95; color: #397b95"
          >
            {{ myTag }}
          </button>
        </div>
      </ul>
      <br />

      <!-- -------------------- Like Button ----------------------------- -->

      <img
        class="icons btn"
        src="/src/assets/like.png"
        style="background-color: #f3fcff; width: 70px"
        alt=""
        @click="likeThis"
      />
      <br /><br />

      <br /><br />
    </div>
    <br />
    <!-- -------------------------------------Creator ----------------------------------------------- -->
    <div class="container" style="background-color: #def5ff; text-align: left">
      <br />

      <h4 style="color: #397893; font-weight: bold">
        Creator : {{ this.Recipe.owner_displayName }}
      </h4>
      <h6 style="color: #397893; font-weight: bold">
        {{ this.Recipe.createdDate }}
      </h6>
         	<template v-if="this.Recipe.owner_displayName"> 

      <router-link
        :to="{
          path: '/userprofile',
          name: 'OtherProfile',
          params: {
            userName: this.Recipe.owner_displayName,
            userID: this.Recipe.owner,
          },
        }"
      >
        <button
          class="btn"
          style="
            background-color: #ff9100;
            color: white;
            font-weight: bold;
            border-radius: 25px;
          "
        >
          &nbsp;&nbsp;&nbsp;See More&nbsp;&nbsp;&nbsp;
        </button>
      </router-link>
      	</template> 

      <h6 style="color: #397893; font-weight: bold; text-align: right">
        <img class="icons" src="/src/assets/like.png" alt="" />
        {{ this.Recipe.numberOfLike }}
      </h6>

      <br />
    </div>
    <br />
    <!-- -----------------------------------Ingredient + Instruction------------------------------------------------- -->
    <div class="container" style="background-color: #def5ff; text-align: left">
      <br />
      <h3>Ingredients</h3>
      <ul id="Ingredient">
        <li
          style="text-align: left"
          v-for="(myIngredient, index) in this.Recipe.ingredients"
          :key="index"
        >
          {{ myIngredient }}
        </li>
      </ul>
      <br />
      <h3>Instructions</h3>
      <ul id="Instruction">
        <li
          style="text-align: left"
          v-for="(myInstruction, index) in this.Recipe.instructions"
          :key="index"
        >
          {{ myInstruction }}
        </li>
      </ul>

      <br />
    </div>
    <br />
    <!-- ----------------------------------------Comment-------------------------------------------- -->
    <div class="container" style="background-color: #def5ff">
      <br />
      <h3 style="text-align: left">
        <img
          class="icons"
          style="width: 60px"
          src="/src/assets/comment.png"
          alt=""
        />Comment
      </h3>
      <div class="form-group" style="text-align: left">
        <label for="FormControlTextarea1">Give encouragement to creator</label>
        <textarea
          style="border-radius: 25px"
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          v-model="commentData.text"
          placeholder="Write a comment..."
        ></textarea>
      </div>
      <button
        class="btn"
        style="
          background-color: #ff9100;
          color: white;
          font-weight: bold;
          border-radius: 25px;
        "
        @click="sendComment"
      >
        &nbsp;&nbsp;&nbsp;Send&nbsp;&nbsp;&nbsp;
      </button>
      <br /><br />
    </div>
    <br />
    <!-- ------------------------------------ Show Comment ---------------------------------- -->
    <div class="container" style="background-color: #def5ff">
      <br />
      <div v-for="(comment, index) in this.Comments" :key="index">
        <div
          class="container"
          style="background-color: white; text-align: left"
        >
          <br />
                   	<template v-if="comment.user_displayName"> 

          <router-link :to = "{path: '/userprofile/:userName/:userID',name:'OtherProfile',params:{userName:comment.user_displayName, userID:comment.userID}}">

          <h4 style="color: #397893; font-weight: bold">
            {{ comment.user_displayName }}
          </h4>
          </router-link>        
                     </template>
          <h6 style="color: #397893">
            &nbsp;&nbsp;&nbsp;&nbsp;{{ comment.text }}
          </h6>

          <br />
          <p style="color: #c2c6c8; font-size: 10px">
            Date :{{ comment.createdDate }}
          </p>
          <br />
        </div>
        <br />
      </div>
    </div>
    <br /><br />

    <br />
  </div>
</template>
<script>
import axios from "axios";
import firebase from "firebase";
import Navigate from "./Navigate.vue";
export default {
  name: "Recipe",
  components: { Navigate },
  data() {
    return {
      Recipe: {},
      Comments: [],
      recipeID: this.$route.params.recipeID,
      commentData: {
        userID: "",
        user_displayName: "",
        text: "",
        recipeID: "",
      },
    };
  },
  methods: {
    // Create Comment to Database and reload this page
    sendComment() {
      let newComment = {
        userID: firebase.auth().currentUser.uid,
        user_displayName: firebase.auth().currentUser.displayName,
        text: this.commentData.text,
        recipeID: this.$route.params.recipeID,
      };
  if(newComment.text!=""){
      axios
        .post("https://young-basin-17632.herokuapp.com/comment/add", newComment)
        .then((response) => {
          console.log(response.data);
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
  }
  else{alert("Please fill a text area")}
    },

    // Like method -> Increase and add like data to Database -> reload for update page
    likeThis() {
      let newLike = {
        userID: firebase.auth().currentUser.uid,
        user_displayName: firebase.auth().currentUser.displayName,
        recipeID: this.$route.params.recipeID,
      };

      axios
        .post("https://young-basin-17632.herokuapp.com/like/add", newLike)
        .then((response) => {
          console.log(response.data);
          // ห้ามมีการ like ซ้ำ (โดยการดีเทคจาก error key ซ้ำ (key = recipeID & userID))
          if (response.data.err.code == "11000") {
            alert("You cannot like this again.");
          }
          else{
          location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    // Show data using recipeID -> show recipe detail and comment
    // Read Recipe
    axios
      .get(
        "https://young-basin-17632.herokuapp.com/recipe/show/id/" + this.$route.params.recipeID
      )
      .then((response) => {
        //console.log(response.data)
        this.Recipe = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  //Read Comment
    axios
      .get(
        "https://young-basin-17632.herokuapp.com/comment/show/recipe/" +
          this.$route.params.recipeID
      )
      .then((response) => {
        //console.log(response.data)
        this.Comments = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

