import Vue from 'vue'
import VueRouter, { NavigationGuardNext, Route } from 'vue-router';
import { RouteConfig } from 'vue-router'
import guest from './middleware/guest';
import store from "@/store/index"
import pipeline from './pipeline';
import auth from './middleware/auth';
import { changeTitle } from '@/services/title';

Vue.use(VueRouter)

const routes: RouteConfig[] = [
    {
        path: '/',
        redirect: '/tabs/home'
    },
    {
        path: '/account/',
        redirect: '/account/login'
    },
    {
        path: '/tabs/',
        component: () => import("@/pages/home/TabsPage.vue"),
        children: [
            {
                path: 'home',
                name:'Home',
                component: () => import("@/pages/home/HomePage.vue"),
                meta: (route: Route) => ({
                    title: 'Home',
                    route
                })
            },
            {
                path: 'teams',
                name:'Teams',
                component: () => import("@/pages/home/TeamsPage.vue"),
                meta: (route: Route) => ({
                    title: 'Teams',
                    middleware: auth,
                    route
                })

            },
            {
                path: 'settings',
                name: 'Settings',
                component: () => import("@/pages/home/SettingsPage.vue"),
                meta: (route: Route) => ({
                    title: 'Settings',
                    middleware: auth,
                    route
                })
            }, {
                path: 'projects',
                name: 'Projects',
                component: () => import("@/pages/home/ProjectsPage.vue"),
                meta: (route: Route) => ({
                    title: 'Projects',
                    middleware: auth,
                    route
                })
            }
        ]
    }, {
        path: '/account/login',
        name: 'Login',
        component: () => import("@/pages/account/LoginPage.vue"),
        meta: (route: Route) => ({
            title: 'Login',
            middleware: guest,
            route
        })
    }, {
        path: '/account/register',
        name: 'SignUp',
        component: () => import("@/pages/account/SignUp.vue"),
        meta: (route: Route) => ({
            title: 'SignUp',
            middleware: guest,
            route
        })
    }, {
        path: '/account/activation',
        name: 'ActiveAccount',
        component: () => import("@/pages/account/AccountActivation.vue"),
        meta: (route: Route) => ({
            title: 'Account Activation',
            middleware: guest,
            route
        })
    },
];

const router = new VueRouter({
    routes: routes,
    mode: 'history',
})

router.beforeEach((to: any, from: Route, next: NavigationGuardNext<Vue>) => {

    let meta = to.meta(to)
    changeTitle(meta.title)
    if (!meta.middleware) {
        return next()
    }

    const middleware = meta.middleware
    const context = {
        to,
        from,
        next,
        store
    }

    return middleware({
        ...context,
        next: pipeline(context, middleware, 1)
    })

})

export default router;