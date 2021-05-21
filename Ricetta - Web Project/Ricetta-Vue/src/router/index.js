import {
    createRouter,
    createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import Recipe from '../views/Recipe.vue'
import CreateRecipe from '../views/CreateRecipe.vue'
import EditRecipe from '../views/EditRecipe.vue'
import SignIn from '../views/SignIn.vue'
import SignUp from '../views/SignUp.vue'
import Profile from '../views/Profile.vue'
import SearchFood  from '../views/SearchFood.vue'
import OtherProfile from '../views/OtherProfile.vue'
import axios from 'axios'
import firebase from 'firebase'


const routerHistory = createWebHistory()

const routes = [

    {
        path: '/',
        redirect: '/signin'
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/signin'
    },
    {
        path: '/signin',
        name: SignIn,
        component: SignIn
    },
    {
        path: '/signup',
        name: SignUp,
        component: SignUp
    },

    {
        path: '/home',
        name: Home,
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/recipe/:recipeID',
        name: 'Recipe',
        component: Recipe,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/createrecipe',
        name: CreateRecipe,
        component: CreateRecipe,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/profile',
        name: Profile,
        component: Profile,
        meta: {
            requiresAuth: true
        }
    },



    {
        path: '/editrecipe/:recipeID',
        name: 'EditRecipe',
        component: EditRecipe,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/searchrecipe',
        name: 'SearchFood',
        component: SearchFood,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/userprofile/:userName/:userID',
        name: 'OtherProfile',
        component: OtherProfile,
        meta: {
            requiresAuth: true
        }
    }


]

const router = createRouter({
    history: routerHistory,
    routes
})


// method when change Page.vue 
// get Autentication to check that this user can accress some other area.
router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth && !currentUser) {
      console.log("You are not authorized to access this area.");
      next('signin')
    } else if (!requiresAuth && currentUser) {
      console.log("You are authorized to access this area.");
      next('home')
    } else {
      next()
    }
  })


export default router