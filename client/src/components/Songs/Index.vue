<template>
<v-layout>
    <v-flex xs6 v-if="isUserLogged" >
      <songs-bookmarks ></songs-bookmarks>

      <RecentlyViewedSongs  class="mt-4"></RecentlyViewedSongs>
    </v-flex>

    <v-flex :class= "{
      xs12: !isUserLogged,
      xs6: isUserLogged
    }" class="ml-2">
      <songs-search-panel></songs-search-panel>

      <songs-panel class="mt-4"></songs-panel>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsPanel from './SongsPanel.vue'
import SongsSearchPanel from './SongsSearchPanel.vue'
import SongsService from '@/services/SongsService'
import SongsBookmarks from './SongsBookmarks.vue'
import RecentlyViewedSongs from './RecentlyViewedSongs.vue'
import { mapState } from 'vuex'

export default {
  name: 'Songs',
  components: {
    SongsPanel,
    SongsSearchPanel,
    SongsBookmarks,
    RecentlyViewedSongs
  },
  computed: {
    ...mapState([
      'isUserLogged',
      'user'
    ])
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
