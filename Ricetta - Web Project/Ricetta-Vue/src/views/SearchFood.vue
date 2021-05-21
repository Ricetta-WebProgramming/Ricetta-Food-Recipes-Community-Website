<template>
  <div>
    <Navigate></Navigate>

    <div class="container">
      <br />
      <h1>Search <span class="badge badge-info">Recipe</span></h1>
      <br />
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <!-- --------------------------------  Search Bar -------------------------------------- -->
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Search for..."
                v-model="search"
              />
              <span class="input-group-btn">
                &nbsp;&nbsp;<button class="btn btn-info" type="button">
                  <span
                    class="glyphicon glyphicon-search"
                    aria-hidden="true"
                  ></span>
                  Search
                </button>
              </span>
            </div>
            <!-- /input-group -->
          </div>
          <!-- /.col-lg-6 -->
        </div>
        <!-- /.row -->
      </div>
      <br />
      <!-- --------------------------------  Result -> Recipe Card Display -------------------------------------- -->
      <!-- All card food -->
      <div class="container">
        <div class="card-deck">
          <div v-for="recipe_alias in filterRecipes" v-bind:key="recipe_alias">
            <div class="card" style="width: 21rem">
              <!-- Picture Food -->
              <img
                class="card-img-top"
                v-bind:src="recipe_alias.title_img"
                alt="Card image cap"
                @error="setAltImg"
              />
              <!-- Data of Food -->
              <div class="card-body">
                <h5 class="card-title">
                  {{ recipe_alias.title
                  }}<!-- Topic of food -->
                </h5>
                <!-- Description of Food -->
                <p class="card-text">
                  <router-link
                    :to="{
                      path: '/userprofile/:userName/:userID',
                      name: 'OtherProfile',
                      params: {
                        userName: recipe_alias.owner_displayName,
                        userID: recipe_alias.owner,
                      },
                    }"
                  >
                    <a>Creater : {{ recipe_alias.owner_displayName }} </a>
                    <br />
                  </router-link>
                </p>
              </div>
              <!-- Button Link to Data of food -->
              <div class="card-footer">
                <router-link
                  :to="{
                    path: 'recipe',
                    name: 'Recipe',
                    params: { recipeID: recipe_alias._id },
                  }"
                >
                  <button
                    class="btn btn-xs btn-info"
                    style="width: 100px; border-radius: 30px"
                  >
                    Visit
                  </button>
                </router-link>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navigate from "./Navigate.vue";
export default {
  name: "SearchFood",
  components: { Navigate },
  data() {
    return {
      Recipes: [],
      search: "",
      uid: " ",
    };
  },
  mounted() {
      // Read data from Database
    axios
      .get("https://young-basin-17632.herokuapp.com/recipe/show/all")
      .then((response) => {
        // console.log(response.data)
        this.Recipes = response.data;
        // console.log(this.Recipes)
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
      // Searching method
    filterRecipes: function () {
      return this.Recipes.filter((recipe) => {
        //                console.log(recipe.title)
        return recipe.title.match(this.search);
      });
    },
  },
  methods:{
        setAltImg(event) {
      //"./src/assets/image.png" for Localhost
      event.target.src = "https://semantic-ui.com/images/wireframe/image.png";
    },
  }
};
</script>
