<template>
  <div
      class="card mb-3"
      style="max-width: 540px;margin: auto;"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <a href="#">
            <img
              class="card-img"
              :src="restaurant.image || 'https://i.pinimg.com/originals/4e/24/f5/4e24f523182e09376bfe8424d556610a.png'"
            >
          </a>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              {{restaurant.name}}
            </h5>
            <span class="badge badge-secondary">收藏數：{{restaurant.FavoriteCount}}</span>
            <p class="card-text">
              {{restaurant.description}}
            </p>
            <router-link
              :to="{name: 'restaurant', params: {id: restaurant.id}}"
              class="btn btn-primary mr-2"
            >Show</router-link>

            <button
              type="button"
              class="btn btn-danger mr-2"
              v-if="restaurant.isFavorited"
              @click.prevent.stop="deleteFavorite"
            >
              移除最愛
            </button>
            <button
              type="button"
              class="btn btn-primary"
              v-else
              @click.prevent.stop="addFavorite"
            >
              加到最愛
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      restaurant: this.initialRestaurant
    }
  },
  methods: {
    addFavorite() {
      this.restaurant = {
        ...this.restaurant,
        isFavorited: true
      }
    },
    deleteFavorite() {
      this.restaurant = {
        ...this.restaurant,
        isFavorited: false
      }
    }
  }
}
</script>