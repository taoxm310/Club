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
          label="Lyrics"
          required
          :rules="[required]"
          v-model="song.lyrics"
          color="club"
      ></v-text-field>
      <v-text-field
          label="Tab"
          required
          :rules="[required]"
          v-model="song.tab"
          color="club"
      ></v-text-field>
      </template>
    </Panel>
  </v-flex>

  <v-flex xs8>
    <Panel title="Tab Lyric" class="ml-4">
      <template slot="content">
        <v-text-field
          label="tab"
          multi-line
          required
          :rules="[required]"
          v-model="song.tab"
          color="club"
        ></v-text-field>
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
          @click="create"
          dark
          color="club">
          创建
        </v-btn>    
      </template>
    </Panel>
  </v-flex>
</v-layout>
</template>

<script>
import Panel from '@/components/Panel'
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
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      required: (value) => !!value || 'required.'
    }
  },
  components: {
    Panel
  },
  methods: {
    async create () {
      this.error = null
      const areAllfieldsFilledIn = Object
      .keys(this.song)
      .every(key => !!this.song[key])
      if (!areAllfieldsFilledIn) {
        this.error = 'please fill all'
        return
      }
      try {
        await SongsService.create(this.song)
        this.$router.push({
          name: 'songs'
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
