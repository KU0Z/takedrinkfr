import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login/Login.vue'
import Beers from '../views/Beers/index.vue'
import addBeers from '../views/Beers/add.vue'
import Register from '../views/Register/Register.vue'
import NotFound from '../views/NotFound/404.vue'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Beers
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/beers',
    name: 'Beers',
    component: Beers
  },
  {
    path: '/register',
    name: 'Register',
    component: Register 
  },
  {
    path: '/beer/add',
    name: 'Addbeer',
    component: addBeers 
  },
  {
		name: 'BeeEdit',
		path: '/beer/edit/:idBeer',
		component:addBeers,
		props: true
  	},	
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.getters.userautenticate;
  if(authRequired &&!loggedIn){
    next('/login');
  }
  next();
})

export default router
