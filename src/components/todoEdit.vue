<template>
  <div class="todo-form">
    <div class="todo-form__title">
      <input
        type="text"
        placeholder="請輸入標題"
        v-model="updateData.title"
        v-focus
        @keydown.13="updateType"
      />
    </div>
    <div class="todo-form__content">
      <div class="todo-form__content-date">
        <p class="todo-form__content-title">
          <font-awesome-icon icon="calendar-alt" class="icon-edit" />
          Deadline
        </p>
        <input
          class="todo-form__content-date__input"
          type="date"
          v-model="updateData.day"
        />
      </div>
      <div class="todo-form__content-file">
        <p class="todo-form__content-title">
          <font-awesome-icon icon="file-signature" class="icon-edit" />
          File File
        </p>
        <input
          class="todo-form__content-file__input"
          type="file"
          @change="getFileName"
        />
      </div>
      <div class="todo-form__content-text">
        <p class="todo-form__content-title">
          <font-awesome-icon icon="comments" class="icon-edit" />
          Comment
        </p>
        <textarea
          class="todo-form__content-text__textarea"
          v-model="updateData.content"
        ></textarea>
      </div>
    </div>
    <div class="todo-form__submit">
      <button class="todo-form__submit__cancel" @click="closeTodo">
        Cancel
      </button>
      <button class="todo-form__submit__button" @click="updateType">
        Add Task
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoEditForm',
  props: {
    item: {
      type: Object,
      default() {
        return {
          id: 0,
          title: '',
          day: '',
          file: '',
          content: '',
          fav: false,
          completed: false,
        }
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
      // 暫時儲存資料
      updateData: {},
    }
  },
  methods: {
    // 回傳關閉
    closeTodo() {
      this.$emit('close-todo')
    },

    // 判斷 新增 or 修改
    updateType() {
      if (this.updateData.title === '') return alert('請輸入標題')
      let chkAry = this.allAry.find((val) => val.id === this.item.id)
      !chkAry ? this.addAction() : this.editAction()
    },

    getFileName(e) {
      this.updateData.file = e.target.files[0].name
    },

    // 回傳新增
    addAction() {
      if (this.allAry.length === 0) {
        this.updateData.id = 1
      } else {
        let idx = Math.max(...this.allAry.map((val) => val.id))
        this.updateData.id = idx + 1
      }
      this.$emit('add-todo', this.updateData)
      // console.log('創建ID mounted =>', this.updateData.id)
    },

    // 回傳修改
    editAction() {
      // console.log('暫存ＩＤ', this.item.id)
      // console.log('檢測ＩＤ =>', this.updateData)
      this.$emit('edit-todo', this.updateData)
    },
  },
  mounted() {
    // 取資料
    this.updateData = { ...this.item } // 解構資料
  },
  // 自訂屬性
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.focus()
      },
    },
  },
}
</script>

<style scoped lang="scss">
.todo-form {
  background-color: #f2f2f2;
  box-shadow: inset 0 0 2px #888;
  transition: all 0.5s;

  // 標題
  &__title {
    border-bottom: 2px solid #888;

    > input {
      background-color: transparent;
      border: 0;
      height: 65px;
      width: 100%;
      padding: 0 20px;
      font-size: 1.25rem;
    }
  }

  // 資料
  &__content {
    padding: 20px 35px;

    //標提
    &-title {
      font-size: 1.25em;
      font-weight: bold;
      margin-bottom: 5px;
    }

    &-date,
    &-file {
      margin-bottom: 20px;
    }

    &-date {
      &__input {
        width: 100%;
        padding: 8px 12px;
      }
    }

    // 文字
    &-text {
      &__textarea {
        width: 100%;
        height: 100px;
        padding: 12px;
      }
    }
  }

  // 送出
  &__submit {
    display: flex;

    // 按鈕
    &__button,
    &__cancel {
      color: white;
      font-size: 1.25rem;
      padding: 20px;
      flex: 1;
      border: 0;
      font-weight: bold;
      background-color: white;
      cursor: pointer;
    }
    &__cancel {
      color: red;
    }
    &__button {
      background-color: #4a90e2;
    }
  }
}
</style>
