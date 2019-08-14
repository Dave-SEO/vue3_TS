import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes'
import Cookies from 'js-cookie'
Vue.use(Router);

const router = new Router({
  routes
});
router.beforeEach((to, from, next)=>{
  const getToken = Cookies.get('token')
  if(getToken){
    if(to.path === '/login'){
      // 如果登录了然后访问login页，不做跳转，从哪来回哪去
      next(from)
    }else{
      // 否则顺利跳转
      next()
    }
  }else{ // 否则是没登录
    // 如果没登录并且是在登录页，执行next
    if(to.path === '/login'){
      next()
    }else{
      next('/login')
    }
  }
})
export default router