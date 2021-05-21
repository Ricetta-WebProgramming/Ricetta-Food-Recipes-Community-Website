<template>
  <div>
    <!-- --------------------- Navbar ---------------------------------------- -->
    <Navigate></Navigate>
    <br />
    <div class="container">
      <form>
        <div class="well">
          <br />

          <!-- ----------------------------------------- Header --------------------------------------- -->
          <h4 style="font-weight: bold">
            New Recipe <span class="badge badge-success">Add</span>
          </h4>

          <!-- ------------------------------- Recipe Image ----------------------------------- -->
          <div class="container" style="background-color: #def5ff">
            <br />
            <div class="form-group row">
              <label style="font-weight: bold" class="col-sm-2 col-form-label"
                >Recipe Image*</label
              >
              <div class="col-sm-10">
                <!-- ------------------Fill Link ------------------- -->
                <input
                  type="text"
                  class="form-control"
                  placeholder="Recipe Image URL"
                  v-model="formRecipe.title_img"
                required/>
                <br />
                <!-- ---------------------Show Image --------- -->
                <p>
                  <button
                    class="btn "
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                    @click="chageSourceImage"
                    style="background-color:#FF9100; color:white"
                  >
                    Show this image
                  </button>
                </p>
                <div class="collapse" id="collapseExample">
                  <div class="card card-body">
                    <img
                      id="ExamplePicture"
                      src="/src/assets/image.png"
                      alt="ExampleImage"
                    />
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
          <br>
 <div class="container" style="background-color: #def5ff">
             <!-- ------------------------------- Recipe Title ----------------------------------- -->
<br>
          <div class="form-group row">
            <label style="font-weight: bold" class="col-sm-2 col-form-label"
              >Recipe Title*</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                placeholder="Recipe Title"
                v-model="formRecipe.title"
                required
              />
            </div>
          </div>

          <!-- ------------------------------- Description ----------------------------------- -->

          <div class="form-group row">
            <label style="font-weight: bold" class="col-sm-2 col-form-label"
              >Description*</label
            >
            <div class="col-sm-10">
              <textarea
                type="text"
                class="form-control"
                placeholder="Description"
                v-model="formRecipe.description"
                required
              />
            </div>
          </div>
          <!-- ------------------------------- Serving Size ----------------------------------- -->

          <div class="form-group row">
            <label style="font-weight: bold" class="col-sm-2 col-form-label"
              >Serving Size*</label
            >
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                placeholder="Serving Size"
                v-model="formRecipe.serving"
                min="1"
                max="50"
                required
              />
            </div>
          </div>

          <!-- ------------------------------- Cooking Time ----------------------------------- -->

          <div class="form-group row">
            <label style="font-weight: bold" class="col-sm-2 col-form-label"
              >Cooking Time*</label
            >
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                placeholder="CookingTime (min)"
                v-model="formRecipe.cookTime"
                min="1"
                required
              />
            </div>
          </div>
          <!-- ------------------------------- Tag ----------------------------------- -->

          <div class="form-group row">
            <label style="font-weight: bold" class="col-sm-2 col-form-label"
              >#Tag</label
            >
            <div class="col-sm-10">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="tagCheckbox"
                  value="fried"
                  v-model="formRecipe.tag"
                />
                <label class="form-check-label" for="inlineCheckbox1"
                  >Fried</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="tagCheckbox"
                  value="stirred"
                  v-model="formRecipe.tag"
                />
                <label class="form-check-label" for="inlineCheckbox2"
                  >Stirred</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="tagCheckbox"
                  value="boiled"
                  v-model="formRecipe.tag"
                />
                <label class="form-check-label" for="inlineCheckbox3"
                  >Boiled</label
                >
              </div>

              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="tagCheckbox"
                  value="steam"
                  v-model="formRecipe.tag"
                />
                <label class="form-check-label" for="inlineCheckbox3"
                  >Steam</label
                >
              </div>

              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="tagCheckbox"
                  value="baked"
                  v-model="formRecipe.tag"
                />
                <label class="form-check-label" for="inlineCheckbox3"
                  >Baked</label
                >
              </div>

              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="tagCheckbox"
                  value="yum"
                  v-model="formRecipe.tag"
                />
                <label class="form-check-label" for="inlineCheckbox3"
                  >Yum</label
                >
              </div>

              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="tagCheckbox"
                  value="grill"
                  v-model="formRecipe.tag"
                />
                <label class="form-check-label" for="inlineCheckbox3"
                  >Grill</label
                >
              </div>

              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="tagCheckbox"
                  value="dry"
                  v-model="formRecipe.tag"
                />
                <label class="form-check-label" for="inlineCheckbox3"
                  >Dry</label
                >
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="tagCheckbox"
                  value="sweet"
                  v-model="formRecipe.tag"
                  
                />
                <label class="form-check-label" for="inlineCheckbox3"
                  >Sweet</label
                >
              </div>
 
            </div>
          </div>
          <br>
 </div>
 <br>
          <!-- ------------------------------- Ingredients ----------------------------------- -->
 <div class="container" style="background-color: #def5ff">
<br>
          <div class="form-group row">
            <label style="font-weight: bold" class="col-sm-2 col-form-label"
              >Ingredients*</label
            >

            <div class="col-sm-10">
              <textarea
                type="text"
                class="form-control"
                placeholder="Ingredients (Split by use ; )"
                v-model="formRecipe.ingredients"
                required
              />
            </div>
          </div>
          <br>
</div>
<br>
          <!-- ------------------------------- Instructions ----------------------------------- -->
 <div class="container" style="background-color: #def5ff">
<br>
          <div class="form-group row">
            <label style="font-weight: bold" class="col-sm-2 col-form-label"
              >Instructions*</label
            >
            <div class="col-sm-10">
              <textarea
                type="text"
                class="form-control"
                placeholder="Instructions (Split by use ; )"
                v-model="formRecipe.instructions"
              required />
            </div>
          </div> <br>
 </div>
 <br>
 <!-- ---------------------------------- Button Group ------------------------ -->
        </div>

        <div
          class="btn-group btn-group-lg"
          role="group"
          aria-label="Basic example"
        >
        <router-link to="/home">
            <button class="btn btn-large " style="border-color: #ff9100; color: #ff9100">Cancle</button>
          </router-link>
          <router-link to="/home">
            <button
              type="submit"
              style="background-color: #ff9100; color: white"
              class="btn btn-large"
              @click="addToAPI"
            >
              Save
            </button>
          </router-link>
          
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";
import Navigate from "./Navigate.vue";
export default {
  name: "NewContact",
  components: { Navigate },
  data() {
    return {
      formRecipe: {
        title_img: "",
        title: "",
        owner: "",
        owner_displayName: "",
        description: "",
        serving: "",
        cookTime: "",
        tag: [],
        ingredients: "",
        instructions: "",
      },
    };
  },
  methods: {
    // send new data to Back-end
    addToAPI() {
      let newRecipe = {
        title_img: this.formRecipe.title_img,
        title: this.formRecipe.title,
        owner: firebase.auth().currentUser.uid,
        owner_displayName: firebase.auth().currentUser.displayName,
        description: this.formRecipe.description,
        serving: this.formRecipe.serving,
        cookTime: this.formRecipe.cookTime,
        tag: this.formRecipe.tag,
        ingredients: this.formRecipe.ingredients.split(";"),
        instructions: this.formRecipe.instructions.split(";"),
      };
      // Because required not working in html -> use if-else condition to handle invalid required value
      if (
        newRecipe.title_img != "" &&
        newRecipe.title != "" &&
        newRecipe.owner != "" &&
        newRecipe.owner_displayName != "" &&
        newRecipe.description != "" &&
        newRecipe.serving != "" &&
        newRecipe.serving > 0 &&
        newRecipe.cookTime != "" &&
        newRecipe.cookTime >0 &&
        // newRecipe.tag != "" &&
        newRecipe.ingredients != "" &&
        newRecipe.instructions != "" 
      ) {
      axios
        .post("https://young-basin-17632.herokuapp.com/recipe/add", newRecipe)
        .then((response) => {
          console.log(response.data);
          this.$router.replace("/home");
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        alert("Please fill in all the required fields.");
      }
    },
    chageSourceImage() {
      document.getElementById("ExamplePicture").src = this.formRecipe.title_img;
    },
  },
};
</script>

