<template>
  <v-app id="inspire">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="teal lighten-1"
      dark
      height="55px"
    >
      <v-toolbar-title style="width: 300px">
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

    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      color="teal lighten-1"
      @click="toTop"
    >
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
    <sideBar
      :valueMiniVariant="miniVariant"
      v-on:drawerPropsChange="handleEmit"
      :drawerProps="drawer"
    />

    <v-main>
      <router-view transition="scale-transition" origin="center center" />

      <footerApp />
    </v-main>
  </v-app>
</template>
<script>
import sideBar from "../SideBar/index";
import footerApp from "../Footer/index";

export default {
  name: "NavBar",
  data() {
    return {
      drawer: false,
      fab: false,
      miniVariant: false,
    };
  },
  components: {
    sideBar,
    footerApp,
  },

  methods: {
    handleClick() {
      if (this.$vuetify.breakpoint.mdAndUp) {
        this.miniVariant = !this.miniVariant;
      } else this.drawer = !this.drawer;
    },
    handleEmit(value) {
      this.drawer = value;
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>
<style scoped>
.v-navigation-drawer {
  margin-top: 65px;
}
</style>
