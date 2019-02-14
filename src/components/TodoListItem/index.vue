<script>
export default {
  data() {
    return {
      edit: null
    }
  },
  name: 'todoListItem',
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    todo() {
      // return this.$store.state.todos[this.index]
      return this.$store.state.todosFromDB[this.index]
    },
    complete: {
      get() {
        return this.todo.complete
      },
      set(val) {
        this.$store.dispatch('UPDATE_TODO', {
          index: this.index,
          data: {
            id: this.todo.id,
            content: this.todo.content,
            complete: val
          }
        })
      }
    }
  },
  methods: {
    destroyHandler() {
      if (confirm('delete?')) this.$store.dispatch('DELETE_TODO', this.index)
    },
    editHandler() {
      this.edit = this.todo.content
      this.cache = this.todo.content
    },
    submitHandler() {
      if (!this.edit) return

      this.$store.dispatch('UPDATE_TODO', {
        index: this.index,
        data: {
          id: this.todo.id,
          content: this.edit,
          complete: this.todo.complete
        }
      })
      this.cancelHandler()
    },
    cancelHandler() {
      this.edit = null
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped>
</style>
