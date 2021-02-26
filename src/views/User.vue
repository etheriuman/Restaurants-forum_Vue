<template>
  <main role="main">
    <div class="album py-5 bg-light">
      <div class="container">
        <!-- user profile -->
        <UserProfileCard :initial-profile="profile" />
        <div class="row">
          <div class="col-md-4">
            <!-- user followings card -->
            <UserFollowingsCard :followings="followings" />
            <br>
            <!-- user followers card -->
            <UserFollowersCard :followers="followers" />
          </div>
          <div class="col-md-8">
            <!-- user comments card -->
            <UserCommentsCard :comments="comments" />
            <br>
            <!-- user favorite restaurant card -->
            <UserFavoritedRestaurantsCard :favorited-restaurants="favoritedRestaurants" />
          </div>
        </div>
       </div>
     </div>
   </main>
</template>

// ............................................................................

<script>
import UserProfileCard from '../components/UserProfileCard.vue'
import UserFollowingsCard from '../components/UserFollowingsCard.vue'
import UserFollowersCard from '../components/UserFollowersCard.vue'
import UserCommentsCard from '../components/UserCommentsCard.vue'
import UserFavoritedRestaurantsCard from '../components/UserFavoritedRestaurantsCard.vue'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'


export default {
  data() {
    return {
      profile: {
        id: -1,
        name: '',
        email: '',
        image: '',
        commentsLength: 0,
        favoritedRestaurantsLength: 0,
        followersLength: 0,
        followingsLength: 0,
        isFollowed: false
      },
      comments: [],
      favoritedRestaurants: [],
      followers: [],
      followings: []
    }
  },
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard
  },
  methods: {
    async fetchUser(userId) {
      try {
        const response = await usersAPI.get({ userId })
        console.log(response)
        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }
        // data init
        const {id, name, email, image, Comments, FavoritedRestaurants, Followers, Followings} = response.data.profile
        const { isFollowed } = response.data
        this.profile = {
          id,
          name,
          email,
          image,
          isFollowed,
          commentsLength: Comments.length,
          favoritedRestaurantsLength: FavoritedRestaurants.length,
          followersLength: Followers.length,
          followingsLength: Followings.length,
        },
        this.comments = Comments,
        this.favoritedRestaurants = FavoritedRestaurants,
        this.followers = Followers,
        this.followings = Followings
      } catch(e) {
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
        console.log(e)
      }
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchUser(id)
  },
  beforeRouteUpdata(from, to, next) {
    const { id } = to.params
    this.fetchUser(id)
    next()
  }
}
</script>