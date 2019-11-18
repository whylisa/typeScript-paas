import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/login/login.vue';
import HomeMain from './views/homeMain/homeMain.vue';
import Directive from './components/directive/directive.vue';
import Mixins from './components/mixins/mixin.vue';
import Props from './components/prop/props.vue';
import BusinessMgt from './views/BusinessMgt/businessMgt.vue';
import TransactionMgt from './views/BusinessMgt/transactionMgt.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/HomeMain',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/homeMain',
          name: 'homeMain',
          component: HomeMain,
        },
        {
          path: '/businessMgt',
          name: 'businessMgt',
          component: BusinessMgt,
        },
        {
          path: '/transactionMgt',
          name: 'transactionMgt',
          component: TransactionMgt,
        },
        {
          path: '/directive',
          name: 'directive',
          component: Directive,
        },
        {
          path: '/mixins',
          name: 'mixins',
          component: Mixins,
        },
        {
          path: '/props',
          name: 'props',
          component: Props,
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('myToken_admin');
  if (to.path === '/login' || token) {
    next();
  } else {
    next('/login');
  }

});
export default router;
