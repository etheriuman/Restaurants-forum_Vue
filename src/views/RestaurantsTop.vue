<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading"/>
    <template v-else>
      <h1 class="mt-5">
        人氣餐廳
      </h1>
      <hr>
      <RestaurantTop v-for="restaurant in restaurants" :key="restaurant.id" :initial-restaurant="restaurant" />
    </template>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import RestaurantTop from '../components/RestaurantTop.vue'
import Spinner from './../components/Spinner'
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'

export default {
  components: {
    NavTabs,
    RestaurantTop,
    Spinner
  },
  data() {
    return {
      restaurants: [],
      isLoading: true
    }
  },
  methods: {
    async fetchTopRestaurants() {
        try {
            const response = await restaurantsAPI.getTopRestaurants()
            console.log(response)
            if (response.statusText !== 'OK') {
                throw new Error(response.statusText)
            }
            this.isLoading = false
            this.restaurants = response.data.restaurants
        } catch(e) {
            Toast.fire({
                icon: 'error',
                title: '無法取得人氣餐廳，請稍後再試'
            })
            this.isLoading = false
            console.log(e)
        }
    }
  },
  created() {
    this.fetchTopRestaurants()
  }
}
</script>