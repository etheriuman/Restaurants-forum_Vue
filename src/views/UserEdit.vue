<template>
  <div class="container py-5">
    <form @submit.prevent.stop="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="user.name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        >
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
        v-if="user.image"
        :src="user.image"
        class="d-block img-thumbnail mb-3"
        width="200"
        height="200"
      >
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleFileChange"
        >
      </div>

      <button
        type="submit"
        class="btn btn-primary"
        :disabled="isProcessing"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import usersAPI from './../apis/users'
import { mapState } from 'vuex'
import { Toast } from '../utils/helpers'

export default {
  name: 'UserEdit',
  data() {
    return {
      user: {
        id: -1,
        name: '',
        image: ''
      },
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    setUser() {
      this.user = {
        name: this.currentUser.name,
        image: this.currentUser.image
      }
    },
    checkUser(currentUserId) {
      const { id } = this.$route.params
      if (id !== currentUserId.toString()) {
        console.log('redirect')
        this.$router.push({name: 'not-found'})
      }
    },
    handleFileChange(e) {
      const { files } = e.target
      if (files.length === 0) {
        this.user.image = ''
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.user.image = imageURL
      }
    },
    async handleSubmit(e) {
      try {
        const form = e.target
        const formData = new FormData(form)
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`)
        }
        const { id } = this.currentUser
        console.log(id)
        this.isProcessing = true
        const { data } = await usersAPI.update({
          userId: id,
          formData
        })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$router.push({name: 'user', params: { id }})
      } catch(e) {
        Toast.fire({
          icon: 'error',
          title: '無法編輯使用者資料，請稍後再試'
        })
        this.isProcessing = false
        console.log(e)
      }
      
    }
  },
  created() {
    this.setUser()
  },
  watch: {
    currentUser(data) {
      console.log('data in')
      this.checkUser(data.id)
      this.user = {
        ...this.user,
        ...data
      }
    }
  }
}
</script>