import Home from '@pages/Home.vue'
import NotFound from '@pages/NotFound.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '*',
    name: 'Not Found',
    component: NotFound
  }
]