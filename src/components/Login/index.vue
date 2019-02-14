<script>
import firebase from 'firebase'
export default {
  name: 'login',
  props: {
    successMessage: {
      type: String
    }
  },
  data() {
    return {
      username: '',
      password: '',
      serverError: '',
      success: this.successMessage,
      loading: false
    }
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.login()
        }
      })
    },
    login() {
      this.loading = true
      firebase
        .auth()
        .signInWithEmailAndPassword(this.username, this.password)
        .then(
          ({ user }) => {
            this.loading = false
            // this.$router.go({ path: this.$router.path })
            this.$eventBus.$emit('logging')
            this.$router.push({ path: '/todo' })
            this.$toast.success({
              title: 'logged in successfuly',
              message: 'todo here'
            })
          },
          err => {
            this.loading = false
            this.serverError = err.message
            this.password = ''
            this.success = ''
          }
        )
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped>
</style>
