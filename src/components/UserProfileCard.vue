<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="profile.image | emptyImageFilter" width="300px" height="300px">
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
            <a href="/users/1/edit"><button type="submit" class="btn btn-primary">edit</button></a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {emptyImageFilter} from '.././utils/mixins'
export default {
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  mixins: [emptyImageFilter]
}
</script>