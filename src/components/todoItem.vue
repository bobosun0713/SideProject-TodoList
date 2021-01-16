<template>
  <div class="todo-item" :class="{ 'todo-item--active': item.completed }">
    <div class="todo-item__content">
      <!-- item-title -->
      <div class="todo-item__title">
        <input
          class="todo-item__title__chkbox"
          type="checkbox"
          v-model="item.completed"
        />
        <input
          class="todo-item__title__input"
          :class="{ 'todo-item__title__input--active': item.completed }"
          type="text"
          :disabled="!isOpen"
          v-model="item.title"
        />
      </div>
      <!-- item-control -->
      <div class="todo-item__control">
        <button class="todo-item__control__button" @click="pinClick">
          <font-awesome-icon
            :icon="['far', 'star']"
            class="icon-1 iconStar"
            :class="{ 'iconStar-opacity': item.fav }"
          />
          <font-awesome-icon
            :icon="['fas', 'star']"
            :class="{ 'iconStar-opacity': !item.fav }"
            class="icon-2"
          />
        </button>
        <button class="todo-item__control__button" @click="openEdit">
          <font-awesome-icon icon="pencil-alt" class="icon-1" />
        </button>
      </div>
      <!-- item-status -->
      <div class="todo-item__status">
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>
    </div>
    <!-- 引入 -->
    <transition name="slide">
      <todo-edit-form
        :item="item"
        :allAry="allAry"
        @close-todo="closeTodo"
        @edit-todo="editTodo"
        v-if="isOpen"
      ></todo-edit-form>
    </transition>
  </div>
</template>

<script>
import TodoEditForm from '@/components/todoEdit.vue'
export default {
  name: 'todoItem',
  components: {
    TodoEditForm,
  },
  props: {
    item: {
      type: Object,
      default: function() {
        return {}
      },
    },
    allAry: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      isOpen: false,
      // 暫存明抽
      editTitle: '',
    }
  },
  methods: {
    // 開啟編輯
    openEdit() {
      this.isOpen = true
    },
    // 關閉編輯
    closeTodo() {
      this.item.title = this.editTitle
      this.isOpen = false
    },

    // 釘選
    pinClick() {
      this.item.fav = !this.item.fav
    },

    // 修改
    editTodo(data) {
      data.title = this.item.title
      let editIndex = this.allAry.findIndex((val) => val.id === data.id)
      this.allAry.splice(editIndex, 1, data)
      this.isOpen = false
    },
  },
  mounted() {
    this.editTitle = this.item.title
  },
}
</script>

<style scoped lang="scss">
.todo-item {
  overflow: hidden;
  height: auto;
  width: 620px;
  border-radius: 5px;
  box-shadow: 0 0 7px #888;
  margin: 0 auto;
  background-color: #f1f1f1;

  // 上層
  .todo-item__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px 30px;

    // 標題
    .todo-item__title {
      width: 50%;
      display: flex;
      align-items: center;

      &__chkbox {
        width: 25px;
        height: 25px;
      }

      &__input {
        transition: all 0.5s;
        border: 0;
        padding: 5px 10px;
        margin-left: 5px;
        width: 100%;
        font-size: 1.25rem;
        background-color: #f1f1f1;
      }

      &__input--active {
        font-size: 1.5rem;
        text-decoration: line-through;
      }
    }
    // 按鈕
    .todo-item__control {
      align-self: flex-end;

      &__button {
        border: 0;
        background-color: transparent;
        cursor: pointer;
      }
      &__button:nth-of-type(1) {
        position: relative;
        margin-right: 15px;
      }
    }

    // 狀態
    .todo-item__status {
      width: 100%;
      margin: 5px 0 0 40px;
    }
  }
}

.todo-item--active {
  background-color: wheat;
}

.todo-item + .todo-item {
  margin-top: 20px;
}
</style>
