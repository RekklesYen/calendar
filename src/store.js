import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/firebase'
import firebase from 'firebase'
Vue.use(Vuex)
let user = firebase.auth().currentUser
const LS = {
  load() {
    return JSON.parse(localStorage.getItem('todos') || '[]')
  },
  save(data) {
    localStorage.setItem('todos', JSON.stringify(data))
  }
}

const filter = {
  all(todos) {
    return todos
  },
  active(todos) {
    return todos.filter(todo => !todo.complete)
  },
  complete(todos) {
    return todos.filter(todo => todo.complete)
  }
}

export default new Vuex.Store({
  strict: true,
  state: {
    user: firebase.auth().email,
    todosFromDB: [],
    loading: false,
    filter: 'all',
    todos: []
  },
  getters: {
    todoIndex(state) {
      //回傳每件事的index
      return filter[state.filter](state.todos).map(todo =>
        state.todos.indexOf(todo)
      )
    },
    todoDBIndex: state => select => {
      //回傳每件事的index
      if (select !== -1) {
        let todos = state.todosFromDB.filter(todo => {
          return todo.day === select
        })
        return filter[state.filter](todos).map(todo =>
          state.todosFromDB.indexOf(todo)
        )
      }
    }
  },
  mutations: {
    SET_TODOS(state, data) {
      state.todos = data
      LS.save(state.todos)
    },
    ADD_TODO(state, data) {
      state.todosFromDB.push({
        id: data.id,
        content: data.content,
        complete: data.complete,
        year: data.year,
        month: data.month,
        day: data.day
      })
    },
    UPDATE_TODO(state, { index, data }) {
      state.todosFromDB[index].content = data.content
      state.todosFromDB[index].complete = data.complete
      // LS.save(state.todos)
    },
    REMOVE_TODO(state, index) {
      if (index >= 0) state.todosFromDB.splice(index, 1)

      // LS.save(state.todos)
    },
    SET_FILTER(state, filter) {
      state.filter = filter
    },
    RETRIEVE_TODO(state, todos) {
      state.loading = !state.loading
      state.todos = todos
    },
    IS_LOADING(state) {
      state.loading = !state.loading
    },
    INIT(state, todos) {
      state.loading = !state.loading
      state.todosFromDB = todos
    },
    NOTHING(state) {
      state.todosFromDB = []
      state.loading = !state.loading
    },
    USER(state) {
      state.user = firebase.auth().currentUser.email
    }
  },
  actions: {
    INIT({ commit }, filter) {
      commit('IS_LOADING')

      db.collection(this.state.user)
        .where('year', '==', filter.year)
        .where('month', '==', filter.month)
        .get()
        .then(results => {
          // console.log(results)
          if (!results.empty) {
            let temptodo = []
            results.forEach(result => {
              const todo = {
                id: result.data().id,
                content: result.data().title,
                complete: result.data().completed,
                year: result.data().year,
                month: result.data().month,
                day: result.data().day,
                timestamp: result.data().timestamp
              }
              temptodo.push(todo)
            })
            const todoSorted = temptodo.sort(
              (a, b) => a.timestamp.seconds - b.timestamp.seconds
            )
            commit('INIT', todoSorted)
          } else {
            commit('NOTHING')
          }
        })
    },
    INIT_TODOS({ commit }) {
      commit('SET_TODOS', LS.load())
    },
    CHANGE_FILTER({ commit }, filter) {
      commit('SET_FILTER', filter)
    },
    RETRIEVE_TODO({ commit }) {
      commit('IS_LOADING')
      db.collection(this.state.user)
        .get()
        .then(querySnapshot => {
          let tempTodos = []
          querySnapshot.forEach(doc => {
            // console.log(doc.data())
            const data = {
              id: doc.id,
              content: doc.data().title,
              complete: doc.data().completed,
              timestamp: doc.data().timestamp
            }
            tempTodos.push(data)
          })
          const todoSorted = tempTodos.sort(
            (a, b) => a.timestamp.seconds - b.timestamp.seconds
          )
          commit('RETRIEVE_TODO', todoSorted)
        })
    },
    ADD_TODO({ commit }, data) {
      db.collection(this.state.user)
        .add({
          title: data.content,
          completed: data.complete,
          timestamp: new Date(),
          year: data.year,
          month: data.month,
          day: data.day
        })
        .then(docRef => {
          commit('ADD_TODO', {
            id: docRef.id,
            content: data.content,
            complete: data.complete,
            year: data.year,
            month: data.month,
            day: data.day
          })
          db.collection(this.state.user)
            .doc(docRef.id)
            .set(
              {
                id: docRef.id
              },
              { merge: true }
            )
        })
    },
    DELETE_TODO({ commit }, index) {
      const id = this.state.todosFromDB[index].id
      console.log(index, id)
      db.collection(this.state.user)
        .doc(id)
        .delete()
        .then(() => {
          commit('REMOVE_TODO', index)
        })
    },
    UPDATE_TODO({ commit }, todo) {
      db.collection(this.state.user)
        .doc(todo.data.id)
        .set(
          {
            title: todo.data.content,
            completed: todo.data.complete
          },
          { merge: true }
        )
        .then(() => {
          commit('UPDATE_TODO', todo)
        })
    },
    REALTIME_LISTENERS({ commit }) {
      db.collection(user).onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          const index = this.state.todos.findIndex(
            todo => todo.id === change.doc.id
          )
          if (change.type === 'added') {
            const source = change.doc.metadata.hasPendingWrites
              ? 'Local'
              : 'Server'

            if (source === 'Server') {
              commit('ADD_TODO', {
                id: change.doc.id,
                content: change.doc.data().title,
                complete: change.doc.data().completed
              })
            }
          }
          if (change.type === 'modified') {
            commit('UPDATE_TODO', {
              index: index,
              data: {
                id: change.doc.id,
                content: change.doc.data().title,
                complete: change.doc.data().completed
              }
            })
          }
          if (change.type === 'removed') {
            commit('REMOVE_TODO', index)
          }
        })
      })
    }
  }
})
