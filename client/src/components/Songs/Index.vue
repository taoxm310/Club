<template>
<v-layout column>
    <v-flex xs6 offset-xs3>
      <songs-search-panel></songs-search-panel>

      <v-spacer></v-spacer>

      <songs-panel class="mt-4"></songs-panel>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsPanel from './SongsPanel.vue'
import SongsSearchPanel from './SongsSearchPanel.vue'
import SongsService from '@/services/SongsService'
export default {
  name: 'Songs',
  components: {
    SongsPanel,
    SongsSearchPanel
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.song {
  padding:20px;
  height: 330px;
  overflow: hidden;
}
.song-title {
  font-size:24px;
}
.song-artist {
  font-size:20px;
}
.song-genre {
  font-size:10px;
}
.album-image {
  width: 80%;
  margin: 0 auto;
}
</style>
