<template>
<v-layout>
  <v-flex xs6>
      <Panel title="歌曲信息">
        <div slot="content">          
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
                v-if="isUserLogged"
                dark
                color="club"
                :to="'/songs/' + song.id +'/edit'">
                编辑
              </v-btn> 
              <v-btn
                v-if="isUserLogged && !bookmark"
                dark
                color="club"
                @click="setAsBookmark">
                收藏
              </v-btn>                
              <v-btn
                dark
                v-if="isUserLogged && bookmark"                
                color="club"
                @click="unbookmark">
                取消收藏
              </v-btn> 
            </v-flex>
            <v-flex xs6>
              <img :src="song.albumImageUrl" alt="" class="album-image">
              <div>{{song.album}}</div>
            </v-flex>            
          </v-layout>
        </div>
      </Panel>
  </v-flex>

  <v-flex xs6 class="ml-2">
    <Panel title="歌词">
        <textarea
          slot="content"
          label="Lyric"
          multi-line
          v-model="song.lyric"
          color="club"
        ></textarea>
    </Panel>
  </v-flex>
</v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'
import { mapState } from 'vuex'
import BookmarksService from '@/services/BookmarksService'
import SongHistoryService from '@/services/SongHistoryService'

export default {
  name: 'ViewSong',
  data () {
    return {
      song: '',
      bookmark: null
    }
  },
  computed: {
    ...mapState([
      'isUserLogged',
      'user'
    ])
  },
  async mounted () {
    try {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(songId)).data
    } catch (err) {
      console.log(err)
    }

    if (this.isUserLogged) {
      try {
        const bookmarks = (await BookmarksService.index({
          songId: this.song.id
        })).data
        if (bookmarks.length) {
          this.bookmark = bookmarks[0]
        }
        SongHistoryService.post({
          songId: this.song.id
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  methods: {
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.song.id
        })).data
      } catch (err) {
        console.log(err)
      }
    },
    async unbookmark () {
      try {
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (err) {
        console.log(err)
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
  font-size:30px;
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
textarea {
  width: 100%;
  font-family: monospace;
  border-style: none;
  height: 600px;
  border-color: transparent;
  overflow: auto;
  padding: 20px;
}
</style>
