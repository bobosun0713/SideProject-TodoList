<template>
  <div class="todo">
    <!-- Tab -->
    <div class="todo__control">
      <div
        class="todo__tabs--bg"
        :style="{ transform: `translateX(${getTabWidth}px)` }"
      ></div>
      <div class="todo__tabs">
        <button
          ref="tabBtn"
          class="todo__tabs-button"
          :class="{ active: tabName === 'all' }"
          data-type="all"
          @click="changeTab('all')"
        >
          My Task
        </button>
        <button
          class="todo__tabs-button"
          :class="{
            active: tabName === 'progress',
          }"
          @click="changeTab('progress')"
        >
          In Progress
        </button>
        <button
          class="todo__tabs-button"
          :class="{
            active: tabName === 'completed',
          }"
          @click="changeTab('completed')"
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
        @focus="switchBtn"
        v-if="!isOpen"
      />
      <todo-edit-form
        v-else
        :allAry="allAry"
        class="todo-add--form"
        @add-todo="addTodo"
        @close-todo="switchBtn"
      ></todo-edit-form>
    </div>

    <!-- item -->
    <draggable
      class="todo-list"
      v-model="allAry"
      handle=".todo-item__dropButton"
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
      tabWidth: null,
      // 原始資料
      allAry: [],
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
      let status = null
      switch (this.tabName) {
        case 'all':
          return this.allAry
        case 'progress':
          status = false
          break
        case 'completed':
          status = true
          break
      }
      return this.allAry.filter((val) => val.completed === status)
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

    // 計算tab動畫
    getTabWidth() {
      let btnWidth =
        this.tabName === 'all' ? 10 : this.tabName === 'progress' ? 1 : 2
      return btnWidth === 10 ? btnWidth : btnWidth * this.tabWidth + 8.5
    },
  },
  mounted() {
    this.tabWidth = this.$refs.tabBtn.clientWidth
    window.addEventListener('resize', () => {
      let screen = document.documentElement.clientWidth
      if (screen <= 767) {
        this.tabWidth = this.$refs.tabBtn.clientWidth
      }
    })
  },
}
</script>

<style lang="scss">
.todo {
  width: 500px;
  height: 700px;
  background-color: white;
  box-shadow: 0 0 20px #9fe7ff;
  border-radius: 16px;
  overflow: hidden;

  @include breakpoint('mobile') {
    width: 100%;
    height: 100%;
    box-shadow: unset;
    border-radius: 0;
  }

  &__control {
    position: relative;
    border-radius: 16px;
    background: linear-gradient(45deg, #16ebff, #48c1ff);

    @include breakpoint('mobile') {
      border-radius: 0;
    }
  }
  // tabs
  &__tabs {
    position: relative;
    z-index: 1;
    display: flex;
    border-radius: 16px;

    &-button {
      flex: 1;
      padding: 32px 0;
      font-weight: bold;
      color: white;
      font-size: 20px;
      transition: color 1s;

      @include breakpoint('mobile') {
        font-size: 18px;
      }
      @include breakpoint('x-mobile') {
        font-size: 16px;
      }

      &.active {
        color: #4b90e2;
      }
    }

    &--bg {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      transform: translateX(10px);
      height: 40px;
      width: calc(100% / 3 - 20px);
      transition: transform 0.6s;
      z-index: 0;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        height: 40px;
        width: 140px;
        border-radius: 20px;
        background-color: white;
        @include breakpoint('mobile') {
          width: calc(100% - 5px);
        }
      }
    }
  }

  // add
  &-add {
    width: calc(100% - 60px);
    margin: 20px auto;
    height: 55px;
    border-radius: 5px;
    transition: all 0.6s;
    position: relative;

    @include breakpoint('mobile') {
      margin: 15px auto 10px;
      width: calc(100% - 20px);
    }
    @include breakpoint('x-mobile') {
      height: 45px;
    }

    &__input {
      border: 0;
      border-radius: 50px;
      width: 100%;
      padding: 16px 24px;
      font-size: 1.25rem;
      font-weight: bold;
      box-shadow: inset 0 0 2px #888;
      background-color: white;

      @include breakpoint('mobile') {
        font-size: 18px;
      }
      @include breakpoint('x-mobile') {
        font-size: 16px;
      }
    }

    &--form {
      position: absolute;
      z-index: 10;
    }
  }

  // lists
  &-list {
    width: calc(100% - 60px);
    height: 460px;
    margin: 0 auto;
    overflow-y: scroll;
    overflow-x: hidden;

    padding: 20px 10px;
    position: relative;

    @include breakpoint('mobile') {
      width: calc(100% - 20px);
      height: calc(100% - 200px);
    }
  }

  // tasks
  &-tasks {
    text-align: center;
    margin: 10px auto;
    font-size: 1.125rem;
    color: rgb(88, 85, 85);
  }
}

.slide-left-move {
  opacity: 1;
}
.slide-left-enter,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-300px);
}
.slide-left-leave-active {
  position: absolute;
}
</style>
