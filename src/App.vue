<template>
  <div
    id="app"
    class="page-wrapper"
  >

    <calendar></calendar>
    <todoFilter></todoFilter>
    <todoInput />
    <div
      class="lds-hourglass"
      v-if="$store.state.loading"
    ></div>

    <div id='list'>
      <todoListItem
        v-for="item in todoIndex"
        :key="item"
        :index="item"
      ></todoListItem>
    </div>

  </div>
</template>

<script>
import todoInput from '@/components/TodoInput/index.vue'
import todoListItem from '@/components/TodoListItem/index.vue'
import calendar from '@/components/Calendar/index.vue'
import todoFilter from '@/components/TodoFilter/index.vue'
export default {
  components: {
    todoInput,
    todoListItem,
    calendar,
    todoFilter
  },
  data() {
    return {
      select: -1
    }
  },
  computed: {
    todoIndex() {
      // return this.$store.getters['todoIndex']
      return this.$store.getters.todoDBIndex(this.select)
    }
  },
  methods: {
    dateInfos(...args) {
      this.select = args[0] + 1
    }
  },
  created() {
    // this.$store.dispatch('INIT_TODOS')
    this.$eventBus.$on('dateInfos', this.dateInfos, this)
    //this.$store.dispatch('REALTIME_LISTENERS')
    // this.$store.dispatch('RETRIEVE_TODO')
  }
}
</script>

<style src="@/assets/style.css">
</style>
