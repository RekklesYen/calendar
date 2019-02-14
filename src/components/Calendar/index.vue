<script>
export default {
  name: 'calendar',
  data() {
    return {
      tags: '日一二三四五六',
      days: [],
      selectedDay: 0,
      startDay: 1,
      lunarShift: 5,
      newItem: {
        title: '',
        time: '',
        type: ''
      },
      month_olympic: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      month_normal: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      month_name: [
        'January',
        'Febrary',
        'March',
        'April',
        'May',
        'June',
        'July',
        'Auguest',
        'September',
        'October',
        'November',
        'December'
      ],
      month: 0,
      year: 2019
    }
  },
  computed: {
    init() {
      this.init_days()
      let temp = this.days
      // console.log('init')
      // console.log(this.$store.state.todosFromDB)

      this.$store.state.todosFromDB.forEach(todo => {
        temp[todo.day - 1].events.push(todo)
      })
      // console.log(temp)
      // console.log('init done')
      return temp
    },
    getDateinfo() {
      let date = new Date()

      return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    }
  },
  methods: {
    clickHandler(id) {
      this.selectedDay = id
      this.$eventBus.$emit('dateInfos', this.selectedDay, this.year, this.month)
    },
    chinese_num(num) {
      var list = '十一二三四五六七八九'
      return list[num]
    },
    lunar(num) {
      if (num > 30) num = num % 30
      if (num < 11) {
        return '初' + this.chinese_num(num % 10)
      } else if (num < 20) {
        return '十' + this.chinese_num(num % 10)
      } else if (num == 20) {
        return '二十'
      } else if (num < 30) {
        return '廿' + this.chinese_num(num % 10)
      } else if (num < 40) {
        return '三' + this.chinese_num(num % 10)
      }
    },
    get_pan(id) {
      if (id !== 0) return null
      else return { 'margin-left': `calc( ${this.startDay} * 100% / 7)` }
    },
    getDayStart(year, month) {
      return new Date(year, month, 1).getDay()
    },
    changeHandler(i) {
      //
      this.month += i

      if (this.month === 12) this.year++
      if (this.month < 0) {
        this.month = 11
        this.year--
      }
      this.month %= 12
      this.startDay = this.getDayStart(this.year, this.month)
      this.$store.commit('USER')
      this.$store.dispatch('INIT', {
        year: this.year,
        month: this.month + 1
      })

      this.selectedDay = 0
      this.$eventBus.$emit('dateInfos', this.selectedDay, this.year, this.month)
    },
    init_days() {
      this.days = []
      let daysOfMonth = this.month_normal[this.month]

      for (let i = 1; i <= daysOfMonth; i++) {
        let newDay = {
          num: i,
          events: []
        }
        this.days.push(newDay)
      }
    }
  },
  mounted() {
    let date = new Date()
    date = new Date(date.setDate(1))
    let weekday = date.getDay()
    this.startDay = weekday

    this.selectedDay = this.getDateinfo.day - 1
    this.month = this.getDateinfo.month - 1
    this.init_days()
    this.$eventBus.$emit('dateInfos', this.selectedDay, this.year, this.month)
    this.$store.commit('USER')
    this.$store.dispatch('INIT', {
      year: this.year,
      month: this.month + 1
    })
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped>
</style>
