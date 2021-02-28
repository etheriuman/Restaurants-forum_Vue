import { apiHelper } from '../utils/helpers'

export default {
  getRestaurants({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`/restaurants?${searchParams.toString()}`)
  },
  getFeeds() {
    return apiHelper.get('/restaurants/feeds')
  },
  getTopRestaurants() {
    return apiHelper.get('/restaurants/top')
  },
  getRestaurant({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}`)
  },
  comments: {
    create({ payload }) {
      return apiHelper.post('/comments', payload)
    },
    delete({ commentId }) {
      return apiHelper.delete(`/comments/${commentId}`)
    }
  }
}