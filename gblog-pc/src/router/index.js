import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import BlogDetail from '../views/BlogDetail.vue'
import Login from '../views/Login.vue'
import PushArticle from '../views/PushArticle.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Index',
  component: Index
},
{
  path: '/blog/detail/:blogId',
  name: 'BlogDetail',
  component: BlogDetail
},
{
  path: '/login',
  name: 'Login',
  component: Login
},
{
  path: '/pusharticle',
  name: 'PushArticle',
  component: PushArticle
}

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
