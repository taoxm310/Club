<template>
  <v-toolbar fixed color="club" dark>
    <v-toolbar-title class="mr-4">
      <router-link 
        to="/" 
        tag="span" 
        class="home"
        >Club
      </router-link>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn 
        flat 
        to="/songs"
        >
        歌曲库
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn 
        flat 
        to="/todolist"
        >
        待办事项
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn 
        flat 
        to="/register"
        v-if="!$store.state.user">
        注册
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn 
        flat 
        to="/login"
        v-if="!$store.state.user">
        登陆
      </v-btn>
    </v-toolbar-items> 
        <v-toolbar-items>
      <v-btn 
        flat
        @click="logout"
        v-if="$store.state.user">
        登出
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'PageHeader',
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  cursor: pointer;
}

</style>
