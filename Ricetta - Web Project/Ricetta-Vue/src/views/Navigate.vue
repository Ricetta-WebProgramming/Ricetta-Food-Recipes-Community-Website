<template>
  <div>
<!-- ---------------------------- Nav Bar Component ------------------------------------- -->

    <nav
      class="navbar navbar-light justify-content-between"
      style="background-color: #52a9d5"
    >
      <img
        src="/src/assets/Ricetta.png"
        height="50"
        class="d-inline-block align-top"
        alt=""
      />

      <router-link
        to="/home"
        style="color: white; font-weight: bold; font-size: 20px"
        >Home</router-link
      >
      <router-link
        to="/searchrecipe"
        style="color: white; font-weight: bold; font-size: 20px"
        >Search</router-link
      >
      <router-link
        to="/createrecipe"
        style="color: white; font-weight: bold; font-size: 20px"
        >Create Recipe</router-link
      >
      <router-link
        to="/profile"
        style="color: white; font-weight: bold; font-size: 20px"
        >Profile</router-link
      >
      <button class="btn \" @click="logout" style="background-color: #ffed93;padding: 5px 30px; border-radius: 3rem;">
        Logout
      </button>

    </nav>
  </div>
  
</template>

<script>
import firebase from 'firebase'
export default {
  name: "Navigate",
  components: {},
  methods: {
    // Logout -> Send request to Back-End for change Authentication value
logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/signin");
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>

<style scoped>
li a:hover:not(.active) {
  background-color: #111;
}
</style>

