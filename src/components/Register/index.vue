<script>
import firebase from 'firebase'
export default {
  name: 'register',
  data() {
    return {
      username: '',
      password: '',
      serverError: ''
    }
  },
  methods: {
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.register()
        }
      })
    },
    register() {
      console.log(firebase)
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.username, this.password)
        .then(
          ({ user }) => {
            // console.log(user);
            alert(`Account Created for ${user.email}`)
            let successMessage = 'Register Successfuly'
            firebase
              .auth()
              .signOut()
              .then(() => {
                this.$router.push({
                  name: 'login',
                  params: { successMessage }
                })
                this.$toast.success({
                  title: successMessage,
                  message: 'logging here'
                })
              })
          },
          err => {
            this.serverError = err.message
          }
        )
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped>
</style>
<style src="cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css">
</style>
