<template>
  <div class="flex-container">
    <!-- ---------------------------------- Left Component (Photo) ------------------------------ -->

    <div class="flex-item-left">
      <img src="/src/assets/food-signup.jpg" alt="SignUp" />
    </div>
    <!-- ---------------------------------- Right Component (SignUp) ------------------------------ -->

    <div class="flex-item-right">
      <div class="container" style="background-color: #cbe5f0">
        <br />
        <img src="/src/assets/Ricetta-blue.png" style="width: 40%" alt="" />
        <br />
        <br />
        <h5 style="color: #6e6e6e">Create an Account</h5>
        <input
          type="username"
          v-model="formData.username"
          class="form-control"
          placeholder="Username"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <input
          type="Email"
          v-model="formData.email"
          class="form-control"
          placeholder="Email"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="password"
          v-model="formData.password"
          class="form-control"
          placeholder="Password"
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input
          type="password"
          v-model="formData.confirm_password"
          class="form-control"
          placeholder="Confirm Password"
        />
        <br />
        <button class="btn" @click="signUp">Create Account</button>
        <br /><br />
      </div>
    </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "SignUp",
  data() {
    return {
      formData: {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      },
    };
  },

  methods: {
    //-------- Method For Send Data to Firebase + Check Condition of signup -------------------
    signUp() {
      // -------------- Check Password == Confrim Password ? ---------------------
      if (this.formData.password == this.formData.confirm_password && this.formData.password != "") {
      // -------------- Username Null? ---------------------
        if (this.formData.username != "") {
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              this.formData.email,
              this.formData.password
            )
            .then((user) => {
              var user = firebase.auth().currentUser;
              user
                .updateProfile({
                  displayName: this.formData.username,
                })
                .then(
                  function () {
                    alert("Welcome to Ricetta!, " + user.displayName);
                  },
                  function (error) {
                    alert(error.message);
                  }
                );
              this.$router.replace("/home");
            })
            .catch((error) => {
              alert(error.message);
            });
        } else {
          alert("Please fill the username");
        }
      } else {
        alert("Password does not match! Please try again.");
      }
    },
  },
};
</script>

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
.container {
  padding: 50px;
  flex: 100%;
  background-color: #cbe5f0;
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
Input {
  padding: 20px;
  border-radius: 50px;
}
.btn {
  background-color: #ffa200;
  color: white;
  font-weight: bold;
  border-radius: 50px;
  padding-left: 50px;
  padding-right: 50px;
}
</style>