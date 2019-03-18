import Vue from 'vue';
import VueRouter from 'vue-router';
import DetailPageView from '../views/DetailPageView'
import MainListView from '../views/MainListView';
import DetailList from '../components/DetailList';
//import store from '../store/index.js';
//import LoginView from '../views/LoginView.vue';

Vue.use(VueRouter);

const NotFound = { template: '<div>Not Found</div>'}
export const router = new VueRouter({
    //라우팅 정보는 routes에
    routes: [
        // mode : 'history',
        //page갯수
        {
            path: '/',
            redirect: '/list',
        }, 
        {
            path: '/list',
            component: MainListView,
            name: 'list'
        },
        { 
            path: '*', 
            component: NotFound, 
            name:'NotFound' 
        },
        // TODO: 라우터로 넘겨 받은 list id로 DetailPage에서 데이터 호출 또는 조작
        { 
            path: '/detail/:id', 
            component:DetailPageView, 
            name:'detail'
        },
        {
            path: '/tail',
            component:DetailList,
            name:'tail'
        }
    ]
})