<template>
  <div class="elevation-2">
    <v-toolbar flat dense color="club" dark>
      <v-toolbar-title >{{title}}</v-toolbar-title>
      <slot name="action" /> 
    </v-toolbar>
      
    <div class="pl-4 pr-4 pt-2 pb-2">
      <slot name="content">
        No slot
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: [
    'title'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
