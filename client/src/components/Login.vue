<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="elevation-2">
        <v-toolbar flat dense color="club" dark>
          <v-toolbar-title >Login</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <form>
            <v-text-field
                label="Email"
                v-model="email"
                color="club"
            ></v-text-field>

            <v-text-field
                color="club"
                label="Enter your password"
                hint="At least 8 characters"
                v-model="password"
                min="8"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'text' : 'password'"
                counter
              ></v-text-field>

            <div class="error" v-html="error">
            </div>
            <v-btn
              @click="login"
              dark
              color="club">
              Login
            </v-btn>
          </form>
        </div>
      </div>
    </v-flex>
  </v-layout>
  
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'HelloWorld',
  data () {
    return {
      email: 'aaa@gmail.com',
      e1: false,
      password: '12345678',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })

        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  font:red;
}



</style>
