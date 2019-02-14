<script>
import firebase from 'firebase'
export default {
  name: 'master',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    }
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // this.$router.go({ path: this.$router.path })
          this.isLoggedIn = false
          this.currentUser = false
          this.$router.push({ path: '/login' })
          this.$toast.info({
            title: 'logged out',
            message: '88 see u next time'
          })
        })
    },
    islogged() {
      this.isLoggedIn = true
      this.currentUser = firebase.auth().currentUser.email
    },
    showNav() {
      let mainNav = document.getElementById('js-menu')
      mainNav.classList.toggle('active')
    }
  },
  created() {
    this.$eventBus.$on('logging', this.islogged, this)
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true
      this.currentUser = firebase.auth().currentUser.email
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" >
</style>
<style src="cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css">
</style>
