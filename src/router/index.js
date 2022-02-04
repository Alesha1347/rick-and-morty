import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from '@/pages/Header'
import Characters from '@/pages/Characters'
import Locations from '@/pages/Locations'
import Episodes from '@/pages/Episodes'
import CharacterPage from '@/components/characters/CharacterPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Header,
    name: 'header',
    children: [
      {
        path:'/characters',
        component: Characters,
        name: 'characters'
      },
      {
        path:'/locations',
        component: Locations,
        name: 'locations'
      },
      {
        path:'/episodes',
        component: Episodes,
        name: 'episodes'
      },
      {
        path:'/characters/:id',
        component: CharacterPage,
        name: 'characterPage'
      }      
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
