export default {
  state: {
    deviceList: []
  },
  mutations: {
    setDeviceList (state, data) {
      state.deviceList = data.map(i => {
        return {
          label: i.desc,
          val: i.name,
          type: i.type
        }
      })
    }
  }
}
