<script>
export default {
  name: 'todoInput',
  data() {
    return {
      todo: '',
      year: '',
      month: '',
      day: ''
    }
  },
  computed: {
    bus() {
      return this.$eventBus
    }
  },
  methods: {
    submitHandler() {
      console.log(this.date)
      if (!this.todo) return
      this.$store.dispatch('ADD_TODO', {
        date: this.date,
        content: this.todo,
        complete: false,
        year: this.year,
        month: this.month + 1,
        day: this.day + 1
      })
      this.todo = ''
    },
    dateInfos(...args) {
      this.year = args[1]
      this.month = args[2]
      this.day = args[0]
    }
  },
  created() {
    this.$eventBus.$on('dateInfos', this.dateInfos, this)
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped>
</style>
