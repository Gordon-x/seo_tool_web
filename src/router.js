import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes/const_routes';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: routes
});

router.beforeResolve((to, from, next) => {
    let xToken = localStorage.getItem('x-token');

    if (to.path === '/login' && xToken) {
        next({ path: '/' });
    } else if (to.path === '/login') {
        next();
    } else if (xToken == null) {
        next({ path: '/login' });
    } else {
        next();
    }
});

export default router;
