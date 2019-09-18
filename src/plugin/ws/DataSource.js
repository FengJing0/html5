import Vue from 'vue'
import BaseConfig from './config.js'
let dataSource

class DataSource {
  constructor (config = {}) {
    const { name, pass } = config
    const storage = JSON.parse(localStorage.getItem('user'))
    this.wsUri = BaseConfig.serverBaseUrl
    this.websocket = null
    this.type = 'datathread' // datathread
    this.func = 10 // for datathread
    this.name = name || storage.name
    this.pass = pass || storage.pass
    this.onsuccess = data => data
    this.onclose = () => { console.log('socket closed') }
    this.onerror = (e) => {
      console.log('socket closed')
      throw e
    }
  }
  connect () {
    this.close()
    // debugger
    return new Promise((resolve, reject) => {
      this.websocket = new WebSocket(this.wsUri, this.type)
      this.websocket.addEventListener('open', () => {
        var j = { func: 10, name: this.name, pass: this.pass }
        var txt = JSON.stringify(j)
        this.websocket.send(txt)
      })
      this.websocket.addEventListener('close', this.onclose)
      this.websocket.addEventListener('error', this.onerror)
      this.websocket.addEventListener('message', (e) => {
        const data = e.data && JSON.parse(e.data)
        this.onsuccess(data)
      })
      resolve(this.name)
    })
  }
  close () {
    if (this.websocket) {
      this.websocket.close()
      this.websocket = null
      dataSource = null
      // Vue.$router.replace({ name: 'login' })
    }
  }
  set (config) {
    const { success, error } = config
    if (success) {
      this.onsuccess = success
    } else {
      this.onsuccess = data => data
    }
    error && (this.onerror = error)
    return this
  }
  send (msg) {
    msg = JSON.stringify(msg)
    return this.websocket && this.websocket.send(msg)
  }
}

Vue.prototype.$ws = function getDataSource (config) {
  if (!dataSource) {
    dataSource = new DataSource(config)
  }
  return dataSource
}
