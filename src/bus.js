let Bus = function(vue) {
  this.handles = {
    // 'event': [callback,callback]      哪一個事件 裡面包含所有有關的function
  }
  this.eventUIDMap = {
    //  'uid':{         在移除時 誰要移除(uid) 移除甚麼事(event) 移除那些功能(callback)
    //   'event':[callback,callback]
    // }
  }
  this.$on = (event, callback, vm) => {
    if (!this.handles[event]) this.handles[event] = []
    if (callback instanceof Function) this.handles[event].push(callback)
    if (vm instanceof vue) this.setEventUIDMap(vm._uid, event, callback)
  }

  this.setEventUIDMap = (uid, event, callback) => {
    if (!this.eventUIDMap[uid]) this.eventUIDMap[uid] = {}
    if (!this.eventUIDMap[uid][event]) this.eventUIDMap[uid][event] = []
    this.eventUIDMap[uid][event].push(callback)
  }

  this.$off = (event, callback) => {
    if (!this.handles[event]) return
    if (!callback) {
      delete this.handles[event]
    } else if (callback instanceof Function) {
      let len = this.handles[event].length
      for (let i = 0; i < len; i++) {
        let cb = this.handles[event][i]
        if (cb === callback) {
          delete this.handles[event].splice(i, 1)
        }
      }
    }
  }

  this.$offbyUID = uid => {
    let eventObj = this.eventUIDMap[uid] || {}
    Object.keys(eventObj).forEach(event => {
      eventObj[event].forEach(cb => {
        this.$off(event, cb)
      })
      delete eventObj[event]
    })
    delete this.eventUIDMap[uid]
  }

  this.$emit = (event, ...args) => {
    if (this.handles[event]) {
      let len = this.handles[event].length
      for (let i = 0; i < len; i++) {
        this.handles[event][i](...args)
      }
    }
  }
  return this
}

let EventBus = {
  install(vue) {
    let bus = new Bus(vue)
    Object.defineProperties(vue.prototype, {
      $eventBus: {
        get: function() {
          return bus
        }
      }
    })
    vue.mixin({
      beforeDestroy() {
        this.$eventBus.$offbyUID(this._uid)
      }
    })
  }
}

export default EventBus
