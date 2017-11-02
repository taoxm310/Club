<template>
<v-layout column>
  <v-flex xs6 offset-xs3>
      <v-text-field
        :prepend-icon="e1 ? 'keyboard_arrow_down' : 'keyboard_arrow_up'"
        :prepend-icon-cb="allSelected"
        autofocus
        color="club"
        v-model="todo"
        @keyup.enter="addToList"
        placeholder="What needs to be done?"
      ></v-text-field>
      <v-list class="transparent">
        <v-list-tile 
          v-for="(item,index) in ShowList"
          :key="index"
          avatar>
          <v-list-tile-action>
            <v-checkbox v-model="item.done"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >
              <span
                v-show="editing !== index"
                @dblclick="edit(index, $event)">
                {{item.content}}
              </span>
              <input
                v-show="editing === index"
                @blur="editing = -1"
                v-model="item.content"
                @keyup.enter="afterEdit(index,$event)">
              </input>
            </v-list-tile-title>
          </v-list-tile-content>          
          <v-list-tile-action
            @click="deleteItem(index)">
            <v-btn icon ripple>
              <v-icon color="club">clear</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-layout v-if="this.list.length">
        <v-chip 
          label
          class="transparent">
          {{itemLeft}} item(s) left
        </v-chip>
        <v-btn
          flat
          v-for="(view, index) in views" 
          :key="index"
          :outline="show === view ? true: false"
          @click="changeView(index)">
          {{view}}
        </v-btn>
      </v-layout>
  </v-flex>
</v-layout>
</template>

<script>
export default {
  name: 'Todolist',
  data () {
    return {
      todo: '',
      show: 'All',
      e1: false,
      views: ['All', 'Active', 'Completed'],
      editing: -1,
      list: []
    }
  },
  methods: {
    addToList () {
      if (this.todo.trim()) {
        this.list.push({
          content: this.todo,
          done: false
        })
      }
      this.todo = ''
    },
    deleteItem (index) {
      this.list.splice(index, 1)
    },
    changeView (index) {
      this.show = this.views[index]
    },
    allSelected () {
      if (!this.e1) {
        this.list.map(function (it) {
          it.done = true
        })
        this.e1 = true
      } else {
        this.list.map(function (it) {
          it.done = false
        })
        this.e1 = false
      }
    },
    edit (index, e) {
      this.editing = index
      setTimeout(() => {
        e.target.nextElementSibling.focus()
      })
    },
    afterEdit (index, e) {
      if (!this.list[index].content) {
        this.list.splice(index, 1)
      } else {
        e.target.blur()
      }
    }
  },
  computed: {
    itemLeft () {
      return this.list.filter(item => item.done === false).length
    },
    ShowList () {
      if (this.show === 'Active') {
        return this.list.filter(it => it.done === false)
      } else if (this.show === 'Completed') {
        return this.list.filter(it => it.done === true)
      } else {
        return this.list
      }
    }
  },
  created () {
    try {
      this.list = JSON.parse(localStorage.TODOS)
    } catch (e) {
      console.log(e)
    }
  },
  watch: {
    list: {
      handler: function (newVal, oldVal) {
        localStorage.TODOS = JSON.stringify(newVal)
      },
      deep: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list__tile__content + .list__tile__action {
  opacity: 0;
}
.list__tile:hover > .list__tile__action {
  opacity: 1;
}
</style>
