import Vue from 'vue';
import Router from 'vue-router';
import SearchInput from '@/components/SearchInput';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SearchInput',
      component: SearchInput,
    },
  ],
});
