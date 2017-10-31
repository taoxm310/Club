<template>
  <Panel title="Search">
    <v-text-field
      label="Search"
      v-model="search"
      color="club"
      slot="content"
    ></v-text-field>
  </Panel>
</template>

<script>
import _ from 'Lodash'
export default {
  name: 'SongsSearchPanel',
  data () {
    return {
      search: ''
    }
  },
  watch: {
    search: _.debounce(function (value) {
      const route = {
        name: 'songs'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      this.$router.push(route)
    }, 700),
    '$route.query.search': {
      immediate: true,
      handler (value) {
        this.search = value
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
