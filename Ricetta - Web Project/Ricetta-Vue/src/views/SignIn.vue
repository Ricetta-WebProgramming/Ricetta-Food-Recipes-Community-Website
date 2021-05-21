<template>

  <div class="flex-container">
      <!-- -------------------Image------------------ -->
      <div class="flex-item-left">
        <img src="/src/assets/food-signin.jpg"  alt="SignIn">
      </div>
      <!-- ------------------Sign in------------------ -->
      <div class="flex-item-right" >
        <!-- <br><br><br><br> -->
        <div class="container">
          <br>
          <img src="/src/assets/Ricetta-blue.png" style="width:40%" alt="">
          <br> <br> <h5 style="color:#6E6E6E">Sign In</h5>  
          <input
                type="Email"
                v-model="formData.email"
                class="form-control"
                placeholder="Email"
                style="border-radius: 50px;padding:20px"
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
                type="password"
                v-model="formData.password"
                class="form-control"
                placeholder="Password"
                style="border-radius: 50px;padding:20px"
          />
          <br>
          <button class="btn "  @click="logIn">  Login  </button>    
          <br><br>
          <p style="color:#2F3564; font-weight: bold;">Don't have an account? <router-link to="/signup"> Sign Up </router-link></p>
          <br>
        </div>   
      </div>
    
  </div>
</template>
 <!-- -------------------------------------<script>----------------------------- -->
<script>
import firebase from "firebase"
export default {
  name: "Login",
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },

      errorMessgae: "",
      succeessMessage: "",
      isAuthenticated: false,
    };
  },
  methods: {
    logIn(){
            //Send Email and Password to firebase Autentication
      firebase.auth().signInWithEmailAndPassword(this.formData.email, this.formData.password)
                .then( user =>{
                  // Can Pass -> go to /home
                    this.$router.replace('/home')
                })
                .catch(error =>{
                    alert(error.message)
                })
    }
  },
};
</script>

<!-- ---------------------------------------<css style>-------------------------------------- -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.btn {
  background-color:#FFA200;
  color:white;
  font-weight: bold;
  border-radius: 50px;
  padding-left: 100px;
  padding-right: 100px;
}

* {
  box-sizing: border-box;
}

.flex-container {
  display: flex;
  flex-direction: row;
  
}

.flex-item-left {
  padding: 10px;
  flex: 50%;
}

.flex-item-right {
  padding: 10px;
  flex: 50%;
  margin: auto;
}
.container{
  padding: 50px;
  flex: 100%;
  background-color: #CBE5F0;
 
}

/* Responsive layout - makes a one column-layout instead of two-column layout */
@media (max-width: 800px) {
  .flex-container {
    flex-direction: column;
  }
}
img {
  width: 100%;
  height: auto;
}
</style>
