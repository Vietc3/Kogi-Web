<template>

  <v-app id="inspire">
   
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      app
      color="#14b9c8"
      dark
      height="55px"
    >
    
      <v-toolbar-title style="width: 300px; text-align: left">
        <v-app-bar-nav-icon
          @click.stop="handleClick"
          class="ma-2"
          label="Mini variant"
        ></v-app-bar-nav-icon>

        <a href="/" class="white--text" style="text-decoration: none">
          &nbsp; KOGI STORE
        </a>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        :label="$t('search')"
        class="hidden-sm-and-down pl-10 ml-4"
      />
      <v-spacer />
      <localization />
      <profile />
    </v-app-bar>
  

    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      color="#14b9c8"
      @click="toTop"
    >
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>

    <sideBar
      :valueMiniVariant="miniVariant"
      v-on:drawerPropsChange="handleEmit"
      :drawerProps="drawer"
    />
    <v-main style="background-color:#f2f2f2">
      <div :class="$vuetify.breakpoint.mobile?'col-12 pl-0 pr-0 pb-0 pt-0':'d-none'"><mobile/></div>
      <router-view origin="center center" />
      <footerApp />
    </v-main>
  </v-app>
</template>
<script>
import sideBar from "../SideBar/index";
import footerApp from "../Footer/index";
import Profile from "./AppProfile.vue";
import Localization from "./AppLocalization";
import Mobile from "./AppDownloadMobile";
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
    Profile,
    Localization,
    Mobile,
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
  margin-top: 55px;
}
</style>
