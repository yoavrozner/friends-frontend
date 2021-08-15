import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Groups from '../views/Groups.vue'
import Requests from '../views/Requests.vue'
import CreateGroup from '../views/CreateGroup.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(Profile)
  },
  {
    path: '/groups',
    name: 'Groups',
    component: () => import(Groups)
  },
  {
    path: '/requests',
    name: 'Requests',
    component: () => import(Requests)
  },
  {
    path: '/create-group',
    name: 'CreateGroup',
    component: () => import(CreateGroup)
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
