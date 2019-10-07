export default {
  state: {
    driverData: {
      chdv: '',
      chnl: [
        {
          'tcph': '',
          'tcpp': 0,
          'ttyc': '',
          'ttyb': 0,
          'ttyd': 0,
          'ttys': '',
          'ttyp': ''
        }
      ]
    },
    objectData: [],
    eventData: []
  },
  getters: {
    res (state) {
      return {
        chdv: state.driverData.chdv,
        chnl: state.driverData.chnl,
        objd: state.objectData,
        msgd: state.eventData
      }
    }
  },
  mutations: {
    setDriverData (state, { chdv, chnl }) {
      state.driverData.chdv = chdv
      state.driverData.chnl = chnl
    },
    addObjectData (state, objectData) {
      state.objectData.push(objectData)
    },
    addEventData (state, eventData) {
      state.eventData.push(eventData)
    },
    setObjectAttribute (state, { name, attributeList }) {
      state.objectData = state.objectData.map(i => {
        if (i.objn === name) {
          i.oatt = attributeList
        }
        return i
      })
    }
  }
}
