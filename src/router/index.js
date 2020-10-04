import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children:[
      {
        path:'/desktop',
        name: 'desktop',
        component: () => import( '@/views/Desktop.vue')
      },
      {
        path:'/deparmentList',
        name: 'departmentList',
        component: () => import( '@/views/system/Department/DepartmentList.vue')
      },
      {
        path:'/userList',
        name: 'userList',
        component: () => import( '@/views/system/User/UserList.vue')
      },
      
      {
        path:'/empList',
        name: 'empList',
        component: () => import( '@/views/system/Emp/EmpList.vue')
      },

    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
