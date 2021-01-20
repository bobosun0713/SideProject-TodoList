<template>
  <div class="todo">
    <!-- Tab -->
    <div class="todo-tabs">
      <div class="todo-tabs__content">
        <button
          class="todo-tab__content__button"
          :class="{ 'todo-tab__content__button--active': tabName === 'all' }"
          data-type="all"
          @click="changeTab('all')"
        >
          My Task
        </button>
        <button
          class="todo-tab__content__button"
          :class="{
            'todo-tab__content__button--active': tabName === 'progress',
          }"
          @click="changeTab('progress')"
        >
          In Progress
        </button>
        <button
          class="todo-tab__content__button"
          :class="{
            'todo-tab__content__button--active': tabName === 'completed',
          }"
          @click="changeTab('completed')"
        >
          Completed
        </button>
      </div>
    </div>

    <!-- 新增 -->
    <div class="todo-add" :class="{ 'todo-add--open': isOpen }">
      <input
        class="todo-add__input"
        type="text"
        placeholder="Add"
        @focus="switchBtn"
        v-if="!isOpen"
      />
      <todo-edit-form
        v-else
        :allAry="allAry"
        @add-todo="addTodo"
        @close-todo="switchBtn"
      ></todo-edit-form>
    </div>

    <!-- item -->
    <draggable
      class="todo-list"
      v-model="allAry"
      handle=".todo-item__dropButton"
      animation="500"
      :style="{ height: getListHeight }"
    >
      <transition-group name="slide-left">
        <todo-item
          v-for="item in allArySort"
          :key="item.id"
          :item="item"
          :allAry="allAry"
        ></todo-item>
      </transition-group>
    </draggable>
    <!-- tasks left -->
    <p class="todo-tasks">{{ tasksLeft }} Tasks Left</p>
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

      // 原始資料
      allAry: [],
      // 篩選排序過資料
      filterAry: [],
    }
  },
  methods: {
    // 切換tab
    changeTab(tabName) {
      this.isOpen = false
      this.tabName = tabName
    },

    // 開關
    switchBtn() {
      this.isOpen = !this.isOpen
    },
    // 新增form
    addTodo(data) {
      this.allAry.push(data)
      this.switchBtn()
    },
  },

  computed: {
    // 原資料篩選
    allAryFilter() {
      switch (this.tabName) {
        case 'all':
          return (this.filterAry = this.allAry)

        case 'progress':
          return (this.filterAry = this.allAry.filter((val) => !val.completed))

        case 'completed':
          return (this.filterAry = this.allAry.filter((val) => val.completed))
      }
    },
    // 原資料排序
    allArySort() {
      return this.allAryFilter.sort((itemA, itemB) => {
        return Number(itemA.fav) > Number(itemB.fav) ? -1 : 1
      })
    },

    // 剩餘任務
    tasksLeft() {
      return this.allAry.filter((val) => !val.completed).length
    },

    // 計算高度
    getListHeight() {
      return this.filterAry.length * 105 + 'px'
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
    height: 65px;
    margin: 20px auto;
    border-radius: 5px;
    transition: all 0.5s;
    overflow: hidden;

    &--open {
      height: 485px;
    }

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

  // lists
  &-list {
    transition: all 0.5s;
    padding: 5px 0;
  }

  // tasks
  &-tasks {
    text-align: center;
    margin: 10px auto;
    font-size: 1.125rem;
    color: rgb(88, 85, 85);
  }
}
</style>
