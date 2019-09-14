<template>
  <div class="login">
    <form class="card-holder"
          novalidate
          @submit.stop.prevent="submit">
      <v-card class="login-card">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-1">{{$store.state.brand}}</h3>
            <div class="">{{$store.state.loginSubtitle}}</div>
          </div>
        </v-card-title>
        <v-card-text>
          <v-text-field label="User Name"
                        v-model="name"
                        :rules="[rules.required]"></v-text-field>
          <v-text-field type="password"
                        label="Password"
                        v-model="pass"
                        :rules="[rules.required]"></v-text-field>
          <v-btn primary
                 dark
                 block
                 type="submit">Sign In</v-btn>
        </v-card-text>
      </v-card>
    </form>
  </div>
</template>
<script>
import { addHours } from 'date-functions'
// import config from '../config'
export default {
  // components:
  data () {
    return {
      name: 'root',
      pass: '0000',
      rules: {
        required: (value) => !!value || 'Required'
      }
    }
  },
  mounted () {
    // this.login()
  },
  methods: {
    submit () {
      const { name, pass } = this
      if (name && pass) {
        this.$store.dispatch('login', { name, pass }).then((data) => {
          const userStore = {
            name,
            pass,
            expired_at: addHours(new Date(), this.$store.state.userRemember).getTime()
          }
          console.log(data)
          window.localStorage.setItem('user', JSON.stringify(userStore))
          this.$router.push({ name: 'datathread' })
        }).catch((e) => {
          console.log(e)
          this.$alert('Login failed')
        })
      }
    }
    // login () {
    //   const { name, pass } = this
    //   this.createWS()
    // },
    // createWS (data) {
    //   let websocket = new WebSocket("ws://192.168.234.128:7681/", "datathread");

    //   websocket.onopen = function () {
    //     var j = { func: 10, name: 'root', pass: '0000' };
    //     var txt = JSON.stringify(j);
    //     websocket.send(txt)
    //   }
    //   websocket.onmessage = function (msg) {
    //     console.log(msg)
    //   }
    // },

  }
}
</script>
<style lang="scss">
.login {
  display: flex;
  flex: 1;
  justify-content: center;
  padding-top: 100px;
}
.login-card {
  width: 350px;
}
</style>
