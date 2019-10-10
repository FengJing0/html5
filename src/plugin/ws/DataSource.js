import Vue from 'vue'
import BaseConfig from './config.js'
import { Message } from 'element-ui'
let dataSource

class DataSource {
  constructor (config = {}) {
    const { name, pass, success } = config
    const storage = JSON.parse(sessionStorage.getItem('user'))
    this.wsUri = BaseConfig.serverBaseUrl
    this.websocket = null
    this.type = 'datathread' // datathread
    this.wtrm = 'DEMO-Neuron-1001_1532419775357_240'
    this.func = 10 // for datathread
    this.name = name || storage.name || 'root'
    this.pass = pass || storage.pass || '0000'
    this.onsuccess = new Set()
    success && this.onsuccess.add(success)
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
    }
  }
  set (config = {}) {
    const { success } = config

    success && this.onsuccess.add(success)

    if (this.websocket && success) {
      this.websocket.onmessage = (e) => {
        const data = e.data && JSON.parse(e.data)
        this.onsuccess.forEach(i => i(data))
      }
    }

    return this
  }
  remove (func) {
    this.onsuccess.delete(func)
  }
  send (msg) {
    msg.wtrm = this.wtrm
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
    if (config) dataSource.set(config)
  }
  return dataSource
}
