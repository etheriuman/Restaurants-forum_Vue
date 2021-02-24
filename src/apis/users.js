import { apiHelper } from './../utils/helpers'

const getToken = () => localStorage.getItem('token')

export default {
  addFavorite({ restaurantId  }) {
    return apiHelper.post(`/favorite/${restaurantId}`, null, {headers: {Authorization: `Bearer ${getToken()}`}})
  },
  deleteFavorite({ restaurantId }) {
    return apiHelper.delete(`/favorite/${restaurantId}`, {headers: {Authorization: `Bearer ${getToken()}`}})
  },
  addLike({ restaurantId }) {
    return apiHelper.post(`/like/${restaurantId}`, null, {headers: {Authorization: `Bearer ${getToken()}`}})
  },
  deleteLike({ restaurantId }) {
    return apiHelper.delete(`/like/${restaurantId}`, {headers: {Authorization: `Bearer ${getToken()}`}})
  },
  // 美食達人
  getTopUsers() {
    return apiHelper.get('/users/top', {headers: {Authorization: `Bearer ${getToken()}`}})
  }
}