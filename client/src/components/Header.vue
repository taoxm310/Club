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
      <v-btn flat>
        Browse
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn flat 
      to="/register"
      v-if="!$store.state.user">
        SIGN UP
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items>
      <v-btn flat 
      to="/login"
      v-if="!$store.state.user">
        LOGIN
      </v-btn>
    </v-toolbar-items> 
  </v-toolbar>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
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
