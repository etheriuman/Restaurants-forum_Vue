<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">
        最新動態
      </h1>
      <hr>
      <div class="row">
        <div class="col-md-6">
          <h3>最新餐廳</h3>
          <!-- 最新餐廳 NewestRestaurants -->
          <NewestRestaurants  :restaurants="restaurants" />
        </div>
        <div class="col-md-6">
          <!-- 最新評論 NewestComments-->
          <NewestComments  :comments="comments" />
          <h3>最新評論</h3>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import NewestRestaurants from '../components/NewestRestaurants.vue'
import NewestComments from '../components/NewestComments.vue'
import Spinner from './../components/Spinner'
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'


export default {
  name: 'RestaurantFeeds',
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments,
    Spinner
  },
  data() {
    return {
      restaurants: [],
      comments: [],
      isLoading: true
    }
  },
  methods: {
    async fetchFeeds() {
      try {
        const response = await restaurantsAPI.getFeeds()
        console.log(response)
        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }
        this.isLoading = false
        const { restaurants, comments } = response.data
        this.restaurants = restaurants
        this.comments = comments.filter(comment => comment.Restaurant && comment.text)
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
    this.fetchFeeds()
  }
}
</script>