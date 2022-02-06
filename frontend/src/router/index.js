import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Post from '../views/Post.vue'
import Profil from '../views/Profil.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  }, {
    path: '/post',
    name: 'Post',
    component: Post
  }, {
    path: '/profil',
    name: 'Profil',
    component: Profil
  }
]

const router = new VueRouter({
  routes
})

export default router
