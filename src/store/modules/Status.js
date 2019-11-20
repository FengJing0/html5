export default {
  state: {
    status: {},
    alarmList: []
  },
  mutations: {
    setAlarmStatus (state, data) {
      state.status = data
    },
    setAlarmList (state, data) {
      state.alarmList = data
    }
  }
}
