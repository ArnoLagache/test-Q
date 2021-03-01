import Ranking from '../pages/Ranking'
import Home from '../pages/Home'
import VueRouter from 'vue-router'

export const myRoutes = [
    { path: '/', component: Home, exact: true },
    { path: '/ranking', component: Ranking, exact: true }
]

const router = new VueRouter({
    mode: 'history',
    routes: myRoutes
})

export default router