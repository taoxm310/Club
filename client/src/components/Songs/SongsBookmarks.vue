<template>
<Panel title="书签">
  <v-data-table
    slot="content"
    :headers="headers"
    :pagination.sync="pagination"
    :items="bookmarks">
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
import { mapState } from 'vuex'
import BookmarksService from '@/services/BookmarksService'

export default {
  name: 'SongsBookmarks',
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
      bookmarks: []
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
      this.bookmarks = (await BookmarksService.index()).data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
