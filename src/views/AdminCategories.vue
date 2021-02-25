<template>
  <div class="container py-5">
     <!-- 1. 使用先前寫好的 AdminNav -->
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input
            type="text"
            v-model="newCategoryName"
            class="form-control"
            placeholder="新增餐廳類別..."
          >
        </div>
        <div class="col-auto">
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent.stop="createCategory"
            :disabled="isProcessing"
          >
            {{isProcessing? '新增中' : '新增'}}
          </button>
        </div>
      </div>
    </form>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th
            scope="col"
            width="60"
          >
            #
          </th>
          <th scope="col">
            Category Name
          </th>
          <th
            scope="col"
            width="210"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="category in categories"
          :key="category.id"
        >
          <th scope="row">
            {{ category.id }}
          </th>
            <td class="position-relative">
              <div
              class="category-name"
              v-show="!category.isEditing"
              >
                {{ category.name }}
              </div>
              <input
                v-show="category.isEditing"
                v-model="category.name"
                type="text"
                class="form-control"
              >
              <span
                v-show="category.isEditing"
                class="cancel"
                @click.prevent.stop="handleCancle(category.id)"
              >
                ✕
              </span>
            </td>
            <td class="d-flex justify-content-between">
              <button
                type="button"
                class="btn btn-link mr-2"
                @click.prevent.stop="toggleIsEditing(category.id)"
                v-show="!category.isEditing"
              >
                Edit
              </button>
              <button
                v-show="category.isEditing"
                type="button"
                class="btn btn-link mr-2"
                @click.prevent.stop="updateCategory({categoryId: category.id, name: category.name})"
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-link mr-2"
                @click.prevent.stop="deleteCategory(category.id)"
                v-show="!category.isEditing"
              >
                Delete
              </button>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from './../components/AdminNav'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'

export default {
  components: {
    AdminNav
  },
  data () {
    return {
      newCategoryName: '',
      categories: [],
      isProcessing: false
    }
  },
  created () {
    this.fetchCategories()
  },
  methods: {
    async fetchCategories () {
      try {
        const response = await adminAPI.categories.get()
        if (response.statusText !== 'OK') {
          throw new Error(response.statusText)
        }
        this.categories = response.data.categories.map(category => ({
          ...category,
          isEditing: false,
          nameCached: ''
        }))
      } catch(e) {
        Toast.fire({
          icon: 'error',
          title: '無法取得類別資料，請稍後再試'
        })
        console.log(e)
      }
    },
    async createCategory() {
      try {
        this.isProcessing = true
        const name = {
          name: this.newCategoryName
        }
        const { data } = await adminAPI.categories.create({ name })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.categories.push({
          name: this.newCategoryName,
          id: data.categoryId
        })
          this.newCategoryName = ''
        this.isProcessing = false
      } catch(e) {
        Toast.fire({
          icon: 'error',
          title: '無法新增類別，請稍後再試'
        })
        this.isProcessing = false
        console.log(e)
      }
    },
    async deleteCategory(categoryId) {
      try {
        const { data } = await adminAPI.categories.delete({ categoryId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.categories = this.categories.filter(category => category.id !== categoryId)
      } catch(e) {
        Toast.fire({
          icon: 'error',
          title: '無法刪除類別，請稍後再試'
        })
        console.log(e)
      }
    },
    toggleIsEditing(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            nameCached: category.name
          }
        }
        return category
      })
    },
    async updateCategory({ categoryId, name }) {
      try {
        const { data } = await adminAPI.categories.update({ categoryId, name: {name} })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.toggleIsEditing(categoryId)
      } catch(e) {
        Toast.fire({
          icon: 'error',
          title: '無法編輯類別，請稍後再試'
        })
        console.log(e)
      }
    },
    handleCancle(categoryId) {
      this.categories = this.categories.map(category => {
        if (category.id === categoryId) {
          return {
            ...category,
            name: category.nameCached
          }
        }
        return category
      })
      this.toggleIsEditing(categoryId)
    }
  }
}
</script>

<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>