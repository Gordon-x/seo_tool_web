import Login from '../views/Login';
import Layout from '../views/Layout';
import Screen from '../views/ScreenShot/Screen';
import About from '../views/About';
import ScreenAdd from '../views/ScreenShot/add';

export const bread = {
    home: '首页',
    screen_shot: '截图工具',
    screen_shot_add: '截图任务编辑',
    other: '其他工具',
};

export const menu = [
    {
        label_en: 'Screen Shot',
        label: '截图工具',
        name: 'screen_shot',
        path: '/home/screen_shot',
        component: Screen,
        menu: true
    },
    {
        label_en: 'Screen Shot Edit',
        label: '截图任务编辑',
        name: 'screen_shot_add',
        path: '/home/screen_shot/add',
        component: ScreenAdd,
        menu: false,
    },
    {
        label_en: 'Screen Shot Edit',
        label: '截图任务编辑',
        name: 'screen_shot_edit',
        path: '/home/screen_shot/add/:id',
        component: ScreenAdd,
        menu: false,
    }
];

let routes = [
    {
        path: '/',
        redirect: '/home/screen_shot',
    },
    {path: '/login', name: 'login', component: Login, menu: false},
    {
        path: '/home',
        name: 'home',
        label: '首页',
        label_en: 'Homepage',
        component: Layout,
        menu: false,
        children: menu,
    }
];

export default routes;