<template>
  <div class="container py-5">
    <AdminRestaurantForm 
    @after-submit="handleAfterSubmit"
    :initial-restaurant="restaurant"
    :is-processing="isProcessing"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from './../components/AdminRestaurantForm.vue'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'


export default {
  components: {
    AdminRestaurantForm
  },
  data () {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryId: '',
        tel: '',
        address: '',
        description: '',
        image: '',
        openingHours: ''
      },
      isProcessing: false
    }
  },
  methods: {
    async handleAfterSubmit (formData) {
      // 透過 API 將表單資料送到伺服器
      try {
        this.isProcessing = true
        const { data } = await adminAPI.restaurants.update({
          restaurantId: this.restaurant.id,
          formData 
        })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$router.push({name: 'admin-restaurants'})
      } catch(e) {
        Toast.fire({
          icon: 'error',
          title: '無法修改餐廳資料，請稍後再試'
        })
        this.isProcessing = false
      }
    },
    async fetchRestaurant (restaurantId) {
      try {
        const response = await adminAPI.restaurants.getDetail({ restaurantId })
        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }
        const { id, name, CategoryId:categoryId, tel, address, description, image, opening_hours:openingHours } = response.data.restaurant
        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          categoryId,
          tel,
          address,
          description,
          image,
          openingHours
        }
      } catch(e) {
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
        console.log(e)
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  },
  created() {
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  }
}
</script>