<template>
<v-layout column>
    <v-flex xs6 offset-xs3>
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
              <div class="song-article">
                {{song.article}}
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
            </v-flex>
            
          </v-layout>
          {{song.artist}}
          {{song.album}}
        </div>
      </Panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import SongsService from '@/services/SongsService'
export default {
  name: 'Songs',
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
  },
  components: {
    Panel
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
.song-article {
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
