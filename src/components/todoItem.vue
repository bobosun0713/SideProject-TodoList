<template>
  <div class="todo-item" :class="{ 'todo-item--active': item.fav }">
    <div class="todo-item__content" v-if="!isOpen">
      <div class="todo-item__dropButton" v-show="!isOpen && !item.completed">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- item-title -->
      <div class="todo-item__title">
        <input
          class="todo-item__title__checkbox"
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
      <div
        class="todo-item__control"
        :class="{ active: isBtnClick }"
        v-show="!item.completed"
        @click="controlClick"
      >
        <font-awesome-icon v-if="!isBtnClick" icon="fingerprint" class="icon" />
        <font-awesome-icon v-else icon="times" class="icon active" />

        <button class="todo-item__control-button" @click="pinClick">
          <font-awesome-icon :icon="['fas', 'star']" class="icon" />
        </button>
        <button class="todo-item__control-button" @click="toggleEditForm">
          <font-awesome-icon icon="pencil-alt" class="icon" />
        </button>
        <button class="todo-item__control-button" @click="deleteTodo">
          <font-awesome-icon icon="trash-alt" class="icon" />
        </button>
      </div>

      <!-- item-status -->
      <div class="todo-item__status" v-show="item.content || item.day">
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
      @close-todo="toggleEditForm"
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
      isBtnClick: false,
    }
  },
  methods: {
    // 開關編輯
    toggleEditForm() {
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
      let editIndex = this.allAry.findIndex((val) => val.id === data.id)
      this.allAry.splice(editIndex, 1, data)
      this.toggleEditForm()
    },

    controlClick() {
      this.isBtnClick = !this.isBtnClick
    },

    autoBtnHide(el) {
      if (!this.$el.contains(el.target)) {
        this.isBtnClick = false
      }
    },
  },

  mounted() {
    document.addEventListener('click', this.autoBtnHide)
  },
  destroyed() {
    document.removeEventListener('click', this.autoBtnHide)
  },
}
</script>

<style scoped lang="scss">
.todo-item {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 5px #dbdedf;
  margin: 0 auto;
  background-color: white;
  transition: all 0.5s;

  &:not(:first-child) {
    margin-top: 30px;
  }
  &--active {
    background-color: #9fe7ff;
  }

  // 拖拉小手
  &__dropButton {
    position: absolute;
    width: 30px;
    height: 50px;

    top: 0;
    bottom: 0;
    left: 0;
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
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #165675;
    }
  }

  // 滑動拖拉小手顯示
  &:hover &__dropButton {
    opacity: 1;
  }

  // 上層
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20px 30px;
    position: relative;
  }

  // 標題
  &__title {
    width: 50%;
    display: flex;
    align-items: center;

    &__checkbox {
      width: 20px;
      height: 20px;
    }

    &__input {
      color: #02428b;
      font-weight: bold;
      border: 0;
      padding: 5px 10px;
      margin-left: 5px;
      width: 100%;
      font-size: 1.25rem;
      background-color: transparent;
    }

    &__input--active {
      text-decoration: line-through;
    }
  }

  &__control {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    box-shadow: 0 0 5px #aeb0b1;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;

    &:active {
      box-shadow: 0 0 10px hsl(200, 72%, 66%);
    }

    &-button {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      box-shadow: 0 0 5px #aeb0b1;
      background-color: white;
      transition: all 0.6s;
      opacity: 0;
    }

    &.active {
      button {
        opacity: 1;
        z-index: 5;
        transition: all 0.6s;

        &:nth-of-type(1) {
          top: -35px;
          left: -30px;
        }
        &:nth-of-type(2) {
          top: 0;
          left: -60px;
          transition: all 0.6s 0.2s;
        }
        &:nth-of-type(3) {
          top: 35px;
          left: -30px;
          transition: all 0.6s 0.4s;
        }

        &:hover {
          transition: all 0.3s;
          box-shadow: 0 0 10px hsl(200, 72%, 66%);
        }
      }
    }
  }

  // 狀態
  &__status {
    width: 100%;
    margin: 5px 0 0 40px;

    &-state {
      margin-right: 15px;
      color: #888;
    }
  }
}
</style>
