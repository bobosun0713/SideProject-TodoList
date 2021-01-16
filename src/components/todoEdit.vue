<template>
  <div class="todo-form">
    <div class="todo-form__title">
      <input
        type="text"
        placeholder="請輸入標題"
        v-model="updateData.title"
        @keydown.13="updateType"
      />
    </div>
    <div class="todo-form__content">
      <div class="todo-form__content__date">
        <p>
          <font-awesome-icon icon="calendar-alt" class="icon-1" />
          Deadline
        </p>
        <input type="date" v-model="updateData.day" />
      </div>
      <div class="todo-form__content__file">
        <p>
          <font-awesome-icon icon="file-signature" class="icon-1" />
          File File
        </p>
        <input type="file" @change="getFileName" />
      </div>
      <div class="todo-form__content__text">
        <p>
          <font-awesome-icon icon="comments" class="icon-1" />
          Comment
        </p>
        <textarea class="" v-model="updateData.content"></textarea>
      </div>
    </div>
    <div class="todo-form__submit">
      <button class="todo-form__submit__button" @click="closeTodo">
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
      // 暫存修改id
      editId: 0,
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
      let chkAry = this.allAry.find((val) => val.id === this.editId)
      !chkAry ? this.addAction() : this.editAction()
    },

    getFileName(e) {
      this.updateData.file = e.target.files[0].name
    },

    // 回傳新增
    addAction() {
      this.$emit('add-todo', this.updateData)
    },

    // 回傳修改
    editAction() {
      this.updateData.id = this.editId
      this.$emit('edit-todo', this.updateData)
    },
  },
  mounted() {
    // 取資料
    this.editId = this.item.id // 暫存id
    this.updateData = { ...this.item } // 解構資料

    // 新建id
    let idx = this.allAry.map((val) => val.id)
    this.updateData.id = idx.length === 0 ? 1 : idx[idx.length - 1] + 1
    console.log('創建ID mounted =>', this.updateData.id)
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
    p {
      font-size: 1.25em;
      font-weight: bold;
      margin-bottom: 5px;
    }

    &__title,
    &__date,
    &__file {
      margin-bottom: 20px;
    }

    &__date {
      input {
        width: 100%;
        padding: 8px 12px;
      }
    }

    // 文字
    &__text {
      textarea {
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
    &__button {
      color: red;
      font-size: 1.25rem;
      padding: 20px;
      flex: 1;
      border: 0;
      font-weight: bold;
      background-color: white;
      cursor: pointer;
    }
    &__button:nth-of-type(2) {
      background-color: #4a90e2;
      color: white;
    }
  }
}
</style>
