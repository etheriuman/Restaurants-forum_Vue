<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading"/>
    <template v-else>
      <h1 class="mt-5">
        美食達人
      </h1>
      <hr>
      <div class="row text-center">
        <UserCard v-for="user in users" :key="user.id" :initial-user="user" />
      </div>
    </template>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import UserCard from '../components/UserCard.vue'
import Spinner from './../components/Spinner'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  data() {
    return {
      users: [],
      isLoading: true
    }
  },
  components: {
    NavTabs,
    UserCard,
    Spinner
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await usersAPI.getTopUsers()
        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }
        this.isLoading = false
        this.users = response.data.users
      } catch(e) {
        Toast.fire({
          icon: 'error',
          title: '無法取得美食達人清單，請稍後再試'
        })
        this.isLoading = false
        console.log(e)
      }
      
    }
  },
  created() {
    this.fetchUsers()
  }
}
</script>