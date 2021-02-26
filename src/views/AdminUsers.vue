<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            Email
          </th>
          <th scope="col">
            Role
          </th>
          <th
            scope="col"
            width="140"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user of users" :key="user.id">
          <th scope="row">
            {{user.id}}
          </th>
          <td>{{user.email}}</td>
          <td>{{user.isAdmin? 'Admin' : 'User'}}</td>
          <td>
            <button
              type="button"
              class="btn btn-link"
              @click.prevent.stop="toggleUserRole(user.id)"
              v-if="user.id !== currentUser.id"
            >
              set as {{user.isAdmin? 'user' : 'admin'}}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'
import AdminNav from '../components/AdminNav.vue'

export default {
  data() {
    return {
      users: []
    }
  },
  components: {
    AdminNav
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await adminAPI.users.get()
        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }
        this.users = response.data.users
      } catch(e) {
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
        console.log(e)
      }
    },
    toggleIsAdmin(userId) {
      this.users = this.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              isAdmin : !user.isAdmin
            }
          }
          return user
        })
    },
    async toggleUserRole(userId) {
      try {
        const user = this.users.filter(user => user.id === userId)
        console.log('user', user[0])
        const payLoad = {
          isAdmin: !user[0].isAdmin
        }
        console.log('payload', payLoad)
        const { data } = await adminAPI.users.update({ userId, payLoad })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.toggleIsAdmin(userId)
      } catch(e) {
        Toast.fire({
          icon: 'error',
          title: '無法切換使用者權限，請稍後再試'
        })
        console.log(e)
      }
    }
  },
  created() {
    this.fetchUsers()
  }
}
</script>