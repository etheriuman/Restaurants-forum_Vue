<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading"/>
    <template v-else>
      <!-- 餐廳類別標籤 RestaurantsNavPills -->
      <RestaurantsNavPills :categories="categories" />
      <div class="row">
        <!-- 餐廳卡片 RestaurantCard-->
        <RestaurantCard v-for="restaurant in restaurants" :key="restaurant.id" :initial-restaurant="restaurant" />
      </div>

      <!-- 分頁標籤 RestaurantPagination -->
      <RestaurantsPagination
          v-if="totalPage.length > 1"
          :current-page="currentPage"
          :total-page="totalPage"
          :category-id="categoryId"
          :previous-page="previousPage"
          :next-page="nextPage"
        />
    </template>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import RestaurantCard from '../components/RestaurantCard.vue'
import RestaurantsNavPills from '../components/RestaurantsNavPills.vue'
import RestaurantsPagination from '../components/RestaurantsPagination.vue'
import Spinner from './../components/Spinner'
import restaurantsAPI from '../apis/restaurants'
import { Toast } from '../utils/helpers'

export default {
  name: 'Restaurants',
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: undefined,
      currentPage: 1,
      totalPage: [],
      previousPage: undefined,
      nextPage: undefined,
      isLoading: true
    }
  },
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination,
    Spinner
  },
  methods: {
      async fetchRestaurants({queryPage, queryCategoryId}) {
          try {
            const response = await restaurantsAPI.getRestaurants({
                page: queryPage,
                categoryId: queryCategoryId
            })
            this.isLoading = false
            console.log(response)
            // 例外處理
            if (response.statusText !== 'OK') {
                throw new Error(response.statusText)
            }
            // data init
            const {
                restaurants,
                categories,
                categoryId,
                page,
                totalPage,
                prev,
                next
            } = response.data
            this.restaurants = restaurants
            this.categories = categories
            this.categoryId = categoryId
            this.currentPage = page
            this.totalPage = totalPage
            this.previousPage = prev
            this.nextPage = next
          } catch(e) {
              Toast.fire({
                  icon: 'error',
                  title: '無法取得餐廳資料，請稍後再試'
              })
              this.isLoading = false
              console.log(e)
          }
      }
  },
  created() {
    const { page = '', categoryId = '' } = this.$route.query
    this.fetchRestaurants({
        queryPage: page,
        queryCategoryId: categoryId
    })
  },
  beforeRouteUpdate(to, from, next) {
      const { page = '', categoryId = '' } = to.query
      this.fetchRestaurants({
        queryPage: page,
        queryCategoryId: categoryId
        })
      next()
  }
}
</script>