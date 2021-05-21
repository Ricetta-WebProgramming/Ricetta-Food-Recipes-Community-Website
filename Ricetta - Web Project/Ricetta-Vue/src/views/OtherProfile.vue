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
              v-for="(recipe, index) in this.Recipe"
              :key="index"
            >
              <div class="container" style="background-color: #f8ffe3">
                <br />

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
                    style="height: 8rem; width: 8rem"
                    v-bind:src="recipe.title_img"
                    alt=""
                  />
                  <br />
                </router-link>
                <br />
              </div>
              <br />
            </div>

            <!-- -------------------------------------- End Recipe------------------------------------------ -->
          </div>
        </div>
      </div>
    </div>
    <br />
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
      Recipe: [],

      userInfo: {
        userID: "",
        displayName: "",
      },
    };
  },
  mounted() {
    // Read User Data from request's params
    this.userInfo.userID = this.$route.params.userID;
    this.userInfo.displayName = this.$route.params.userName;
    // Read data from userdata
    axios
      .get(
        "https://young-basin-17632.herokuapp.com/recipe/show/user/" + this.$route.params.userID
      )
      .then((response) => {
        console.log(response.data);
        this.Recipe = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    setAltImg(event) {
      //"./src/assets/image.png" for Localhost
      event.target.src = "https://semantic-ui.com/images/wireframe/image.png";
    },
  },
};
</script>
