import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
  },
  {
    path: "/",
    name: "Groups",
    component: () => import("@/views/Groups.vue"),
  },
  {
    path: "/requests",
    name: "Requests",
    component: () => import("@/views/Requests.vue"),
  },
  {
    path: "/create-group",
    name: "CreateGroup",
    component: () => import("@/views/CreateGroup.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
