<template>
<v-layout>
  <v-flex xs4>
    <Panel title="Song Metadata">
      <template slot="content">
      <v-text-field
          label="Title"
          required
          :rules="[required]"
          v-model="song.title"
          color="club"
      ></v-text-field>
      <v-text-field
          label="Artist"
          required
          :rules="[required]"
          v-model="song.artist"
          color="club"
      ></v-text-field>
      <v-text-field
          label="Album"
          required
          :rules="[required]"
          v-model="song.album"
          color="club"
      ></v-text-field>
      <v-text-field
          label="Genre"
          required
          :rules="[required]"
          v-model="song.genre"
          color="club"
      ></v-text-field>
      <v-text-field
          label="AlbumImageUrl"
          required
          :rules="[required]"
          v-model="song.albumImageUrl"
          color="club"
      ></v-text-field>
      </template>
    </Panel>
  </v-flex>

  <v-flex xs8>
    <Panel title="Lyric" class="ml-4">
      <template slot="content">
        <v-text-field
          label="Lyric"
          multi-line
          required
          :rules="[required]"
          v-model="song.lyric"
          color="club"
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
          @click="save"
          dark
          color="club">
          保存
        </v-btn>    
      </template>
    </Panel>
  </v-flex>
</v-layout>
</template>

<script>
import SongsService from '@/services/SongsService'

export default {
  name: 'CreateSong',
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        lyric: null
      },
      error: null,
      required: (value) => !!value || 'required.'
    }
  },
  methods: {
    async save () {
      this.error = null
      const areAllfieldsFilledIn = Object
      .keys(this.song)
      .every(key => !!this.song[key])
      console.log(this.song)
      if (!areAllfieldsFilledIn) {
        this.error = 'please fill all'
        return
      }
      const songId = this.$store.state.route.params.songId
      try {
        await SongsService.put(songId, this.song)
        this.$router.push({
          name: `song`,
          params: {
            songId
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(songId)).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
