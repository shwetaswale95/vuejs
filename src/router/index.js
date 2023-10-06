import Vue from "vue";
import VueRouter from "vue-router";
import TutorialsList from "../components/TutorialsList.vue";
import HelloWorld from "../components/TutorialsList.vue";
import AddTutorial from "../components/AddTutorial.vue";
import stripeComponent from "../components/stripe.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld,
  },
  {
    path: "/tutorials",
    name: "tutorials",
    // component: HelloWorld,
    component: TutorialsList,
  },
  {
    path: "/add",
    name: "add",
    component: AddTutorial,
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: AddTutorial,
  },
  {
    path: "/stripe",
    name: "stripe",
    component: stripeComponent,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
