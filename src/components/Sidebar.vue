<template>
  <v-navigation-drawer temporary
                       :value="value"
                       @input="$emit('input', $event)"
                       :mini-variant="mini"
                       absolute
                       class="sidebar">
    <div class="site-brand">
      {{$store.state.brand}}
    </div>
    <v-list class="pt-0"
            dense>
      <v-list-item v-for="item in menu"
                   :value="item.active"
                   :key="item.text">
        <v-list-item-icon>
          <v-icon dark>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content @click.prevent="go(item.route)">
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
        <!-- <v-list-tile slot="item"
                     :href="item.route && $router.resolve(item.route).href"
                     @click.prevent="item.route && $router.push(item.route)">
          <v-list-tile-action>
            <v-icon dark>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action v-if="item.children && item.children.length">
            <v-icon dark>keyboard_arrow_down</v-icon>
          </v-list-tile-action>
        </v-list-tile> -->
        <!-- <template v-if="item.children && item.children.length">
          <v-list-tile v-for="subItem in item.children"
                       v-bind:key="subItem.text"
                       v-if="!subItem.isAllowed || subItem.isAllowed($store)"
                       :href="subItem.route && $router.resolve(subItem.route).href"
                       @click.prevent="subItem.route && $router.push(subItem.route)">
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.text }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon dark>{{ subItem.icon }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </template> -->
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  props: {
    value: {
      default: true
    },
    menu: {}
  },
  data () {
    return {
      // drawer: false,
      mini: false
    }
  },
  methods: {
    go (router) {
      if (!router) {
        return
      }
      if (router.name !== this.$route.name) {
        this.$router.push(router)
      }
    }
  }
}
</script>

<style lang="scss">
.sidebar {
  .site-brand {
    text-align: center;
    font-size: 40px;
    padding: 20px 0;
    background-color: #fff;
  }
  .v-navigation-drawer__content {
    background: #00bcd4;
  }
  .v-list-item__title {
    color: #fff;
    font-size: 15px;
  }
}
</style>
