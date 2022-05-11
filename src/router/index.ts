import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomePage from 'src/pages/home/HomePage.vue'
import CategoryPage from 'src/pages/category/CategoryPage.vue'
import NotFoundPage from 'src/pages/errors/NotFoundPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomePage',
    meta: {
      layout: 'default'
    },
    component: HomePage
  },
  {
    path: '/ip-block',
    name: 'IpBlockPage',
    meta: {
      layout: 'default'
    },
    props: {
      type: 'ip-block'
    },
    component: CategoryPage
  },
  {
    path: '/broken-assembly',
    name: 'BrokenAssemblyPage',
    meta: {
      layout: 'default'
    },
    props: {
      type: 'broken-assembly'
    },
    component: CategoryPage
  },
  {
    path: '/malware',
    name: 'MalwarePage',
    meta: {
      layout: 'default'
    },
    props: {
      type: 'malware'
    },
    component: CategoryPage
  },
  {
    path: '/hostile-actions',
    name: 'HostileActionsPage',
    meta: {
      layout: 'default'
    },
    props: {
      type: 'hostile-actions'
    },
    component: CategoryPage
  },
  {
    path: '/ddos',
    name: 'DdosPage',
    meta: {
      layout: 'default'
    },
    props: {
      type: 'ddos'
    },
    component: CategoryPage
  },
  {
    path: '/political-slogans',
    name: 'PoliticalSlogansPage',
    meta: {
      layout: 'default'
    },
    props: {
      type: 'political-slogans'
    },
    component: CategoryPage
  },
  {
    path: '/:data(.*)',
    name: 'NotFoundPage',
    meta: {
      layout: false
    },
    component: NotFoundPage
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router
