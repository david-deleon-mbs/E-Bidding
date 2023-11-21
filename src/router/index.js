import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ActiveBidsView from '../views/ActiveBidsView.vue'
import QuotationsView from '../views/QuotationsView.vue'
import TechnicalComplianceView from '../views/TechnicalComplianceView.vue'
import TermsAndConditionsView from '../views/TermsAndConditionsView.vue'
import FinalReviewView from '../views/FinalReviewView.vue'
import ChangePasswordView from '../views/ChangePasswordView.vue'
import AppLayout from '../components/AppLayout.vue'
import store from "../store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/active-bids',
      name: 'active-bids',
      component: ActiveBidsView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/quotations',
      name: 'quotations',
      component: QuotationsView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/technical-compliance',
      name: 'technical-compliance',
      component: TechnicalComplianceView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/terms-and-conditions',
      name: 'terms-and-conditions',
      component: TermsAndConditionsView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/final-review',
      name: 'final-review',
      component: FinalReviewView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        isGuest: true
      },
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: ChangePasswordView,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/',
      name: 'home',
      // component: AppLayout,
      component: DashboardView,
      meta: {
        requiresAuth: true
      },
    },
    // {
    //   path: '/',
    //   redirect: '/login',
    //   name: 'home',
    //   component: AppLayout,
    //   meta: {
    //     isGuest: true
    //   },
    //   children: [
    //     {
    //       path: '/login',
    //       name: 'login',
    //       component: LoginView
    //     },
    //     // {
    //     //   path: '/',
    //     //   name: 'dashboard',
    //     //   component: DashboardView,
    //     //   meta: {
    //     //     requiresAuth: true
    //     //   },
    //     // },
    //   ]
    // },
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && !store.state.user.vendor) {
//         console.log('to.meta', to.meta);
//     console.log('store.state', store.state);
//     next({name: 'login'});
//   } else if (store.state.user.vendor && to.meta.isGuest) {
//     next({name: 'dashboard'});
//   }
//   // else {
//   //   console.log('to.meta', to.meta);
//   //   console.log('store.state', store.state);
//   //   next();
//   // }
// })

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    // console.log('to.meta', to.meta);
    // console.log('store.state', store.state);
    // console.log(to.meta.requiresAuth, !store.state.user.token);
    next({name: 'login'});
  } else if (store.state.user.token && to.meta.isGuest) {
    next({name: 'home'})
  } else {
    next()
  }
})


export default router
