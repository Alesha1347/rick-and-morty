import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from '@/pages/Header'
import Characters from '@/pages/Characters'
import Locations from '@/pages/Locations'
import Episodes from '@/pages/Episodes'
import CharacterPage from '@/components/characters/CharacterPage'
import LocationPage from '@/components/locations/LocationPage'
import EpisodePage from '@/components/episodes/EpisodePage'

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
        path:'/characters/:id',
        component: CharacterPage,
        name: 'characterPage'
      },
      {
        path:'/locations',
        component: Locations,
        name: 'locations'
      },
      {
        path:'/locations/:id',
        component: LocationPage,
        name: 'locationPage'
      },
      {
        path:'/episodes',
        component: Episodes,
        name: 'episodes'
      },
      {
        path:'/episodes/:id',
        component: EpisodePage,
        name: 'episodePage'
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
