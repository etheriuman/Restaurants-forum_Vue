<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block"
        :src="restaurant.image | emptyImage"
        style="width: 250px; margin-bottom: 25px"
      />
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{ restaurant.openingHours }}
          </li>
          <li>
            <strong>Tel:</strong>
            {{ restaurant.tel }}
          </li>
          <li>
            <strong>Address:</strong>
            {{ restaurant.address }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{ restaurant.description }}</p>
      <router-link class="btn btn-primary btn-border mr-2" :to="{name: 'dashboard', params: {id: restaurant.id}}">Dashboard</router-link>

      <button
        type="button"
        class="btn btn-danger btn-border mr-2"
        v-if="restaurant.isFavorited"
        @click.prevent.stop="addFavorite(restaurant.id)"
      >
        移除最愛
      </button>
      <button
        type="button"
        class="btn btn-primary btn-border mr-2"
        v-else
        @click.prevent.stop="deleteFavorite(restaurant.id)"
      >
        加到最愛
      </button>
      <button
        type="button"
        class="btn btn-danger like mr-2"
        v-if="restaurant.isLiked"
        @click.prevent.stop="addLike(restaurant.id)"
      >
        Unlike
      </button>
      <button
        type="button"
        class="btn btn-primary like mr-2"
        v-else
        @click.prevent.stop="deleteLike(restaurant.id)"
      >
        Like
      </button>
    </div>
  </div>
</template>

<script>
import {emptyImageFilter} from '.././utils/mixins'
export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
    }
  },
  mixins: [emptyImageFilter],
  methods: {
    addFavorite(restaurantId) {
      this.restaurant = {
        ...this.restaurant,
        isFavorited: true,
      }
        this.$emit('handleAddFavoriteButtonClick', restaurantId)
    },
    deleteFavorite(restaurantId) {
      this.restaurant = {
        ...this.restaurant,
        isFavorited: false,
      }
      this.$emit('handleDeleteFavoriteButtonClick', restaurantId)
    },
    addLike(restaurantId) {
      this.restaurant = {
        ...this.restaurant,
        isLiked: true,
      }
      this.$emit('handleAddLikeButtonClick', restaurantId)
    },
    deleteLike(restaurantId) {
      this.restaurant = {
        ...this.restaurant,
        isLiked: false,
      }
      this.$emit('handleDeleteLikeButtonClick', restaurantId)
    },
  },
}
</script>