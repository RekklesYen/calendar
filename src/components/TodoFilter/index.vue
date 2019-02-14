<script>
export default {
  name: 'todoFilter',
  data() {
    return {
      filter: 'all'
    }
  },
  methods: {
    changfilter(filter) {
      this.$store.dispatch('CHANGE_FILTER', filter)
      this.filter = filter
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped>
</style>
