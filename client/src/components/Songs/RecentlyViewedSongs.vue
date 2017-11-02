<template>
<Panel title="最近浏览">
  <v-data-table
    slot="content"
    :headers="headers"
    :pagination.sync="pagination"
    :items="songs">
    <template slot="items" slot-scope="props">
      <td class="text-xs-right">
        {{props.item.title}}
      </td>
      <td class="text-xs-right">
        {{props.item.artist}}
      </td>
    </template>
  </v-data-table>
</Panel>
</template>

<script>
import SongHistoryService from '@/services/SongHistoryService'
import { mapState } from 'vuex'

export default {
  name: 'RecentlyViewedSongs',
  data () {
    return {
      headers: [
        {
          text: 'Title',
          value: 'title'
        },
        {
          text: 'Artist',
          value: 'artist'
        }
      ],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      songs: []
    }
  },
  computed: {
    ...mapState([
      'isUserLogged',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLogged) {
      this.songs = (await SongHistoryService.index()).data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
