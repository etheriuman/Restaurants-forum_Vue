<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </span>
    </div>

    <hr>

    <ul class="list-unstyled">
      <li>評論數： {{ restaurant.commentsLength }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button
      type="button"
      class="btn btn-link"
      @click="$router.back()"
    >
      回上一頁
    </button>
  </div>
</template>

<script>

const dummyData = {
    "restaurant": {
        "id": 13,
        "name": "Arvel Boehm",
        "tel": "1-747-219-7889 x2070",
        "address": "605 Pouros Terrace",
        "opening_hours": "08:00",
        "description": "Perferendis ut sed velit quaerat voluptatem ea quia. Sequi quia culpa ut officia omnis minus.",
        "image": "https://loremflickr.com/320/240/restaurant,food/?random=45.572223030594074",
        "viewCounts": 3,
        "createdAt": "2020-12-15T06:35:43.000Z",
        "updatedAt": "2021-02-12T09:17:57.000Z",
        "CategoryId": 4,
        "Category": {
            "id": 4,
            "name": "墨西哥料理",
            "createdAt": "2020-12-15T06:35:43.000Z",
            "updatedAt": "2020-12-15T06:35:43.000Z"
        },
        "Comments": [
            {
                "id": 13,
                "text": "Illo accusantium nihil.",
                "UserId": 3,
                "RestaurantId": 13,
                "createdAt": "2020-12-15T06:35:43.000Z",
                "updatedAt": "2020-12-15T06:35:43.000Z",
                "User": {
                    "id": 3,
                    "name": "user2",
                    "email": "user2@example.com",
                    "password": "$2a$10$IgMneSD6HZiHt0C6we./cOPyq70YhAWNZEqC4YTtJHK8ejgS1J/3q",
                    "isAdmin": false,
                    "image": null,
                    "createdAt": "2020-12-15T06:35:43.000Z",
                    "updatedAt": "2020-12-15T06:35:43.000Z"
                }
            },
            {
                "id": 63,
                "text": "Laborum non eligendi excepturi quia.",
                "UserId": 3,
                "RestaurantId": 13,
                "createdAt": "2020-12-15T06:35:43.000Z",
                "updatedAt": "2020-12-15T06:35:43.000Z",
                "User": {
                    "id": 3,
                    "name": "user2",
                    "email": "user2@example.com",
                    "password": "$2a$10$IgMneSD6HZiHt0C6we./cOPyq70YhAWNZEqC4YTtJHK8ejgS1J/3q",
                    "isAdmin": false,
                    "image": null,
                    "createdAt": "2020-12-15T06:35:43.000Z",
                    "updatedAt": "2020-12-15T06:35:43.000Z"
                }
            },
            {
                "id": 113,
                "text": "Ipsa qui eum.",
                "UserId": 2,
                "RestaurantId": 13,
                "createdAt": "2020-12-15T06:35:43.000Z",
                "updatedAt": "2020-12-15T06:35:43.000Z",
                "User": {
                    "id": 2,
                    "name": "user1",
                    "email": "user1@example.com",
                    "password": "$2a$10$m11qLlDOol1b3XCa393Bwe.hW4mt/6DS.mUsgFtati5LW4BbX81EG",
                    "isAdmin": false,
                    "image": "https://i.imgur.com/PhcKzNf.jpeg",
                    "createdAt": "2020-12-15T06:35:43.000Z",
                    "updatedAt": "2021-01-15T17:07:09.000Z"
                }
            },
            {
                "id": 6817,
                "text": "vgvg",
                "UserId": 7,
                "RestaurantId": 13,
                "createdAt": "2021-02-12T09:18:09.000Z",
                "updatedAt": "2021-02-12T09:18:09.000Z",
                "User": {
                    "id": 7,
                    "name": "123",
                    "email": "ben7152000@gmail.com",
                    "password": "$2a$10$gEUc6f3gn62yaOuq89gQLeUr4FbzGkVyMegUmbvPLEMi4Co76LXni",
                    "isAdmin": false,
                    "image": null,
                    "createdAt": "2021-02-12T09:16:05.000Z",
                    "updatedAt": "2021-02-12T09:16:05.000Z"
                }
            }
        ]
    }
}
export default {
  data() {
    return {
      restaurant: {
        id: undefined,
        name: '',
        categoryName: '',
        commentsLength: 0,
        viewCounts: 0
      }
    }
  },
  methods: {
    fetchData() {
      const {id, name, Category, Comments, viewCounts} = dummyData.restaurant
      this.restaurant = {
        id,
        name,
        categoryName: Category.name,
        commentsLength: Comments.length,
        viewCounts
      }
    }
  },
  created() {
    this.fetchData()
  }
}
</script>