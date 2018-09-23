import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/iconfont'
import './config'

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
