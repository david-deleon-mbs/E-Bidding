import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ActiveBidsView from '../views/ActiveBidsView.vue'
import QuotationsView from '../views/QuotationsView.vue'
import TechnicalComplianceView from '../views/TechnicalComplianceView.vue'
import TermsAndConditionsView from '../views/TermsAndConditionsView.vue'
import FinalReviewView from '../views/FinalReviewView.vue'
import ChangePasswordView from '../views/ChangePasswordView.vue'
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
      component: DashboardView,
      meta: {
        requiresAuth: true
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({name: 'login'});
  } else if (store.state.user.token && to.meta.isGuest) {
    next({name: 'home'})
  } else {
    next()
  }
})

export default router
