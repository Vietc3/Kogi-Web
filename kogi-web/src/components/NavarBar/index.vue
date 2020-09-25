<template>
  <v-app id="inspire">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <v-toolbar-title style="width: 350px">
        <v-app-bar-nav-icon
          @click.stop="handleClick"
          class="ma-2"
          label="Mini variant"
          
        ></v-app-bar-nav-icon>

        <a href="/" class="white--text" style="text-decoration: none">
          &nbsp;Kogi Store
        </a>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down pl-10 ml-4"
      />
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>

    <sideBar :valueMiniVariant="miniVariant" v-on:drawerPropsChange="handleEmit" :drawerProps="drawer" />
    <v-main>
      <router-view />

      <v-footer :padless="true">
        <v-card
          flat
          tile
          width="100%"
          class="secondary white--text text-center"
        >
          <v-card-text>
            <v-btn class="mx-4 white--text" icon>
              <v-icon size="24px">mdi-home</v-icon>
            </v-btn>
            <v-btn class="mx-4 white--text" icon>
              <v-icon size="24px">mdi-email</v-icon>
            </v-btn>
            <v-btn class="mx-4 white--text" icon>
              <v-icon size="24px">mdi-calendar</v-icon>
            </v-btn>
            <v-btn class="mx-4 white--text" icon>
              <v-icon size="24px">mdi-delete</v-icon>
            </v-btn>
          </v-card-text>

          <v-card-text class="white--text pt-0"
            >Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
            Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
            accumsan id ultrices nunc. Sed at orci sed massa consectetur
            dignissim a sit amet dui. Duis commodo vitae velit et faucibus.
            Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum
            ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel
            diam elementum tempor vel ut orci. Orci varius natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus.</v-card-text
          >

          <v-divider></v-divider>

          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} —
            <strong>ShipIT</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-main>
  </v-app>
</template>
<script>
import sideBar from "../SideBar/index";

export default {
    name: "NavBar",
  data() {
    return {
      drawer: false,
      
      miniVariant: false,
    };
  },
  components: {
    sideBar,
  },
  
  methods: {
    handleClick() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        this.miniVariant = !this.miniVariant;
      }
      else this.drawer = !this.drawer
    },
    handleEmit(value){
      this.drawer=value;
    }
  },
};
</script>
<style scoped>
.v-navigation-drawer {
  margin-top: 65px;
}
</style>
