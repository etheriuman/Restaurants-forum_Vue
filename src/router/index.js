import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import Restaurants from '../views/Restaurants.vue'
import store from './../store'

Vue.use(VueRouter)


// 驗證是否為管理者
const authorizeIsAdmin = (to, from, next) => {
  // 取出currentUser
  const currentUser = store.state.currentUser
  // 如果 currentUser存在 && 不是管理者
  if (currentUser && !currentUser.isAdmin) {
    // 轉址到404
    next('/404')
    return
  }
  next()
}

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: Restaurants
  },
  {
    path: '/restaurants/feeds',
    name: 'restaurants-feeds',
    component: () => import('../views/RestaurantsFeeds.vue')
  },
  {
    path: '/restaurants/top',
    name: 'restaurants-tops',
    component: () => import('../views/RestaurantsTop.vue')
  },
  {
    path: '/restaurants/:id',
    name: 'restaurant',
    component: () => import('../views/Restaurant.vue')
  },
  {
    path: '/restaurants/:id/dashboard',
    name: 'dashboard',
    component: () => import('../views/RestaurantDashboard.vue')
  },
  {
    path: '/users/top',
    name: 'users-top',
    component: () => import('../views/UsersTop.vue')
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/users/:id/edit',
    name: 'user-edit',
    component: () => import('../views/UserEdit.vue')
  },
  {
    path: '/admin',
    exact: true,
    redirect: 'admin/restaurants'
  },
  {
    path: '/admin/restaurants',
    name: 'admin-restaurants',
    component: () => import('../views/AdminRestaurants.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/restaurants/new',
    name: 'admin-restaurant-new',
    component: () => import('../views/AdminRestaurantNew.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/restaurants/:id/edit',
    name: 'admin-restaurant-edit',
    component: () => import('../views/AdminRestaurantEdit.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/restaurants/:id',
    name: 'admin-restaurant',
    component: () => import('../views/AdminRestaurant.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/categories',
    name: 'admin-categories',
    component: () => import('../views/AdminCategories.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

// 在每次路由轉址時觸發驗證使用者登入狀態
router.beforeEach(async (to, from, next) => {

    // 從localstorage中拿出token
    const tokenInLocalStorage = localStorage.getItem('token')
    // 取得store currentUser的token
    const tokenInStore = store.state.token
    // 取得store currentUser的驗證狀態
    let isAuthenticated = store.state.isAuthenticated

    // 如果token存在(表示有登入過)、localstorage的token也跟當前currentUser的token一樣：
    if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
      // 就驗證使用者的token是否已經過期
      isAuthenticated = await store.dispatch('fetchCurrentUser')
    }

    // 設定不需驗證的路由
    const pathsWithoutAuthentication = ['sign-in', 'sign-up']

    // 如果未認證，目標路由也不是登入頁或註冊頁，那就轉址到登入頁(避免無窮迴圈)
    if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
      // 轉址到登入頁
      next('/signin')
      return
    }
    // 如果已認證，目標路由是登入頁或註冊頁：
    if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
      // 就轉址到首頁
      next('/restaurants')
      return
    }
    next()
})

export default router
