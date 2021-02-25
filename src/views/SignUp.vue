<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign Up
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input
          id="name"
          name="name"
          v-model="name"
          type="text"
          class="form-control"
          placeholder="name"
          autocomplete="username"
          required
          autofocus
        >
      </div>

      <div class="form-label-group mb-2">
        <label for="email">Email</label>
        <input
          id="email"
          name="email"
          v-model="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="email"
          required
        >
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          v-model="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          required
        >
      </div>

      <div class="form-label-group mb-3">
        <label for="password-check">Password Check</label>
        <input
          id="password-check"
          name="passwordCheck"
          v-model="passwordCheck"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          required
        >
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signin">
            Sign In
          </router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2017-2018
      </p>
    </form>
  </div>
</template>

<script>
import signUpAPI from './../apis/signUp'
import { Toast } from './../utils/helpers'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit() {
      if (!this.name) {
        Toast.fire({
          icon: 'warning',
          title: '請填寫名稱'
        })
        return
      }
      if (!this.email) {
        Toast.fire({
          icon: 'warning',
          title: '請填寫email'
        })
        return
      }
      if (!this.password) {
        Toast.fire({
          icon: 'warning',
          title: '請填寫密碼'
        })
        return
      }
      if (!this.passwordCheck) {
        Toast.fire({
          icon: 'warning',
          title: '請填寫密碼確認'
        })
        return
      }
      if (this.password !== this.passwordCheck) {
        Toast.fire({
          icon: 'warning',
          title: '密碼確認不一致，請再次填寫'
        })
        this.passwordCheck = ''
        return
      }
      try {
        // const form = e.target
        // console.log(form)
        // const formData = new FormData(form)
        // for (let [key, value] of formData.entries()) {
        //   console.log(`${key}: ${value}`)
        // }
        const formData = {
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck
        }
        this.isProcessing = true
        const { data } = await signUpAPI.signUp({ formData })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: 'success',
          title: '註冊成功'
        })
        this.$router.push({name: 'sign-in'})
      } catch(e) {
        Toast.fire({
          icon: 'error',
          title: '無法註冊帳號，請稍後再試'
        })
        this.isProcessing = false
        console.log(e)
      }
    }
  }
}
</script>