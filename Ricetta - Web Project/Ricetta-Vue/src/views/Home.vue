<template>
  <div>
    <Navigate></Navigate>

    <!-- ------------------------------------------------------------------------------------------------------------- -->
    <div class="container-fluid">
      <br />
      <div class="container-fluid">
        <div class="row">
          <!-- ------------------------------------ Left Col = Advertising ------------------------------ -->
          <div class="col">
            <div class="container" style="background-color: #cbe5f0">
              <br /><br />
              <h6>Advertising</h6>
              <div id="carousel1" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                  <li
                    data-target="#carousel1"
                    data-slide-to="0"
                    class="active"
                  ></li>
                  <li data-target="#carousel1" data-slide-to="1"></li>
                  <li data-target="#carousel1" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img
                      class="mw-100"
                      src="/src/assets/ad1.jpg"
                      alt="First slide"
                    />
                    <div class="carousel-caption d-none d-md-block">
                      <h5>Kariz Orange Juice</h5>
                      <p>Best Juice Forever</p>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img
                      class="mw-100"
                      src="/src/assets/ad2.jpg"
                      alt="Second slide"
                    />
                    <div class="carousel-caption d-none d-md-block">
                      <h5>Coca-Cola</h5>
                      <p>Without a Coca-Cola life is unthinkable.</p>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img
                      class="mw-100"
                      src="/src/assets/ad3.jpg"
                      alt="Third slide"
                    />
                    <div class="carousel-caption d-none d-md-block">
                      <h5>KFC</h5>
                      <p>It’s Finger Lickin’ Good.</p>
                    </div>
                  </div>
                </div>
                <a
                  class="carousel-control-prev"
                  href="#carousel1"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#carousel1"
                  role="button"
                  data-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
              <br />
            </div>
          </div>

          <!-- ----------------------------- Right Col = Most Popular Recipe (Sort by number of like)-----------------------------------   -->
          <div class="col">
            <div class="container" style="background-color: #def5ff">
              <br />
              <h6>Most Popular Recipe</h6>
              <div id="carousel2" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                  <!-- ------Title Card------ -->
                  <div class="carousel-item active">
                    <div class="d-flex justify-content-center">
                      <div class="card" style="width: 18rem">
                        <img
                          class="card-img-top"
                          src="/src/assets/home-popular.jpg"
                          alt="Card image cap"
                          @error="setAltImg"
                        />
                        <div
                          class="card-body"
                          style="background-color: #ffe0b8"
                        >
                          <h5 class="card-title">Most Popular</h5>
                          <p class="card-text">Let's see Delicius Recipe</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- -----V-for of Popular Recipe------ -->
                  <div
                    class="carousel-item"
                    v-for="recipe_alias in Populars"
                    v-bind:key="recipe_alias._id"
                  >
                    <div class="d-flex justify-content-center">
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
                              <a
                                >Creater : {{ recipe_alias.owner_displayName }}
                              </a>
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
                    </div>
                  </div>

                  <!-- ----------------------end all of card (inner)------------------- -->
                </div>
                <!-- ----------------------outer = Slide Buttton ------------------ -->

                <a
                  class="carousel-control-prev"
                  href="#carousel2"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#carousel2"
                  role="button"
                  data-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
              <br />
            </div>
          </div>
          <!-- -------------------------------- end Right Col----------------------- -->
        </div>
      </div>
      <!-- -------------------------------- end 1 container (Bottom Part) ----------------------- -->
      <br /><br />
      <!-- --------------------------------Down Part = New Recipe(Sort by createDate) ----------------------- -->

      <div class="container-fluid">
        <div class="container" style="background-color: #def5ff">
          <br />
          <h6>New Recipe</h6>
          <div id="carousel3" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <!-- ------Title Card------ -->
              <div class="carousel-item active">
                <div class="d-flex justify-content-center">
                  <div class="card" style="width: 18rem">
                    <img
                      class="card-img-top"
                      src="/src/assets/home-new.jpg"
                      alt="Card image cap"
                      @error="setAltImg"
                    />
                    <div class="card-body" style="background-color: #ffec8b">
                      <h5 class="card-title">Newly Recipe</h5>
                      <p class="card-text">Let's see Delicius Recipe</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- -----V-for of Newly Recipe------ -->
              <div
                class="carousel-item"
                v-for="recipe_alias in Newly"
                v-bind:key="recipe_alias._id"
              >
                <div class="d-flex justify-content-center">
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
                </div>
              </div>

              <!-- ----------------------end all of card (inner)------------------- -->
            </div>
            <!-- ----------------------outer = Slide button------------------ -->

            <a
              class="carousel-control-prev"
              href="#carousel3"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carousel3"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <br />
        </div>
      </div>

      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import firebase from "firebase";
import Navigate from "./Navigate.vue";
export default {
  name: "Home",
  components: {
    Navigate,
  },

  data() {
    return {
      Populars: [],
      Newly: [],
      Sweet: [],
      uid: "",
    };
  },
  mounted() {
    //----------------- get Popular -------------------------
    axios
      .get("https://young-basin-17632.herokuapp.com/recipe/show/mostlike")
      .then((response) => {
        //  console.log(response.data);
        this.Populars = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    //----------------- get Newly -------------------------
    axios
      .get("https://young-basin-17632.herokuapp.com/recipe/show/newly")
      .then((response) => {
        //  console.log(response.data);
        this.Newly = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    //----------------- get Sweet by tag -------------------------
    // axios
    //   .get("https://young-basin-17632.herokuapp.com/recipe/show/tag/sweet")
    //   .then((response) => {
    //     //  console.log(response.data);
    //     this.Sweet = response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  },

  methods: {
    setAltImg(event) {
      //"./src/assets/image.png" for Localhost
      event.target.src = "https://semantic-ui.com/images/wireframe/image.png";
    },
  },
};
</script>
