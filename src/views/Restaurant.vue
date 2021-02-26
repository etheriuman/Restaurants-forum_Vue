<template>
  <div class="container py-5">
    <h1>餐廳描述頁</h1>
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :initial-restaurant="restaurant" />
    <hr>
    <!-- 餐廳評論 RestaurantComments -->
    <RestaurantComments :initial-restaurant-comments="restaurantComments" @after-delete-comment="afterDeleteComment"/>
    <!-- 新增評論 CreateComment -->
    <CreateComment :restaurant-id="restaurant.id" :isProcessing="isProcessing" @after-create-comment="afterCreateComment" />
  </div>
</template>

<script>
import RestaurantDetail from '../components/RestaurantDetail.vue'
import RestaurantComments from '../components/RestaurantComments.vue'
import CreateComment from '../components/CreateComment.vue'
import { mapState } from 'vuex'
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'

export default {
  name: 'Restaurant',
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment
  },
  data() {
    return {
      restaurant: {
      id: -1,
      name: '',
      categoryName: '',
      image: '',
      openingHours: '',
      tel: '',
      address: '',
      description: '',
      isFavorited: false,
      isLiked: false
    },
    restaurantComments: [],
    isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        const response = await restaurantsAPI.getRestaurant({ restaurantId })
        this.isProcessing = false
        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }
        const {
          id,
          name,
          Category,
          image,
          opening_hours: openingHours,
          tel,
          address,
          description,
          Comments: restaurantComments
        } = response.data.restaurant
        const { isLiked, isFavorited } = response.data
        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          categoryName: Category? Category.name : '未分類',
          image,
          openingHours,
          tel,
          address,
          description,
          isLiked,
          isFavorited
        }
        this.restaurantComments = restaurantComments
      } catch(e) {
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資訊，請稍後再試'
        })
        console.log(e)
      }
    },
    async afterDeleteComment(commentId) {
      try {
        const { data } = await restaurantsAPI.comments.delete({ commentId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        console.log('about to filter')
        this.restaurantComments = this.restaurantComments.filter(comment => comment.id !== commentId)
      } catch(e) {
        Toast.fire({
          icon: 'error',
          title: '無法刪除留言，請稍後再試'
        })
        console.log(e)
      }
    },
    async afterCreateComment(payload) {
      try {
        this.isProcessing = true
        const { data } = await restaurantsAPI.comments.create({ payload })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        console.log('fetch again!')
        this.fetchRestaurant(this.restaurant.id)
      } catch(e) {
        Toast.fire({
          icon: 'error',
          title: '無法新增留言，請稍後再試'
        })
        this.isProcessing = false
        console.log(e)
      }
    }
  },
  created() {
    const {id: restaurantId} = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  beforeRouteUpdata(from, to, next) {
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  }
}
</script>