import Vue from 'vue'
import Router from 'vue-router'

const Test = resolve => require(['@/components/pages/test.vue'],resolve)


//SetDrop

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Test',
      component: Test
    }
  ]
})
