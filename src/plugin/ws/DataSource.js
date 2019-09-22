import Vue from 'vue'
import BaseConfig from './config.js'
import { Message } from 'element-ui'
let dataSource

class DataSource {
  constructor (config = {}) {
    const { name, pass, success } = config
    const storage = JSON.parse(localStorage.getItem('user'))
    this.wsUri = BaseConfig.serverBaseUrl
    this.websocket = null
    this.type = 'datathread' // datathread
    this.func = 10 // for datathread
    this.name = name || storage.name
    this.pass = pass || storage.pass
    this.onsuccess = []
    success && this.onsuccess.push(success)
    this.onclose = () => {
      Message.warning('socket closed')
      console.log('socket closed')
    }
    this.onerror = (e) => {
      Message.error('socket error')
      console.log('socket error')
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
        resolve(this.name, this.pass)
      })
      this.websocket.onclose = this.onclose
      this.websocket.onerror = this.onerror
      this.set()
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
  set (config = {}) {
    const { success } = config
    const successFunc = this.onsuccess
    if (success) {
      successFunc.push(success)
    }

    if (this.websocket) {
      this.websocket.onmessage = (e) => {
        const data = e.data && JSON.parse(e.data)
        successFunc.forEach(i => i(data))
      }
    }

    return this
  }
  remove (func) {
    let index = this.onsuccess.indexOf(func)
    if (index !== -1) {
      this.onsuccess.splice(index, 1)
    }
  }
  send (msg) {
    msg = JSON.stringify(msg)
    return this.websocket && this.websocket.send(msg)
  }
  test () {
    if (!this.websocket) {
      this.connect()
    }
    return this
  }
}

Vue.prototype.$ws = function getDataSource (config) {
  if (!dataSource) {
    dataSource = new DataSource(config)
  } else {
    dataSource.set(config)
  }
  return dataSource
}
