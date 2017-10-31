<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <Panel title="登陆">
        <div class="pl-4 pr-4 pt-2 pb-2" slot="content">
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

            <v-alert 
              icon="warning" 
              color="error" 
              class="error"
              :value="!!error"
              transition="scale-transition">
                {{error}}
            </v-alert>
            <v-btn
              @click="login"
              dark
              color="club">
              登陆
            </v-btn>
          </form>
        </div>
      </Panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'Login',
  data () {
    return {
      email: 'aaa1@gmail.com',
      e1: false,
      password: '12345678',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        this.error = null
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          path: '/songs'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
