import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'moveHome',
        component: () => import('./page/MoveHome.vue')
    },
    {
        path: '/Role',
        name: 'romeMove',
        component: () => import('./page/RoleMove.vue')
    },
    {
        path: '/World',
        name: 'worldMove',
        component: () => import('./page/WorldMove.vue')
    },
    {
        path: '/Cartoon',
        name: 'cartoonMove',
        component: () => import('./page/CartoonMove.vue')
    },
]

const router = new VueRouter({
    routes
})

export default router