<template>
  <form @submit.prevent.stop="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea
        class="form-control"
        rows="3"
        name="text"
        v-model="text"
      />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button
        type="button"
        class="btn btn-link"
        @click="$router.back()"
      >回上一頁</button>
      <button
        type="submit"
        class="btn btn-primary mr-0"
        :disabled="isProcessing"
      >
        {{isProcessing? '處理中' : '送出'}}
      </button>
    </div>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    restaurantId: {
      type: Number,
      required: true
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      text: ''
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    handleSubmit() {
      // TODO: 向 API 發送 POST 請求
      // 伺服器新增 Comment 成功後...
      this.$emit('after-create-comment', {
        restaurantId: this.restaurantId,
        text: this.text
      })
      this.text = '' // 將表單內的資料清空
    }
  },
  watch: {
    initialRestaurantId(data) {
      this.restaurantId = {
        ...this.restaurantId,
        ...data
      }
    }
  }
}
</script>