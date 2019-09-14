import BaseConfig from './config.js'
// let dataSource
// function getDataSource () {
//   if (!dataSource) {
//     dataSource = new DataSource()
//   }
//   return dataSource
// }

export default class DataSource {
  constructor (config = {}) {
    const { name, pass } = config
    const storage = JSON.parse(localStorage.getItem('user'))
    this.wsUri = BaseConfig.serverBaseUrl
    this.websocket = null
    this.type = 'datathread' // datathread
    this.func = 10 // for datathread
    this.name = name || storage.name
    this.pass = pass || storage.pass
  }
  connect () {
    this.close()
    // debugger
    console.log(this.wsUri, this.type)
    this.websocket = new WebSocket(this.wsUri, this.type)
    this.websocket.addEventListener('open', () => {
      var j = { func: 10, name: this.name, pass: this.pass }
      var txt = JSON.stringify(j)
      this.websocket.send(txt)
    })
    this.websocket.addEventListener('close', () => {
      console.log('socket closed')
    })
    this.websocket.addEventListener('error', (e) => {
      console.log('socket error')
      throw e
    })
    let i = 0
    this.websocket.addEventListener('message', (e) => {
      const data = e.data && JSON.parse(e.data)
      if (i === 0) {
        this.onlogin && this.onlogin(data)
      }
      switch (this.type) {
        //        case 'datathread':
        //          if (i > 1) {
        //            if (i % 2 === 1) {
        //              this.ongetdata1 && this.ongetdata1(data)
        //            } else {
        //              this.ongetdata2 && this.ongetdata2(data)
        //            }
        //          }
        //          break
        //        case 'configuration':
        //          this.ongetdata && this.ongetdata(data)
        //          break
        case 'datathread':
          if (i === 0) {
            var txt1 = JSON.stringify(this.func)
            this.send(txt1)
          } else if (i === 1) {
            this.ongetdata && this.ongetdata(data)
          } else if (i > 1) {
            if (i % 2 === 1) {
              this.ongetdata1 && this.ongetdata1(data)
            } else {
              this.ongetdata2 && this.ongetdata2(data)
            }
          }
          break
        //        case 'historicaldata':
        //          if (i === 0) {
        //            var txt1 = JSON.stringify(this.func)
        //            this.send(txt1)
        //          } else if (i >= 1) {
        //            this.ongetdata && this.ongetdata(data)
        //          }
        // break
      }
      i++
    })
  }
  close () {
    if (this.websocket) {
      this.websocket.close()
      this.websocket = null
    }
  }
  send (msg) {
    return this.websocket && this.websocket.send(msg)
  }
}
