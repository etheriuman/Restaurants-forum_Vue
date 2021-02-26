<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="profile.image | emptyImage" width="300px" height="300px">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{profile.name}}</h5>
          <p class="card-text">
            {{profile.email}}
          </p>
          <ul class="list-unstyled list-inline">
            <li><strong>{{profile.commentsLength}}</strong> 已評論餐廳</li>
            <li><strong>{{profile.favoritedRestaurantsLength}}</strong> 收藏的餐廳</li>
            <li><strong>{{profile.followersLength}}</strong> followings (追蹤者)</li>
            <li><strong>{{profile.followingsLength}}</strong> followers (追隨者)</li>
          </ul>
          <p>
            <router-link :to="{name: 'user-edit', params: {id: profile.id}}">
              <button type="submit" v-if="profile.id === currentUser.id" class="btn btn-primary">edit</button>
            </router-link>
            <button
            v-if="profile.isFollowed && profile.id !== currentUser.id"
            type="submit"
            class="btn btn-danger"
            @click.prevent.stop="deleteFollowing(profile.id)"
            :disabled="isProcessing"
            >取消追蹤
            </button>
            <button
            v-if="!profile.isFollowed && profile.id !== currentUser.id"
            type="submit"
            class="btn btn-primary"
            @click.prevent.stop="addFollowing(profile.id)"
            :disabled="isProcessing"
            >追蹤
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {emptyImageFilter} from '.././utils/mixins'
import { mapState } from 'vuex'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  props: {
    initialProfile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      profile: this.initialProfile,
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async addFollowing(userId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.addFollowing({ userId })
        if (data.status !== 'success') {
          throw new Error(data.status)
        }
        this.profile = {
          ...this.profile,
          isFollowed: true
        }
        this.isProcessing = false
      } catch(e) {
        Toast.fire({
          icon: 'error',
          title: '無法追蹤使用者，請稍後再試'
        })
        this.isProcessing = false
        console.log(e)
      }
    },
    async deleteFollowing(userId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.deleteFollowing({ userId })
        if (data.status !== 'success') {
          throw new Error(data.status)
        }
        this.profile = {
          ...this.profile,
          isFollowed: false
        }
        this.isProcessing = false
      } catch(e) {
        Toast.fire({
          icon: 'error',
          title: '無法退追使用者，請稍後再試'
        })
        this.isProcessing = false
        console.log(e)
      }
    }
  },
  watch: {
    initialProfile(data) {
      this.profile = {
        ...this.profile,
        ...data
      }
    }
  },
  mixins: [emptyImageFilter]
}
</script>