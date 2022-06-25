import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Login
  },
  {
    path: '/logout',
    component: () => import('../views/Logout.vue')
  },
  {
    path: '/main',
    component: Main,
    children: [{
      path: '',
      component: () => import('../views/HomeView.vue')
    }, {
      path: 'studentlist',
      component: () =>
        import('../views/student/StudentList.vue'),
    }, {
      path: 'studentedit/:id',
      component: () =>
        import('../views/student/StudentEdit.vue'),
    }, {
      path: 'classlist',
      component: () =>
        import('../views/classes/ClassList.vue'),
    }, {
      path: 'classedit/:id',
      component: () =>
        import('../views/classes/ClassEdit.vue'),
    }, {
      path: 'userlist',
      component: () =>
        import('../views/users/UserList.vue'),
    }, {
      path: 'useredit/:id',
      component: () =>
        import('../views/users/UserEdit.vue'),
    }]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    next();
  } else {
    if (sessionStorage.getItem('token')) {
      next();
    } else {
      next('/');
    }

  }
})

export default router