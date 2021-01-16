<template>
  <div class="todo">
    <!-- Tab -->
    <div class="todo-tabs">
      <div class="todo-tabs__content">
        <button
          class="todo-tab__content__button"
          :class="{ 'todo-tab__content__button--active': tabName === 'all' }"
          data-type="all"
          @click="changeTab"
        >
          My Task
        </button>
        <button
          class="todo-tab__content__button"
          :class="{
            'todo-tab__content__button--active': tabName === 'progress',
          }"
          data-type="progress"
          @click="changeTab"
        >
          In Progress
        </button>
        <button
          class="todo-tab__content__button"
          :class="{
            'todo-tab__content__button--active': tabName === 'completed',
          }"
          data-type="completed"
          @click="changeTab"
        >
          Completed
        </button>
      </div>
    </div>
    <!-- 新增 -->
    <div class="todo-add">
      <input
        class="todo-add__input"
        type="text"
        placeholder="Add"
        v-model="addTitle"
        @focus="openTodo"
      />
      <!-- 引入 -->
      <transition name="slide">
        <todo-edit-form
          v-if="isOpen"
          :allAry="allAry"
          @add-todo="addTodo"
          @close-todo="closeTodo"
        ></todo-edit-form>
      </transition>
    </div>

    <!-- item -->
    <draggable v-model="filterTodo">
      <transition-group name="slide-left">
        <todo-item
          v-for="item in allAry"
          :key="item.id"
          :item="item"
          :allAry="allAry"
        ></todo-item>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import TodoItem from '@/components/todoItem.vue'
import TodoEditForm from '@/components/todoEdit.vue'
import draggable from 'vuedraggable'

export default {
  name: 'App',
  components: {
    TodoItem,
    TodoEditForm,
    draggable,
  },
  data() {
    return {
      isOpen: false,
      tabName: 'all',

      // 資料標題
      addTitle: '',
      // 原始資料
      allAry: [],
    }
  },
  methods: {
    // 切換tab
    changeTab(e) {
      this.isOpen = false
      this.tabName = e.target.dataset.type
    },
    // 開起視窗
    openTodo() {
      this.isOpen = true
    },
    // 關閉視窗
    closeTodo() {
      this.addTitle = ''
      this.isOpen = false
    },

    // 新增
    addTodo(data) {
      if (this.addTitle === '') return alert('請輸入標題')
      data.title = this.addTitle
      this.allAry.push(data)
      this.closeTodo()
    },
  },

  computed: {
    filterTodo() {
      switch (this.tabName) {
        case 'all':
          return this.allAry.sort((itemA, itemB) => {
            return itemA.fav ? -1 : 1
          })
        case 'progress':
          return this.allAry.filter((val) => !val.completed)
        case 'completed':
          return this.allAry.filter((val) => val.completed)
      }
    },
  },
}
</script>

<style lang="scss">
.todo {
  transition: all 0.5;
  // tabs
  &-tabs {
    display: flex;
    justify-content: center;
    background-color: #4b90e2;
    &__content {
      width: 620px;
      display: flex;

      .todo-tab__content__button {
        background-color: transparent;
        border: 0;
        flex: 1;
        padding: 24px;
        font-size: 1.5rem;
        font-weight: bold;
        color: white;
        width: cal;
        cursor: pointer;
      }
      // 點擊之後
      .todo-tab__content__button--active {
        position: relative;
        &::before {
          content: '';
          display: block;
          position: absolute;
          background-color: #01418b;
          height: 5px;
          width: 100%;
          bottom: 0;
          left: 0;
        }

        &::after {
          content: '';
          display: block;
          position: absolute;
          top: 85%;
          left: 50%;
          transform: translate(-50%, -50%);
          height: 5px;
          border-style: solid;
          border-width: 0 10px 10px 10px;
          border-color: transparent transparent #01418b transparent;
        }
      }
    }
  }

  // add
  &-add {
    width: 620px;
    margin: 20px auto;
    border-radius: 5px;
    transition: height 1s;
    overflow: hidden;

    .todo-add__input {
      position: relative;
      border: 0;
      width: 100%;
      padding: 16px 24px;
      font-size: 1.5rem;
      font-weight: bold;
      box-shadow: inset 0 0 2px #888;
      background-color: white;
      z-index: 1;
    }
  }
}
</style>
