<template>
  <div
    class="todo-item"
    :class="{ 'todo-item--active': item.fav, 'todo-item--open': isOpen }"
  >
    <div class="todo-item__dropButton" v-show="!isOpen && !item.completed">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div class="todo-item__content" v-if="!isOpen">
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
          disabled
          v-model="item.title"
        />
      </div>

      <!-- item-control -->
      <div class="todo-item__control">
        <button class="todo-item__control__button" @click="pinClick">
          <font-awesome-icon
            :icon="['far', 'star']"
            class="icon-edit"
            v-if="!item.fav"
          />
          <font-awesome-icon
            v-else
            :icon="['fas', 'star']"
            class="icon-edit--star"
          />
        </button>
        <button
          class="todo-item__control__button"
          @click="switchBtn"
          v-show="!item.completed"
        >
          <font-awesome-icon icon="pencil-alt" class="icon-edit" />
        </button>
        <button class="todo-item__control__button" @click="deleteTodo">
          <font-awesome-icon icon="trash-alt" class="icon-edit" />
        </button>
      </div>

      <!-- item-status -->
      <div class="todo-item__status">
        <span class="todo-item__status-state" v-show="item.day">
          <font-awesome-icon icon="calendar-alt" />
          {{ item.day }}
        </span>
        <span class="todo-item__status-state" v-show="item.file"
          ><font-awesome-icon icon="file-signature"
        /></span>
        <span class="todo-item__status-state" v-show="item.content"
          ><font-awesome-icon icon="comments"
        /></span>
      </div>
    </div>

    <!-- 引入 -->
    <todo-edit-form
      v-else
      :item="item"
      :allAry="allAry"
      @edit-todo="editTodo"
      @close-todo="switchBtn"
    ></todo-edit-form>
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
      default() {
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
    }
  },
  methods: {
    // 開關編輯
    switchBtn() {
      this.isOpen = !this.isOpen
    },

    // 釘選
    pinClick() {
      this.item.fav = !this.item.fav
    },

    // 刪除
    deleteTodo() {
      let deleteIdx = this.allAry.findIndex((val) => val.id === this.item.id)
      this.allAry.splice(deleteIdx, 1)
    },

    // 修改
    editTodo(data) {
      console.log('chkID', data.id)
      let editIndex = this.allAry.findIndex((val) => val.id === data.id)
      this.allAry.splice(editIndex, 1, data)
      this.switchBtn()
    },
  },
}
</script>

<style scoped lang="scss">
.todo-item {
  width: 620px;
  max-height: 105px;
  border-radius: 5px;
  box-shadow: 0 0 7px #888;
  margin: 0 auto;
  background-color: #f1f1f1;
  // transition: all 0.5s;
  position: relative;

  // 拖拉小手
  &__dropButton {
    position: absolute;
    width: 30px;
    height: 50px;

    top: 0;
    bottom: 0;
    margin: auto;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    opacity: 0;
    transition: opacity 0.5s;
    cursor: pointer;

    > span {
      display: inline-block;
      margin: 2px 0;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #888;
    }
  }

  &--open {
    max-height: 485px;
  }

  // 滑動拖拉小手顯示
  &:hover &__dropButton {
    opacity: 1;
  }

  // 拖拉時
  &:active {
    background-color: #fad49e;
  }

  // 上層
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    // position: relative;
    // z-index: 2;
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
        color: #02428b;
        font-weight: bold;
        transition: all 0.5s;
        border: 0;
        padding: 5px 10px;
        margin-left: 5px;
        width: 100%;
        font-size: 1.25rem;
        background-color: transparent;
      }

      &__input--active {
        font-size: 1.5rem;
        text-decoration: line-through;
      }
    }
    // 按鈕
    .todo-item__control {
      &__button {
        border: 0;
        background-color: transparent;
        margin-left: 15px;
        cursor: pointer;
      }
    }

    // 狀態
    .todo-item__status {
      width: 100%;
      margin: 5px 0 0 40px;

      &-state {
        margin-right: 15px;
        color: #888;
      }
    }
  }
}
.todo-item + .todo-item {
  margin-top: 20px;
}

// 修飾效果
.todo-item--active {
  background-color: antiquewhite;
}
</style>
