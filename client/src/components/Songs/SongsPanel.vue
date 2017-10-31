<template>
  <Panel title="Songs">
    <template slot="action">
      <v-spacer></v-spacer>
        <v-btn
          to="/songs/create"
          icon>
          <v-icon>
            add              
          </v-icon>
        </v-btn>       
    </template>
    <div 
      v-for="song in songs" 
      :key="song.title"
      slot="content"
      class="song">

      <v-layout>
        <v-flex xs6>
          <div class="song-title">
            {{song.title}}
          </div>
          <div class="song-artist">
            {{song.artist}}
          </div>
          <div class="song-genre">
            {{song.genre}}
          </div>
          <v-btn
            dark
            color="club"
            :to="'/songs/' + song.id">
            查看
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <img :src="song.albumImageUrl" alt="" class="album-image">
          <div>
            {{song.album}}
          </div>        
        </v-flex>
      </v-layout>
    </div>
  </Panel>
</template>

<script>
import SongsService from '@/services/SongsService'
export default {
  name: 'Songs',
  data () {
    return {
      songs: null
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
      }
    }
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
