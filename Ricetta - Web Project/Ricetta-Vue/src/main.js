import { createApp } from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

let app

var firebaseConfig = {
    apiKey: "AIzaSyC595YaUNB7xtzpb8Nf3pXColNW3rhAqV0",
    authDomain: "ricetta-dd708.firebaseapp.com",
    projectId: "ricetta-dd708",
    storageBucket: "ricetta-dd708.appspot.com",
    messagingSenderId: "407220415281",
    appId: "1:407220415281:web:85c0b07b6ec6d4a1559e10",
    measurementId: "G-RT8BLSL4G6"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  
  firebase.auth().onAuthStateChanged((user)=> {
    if(!app){
        // สร้างใหม่เมื่อไม่เคยล็อกอินมาก่อน
        app = createApp(App).use(router).mount('#app')

    }

 })

 
