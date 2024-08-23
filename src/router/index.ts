import {createRouter, createWebHistory} from "vue-router";

const routes=[
    {
        path:'/',
        redirect:'/login'
    },
    {
        path:'/login',
        name:'login',
        meta:{'title':'登录'},
        component:()=>import('@/views/Login.vue'),
    },
    {
        path:'/view',
        component:()=>import('@/views/View.vue'),
        name:'view'
    },
    {
        path:'/home',
        name:'home',
        component:()=>import('@/views/Home.vue'),
        children:[
            {
                path:'/home',
                redirect:'/home/index',
                meta:{title:"首页"}
            },
            {
                path: 'index',
                name:'index',
                component:()=>import('@/views/Home/Main/Index.vue'),
                meta:{title:"首页"}
            },
            {
                path: 'houseInfo',
                name:'houseInfo',
                component:()=>import('@/views/Home/Main/HouseInfo.vue'),
                meta:{title:"房源概况"}
            },
            {
                path: 'houseView',
                name:'houseView',
                component:()=>import('@/views/Home/Main/HouseView.vue'),
                meta:{title:"可视化房源"}
            },
            {
                path: 'housePredict',
                name:'housePredict',
                component:()=>import('@/views/Home/Main/HousePredict.vue'),
                meta:{title:"房价预测"}
            },
            {
                path: 'user',
                name:'user',
                component:()=>import('@/views/Home/Main/User.vue'),
                meta:{title:"个人信息"}
            },
            {
                path:'pwd',
                name:'pwd',
                component:()=>import('@/views/Home/Main/Pwd.vue'),
                meta:{title:"修改密码"}
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        component:()=>import('@/views/Login.vue'),
    }
]

const router=createRouter({
    history:createWebHistory(),
    routes:routes,
})

router.beforeEach((to, from, next) => {
    if (to.meta && typeof to.meta.title === 'string') {
        document.title = to.meta.title;
    } else {
        document.title = '黄小耶';
    }
    const isAuthenticated=localStorage.getItem('token')
    if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' })
    else next()
})
export default router;
