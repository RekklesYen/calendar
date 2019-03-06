import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import Login from './components/Login/index'
import Register from './components/Register/index'
import firebase from 'firebase'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/login'
    },
    {
      path: '/todo',
      name: 'todo',
      component: App,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    }
    // {
    //   path: '/all',
    //   name: 'all'
    // },
    // {
    //   path: '/active',
    //   name: 'active'
    // },
    // {
    //   path: '/complete',
    //   name: 'complete'
    // },
    // {
    //   path: '*',
    //   redirect: '/all'
    // }
  ]
})

router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user

    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // Proceed to route
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if  logged in
    if (firebase.auth().currentUser) {
      // Go to todo
      next({
        path: '/todo',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // Proceed to route
      next()
    }
  } else {
    // Proceed to route
    next()
  }
})

export default router
