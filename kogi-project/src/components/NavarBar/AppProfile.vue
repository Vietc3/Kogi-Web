<template>
  <v-menu
    offset-y
    origin="center center"
    :nudge-bottom="10"
    transition="scale-transition"
  >
    <template v-slot:activator="{ on }"  >
      <v-btn icon large text v-on="on" style="margin-right:0px">
        <v-avatar size="36px">
          <img v-if="photoUrl" :src="photoUrl" alt="name" />
          <v-icon v-else large> mdi-account </v-icon>
        </v-avatar>
      </v-btn>
    </template>

    <v-list class="pa-0">
      <v-list>
        <v-list-item v-if="displayName || phoneNumber || photoUrl">
          <v-list-item-avatar>
            <img v-if="photoUrl" :src="photoUrl" alt="name" />

            <v-icon v-else large> mdi-account </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{
              displayName || phoneNumber
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-else @click="toLogin()">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />
      <v-list v-if="displayName || phoneNumber || photoUrl" >
      <v-list-item
        v-for="(item, index) in menuitems"
        :key="index"
        :to="!item.href ? { name: item.name } : null"
        :href="item.href"
        ripple="ripple"
        :disabled="item.disabled"
        :target="item.target"
        rel="noopener"
        @click="item.click"
      >
        <v-list-item-action v-if="item.icon">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      </v-list>

    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";


export default {
  name: "AppProfile",
  data() {
    return {
      menuitems: [
        {
          icon: "mdi-account",
          href: "#",
          title: "Profile",
          click: (e) => {
            console.log(e);
          },
        },
        {
          icon: "mdi-settings",
          href: "#",
          title: "Setting",
          click: () => {
            console.log("this.toggleSettingsPanel()");
            this.toggleSettingsPanel();
          },
        },
        {
          icon: "mdi-exit-to-app",
          href: "#",
          title: "Logout",
          click: () => {
            this.logout();
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["displayName", "photoUrl", "phoneNumber"]),
  },
  methods: {
   
    logout() {
      this.$store.dispatch("logOut");
      this.$router.push({ name: "Login" });
    },
    toggleSettingsPanel() {
      console.log("this.toggleSettingsPanel()111");
      this.$vuetify.goTo(0);
      this.$store.dispatch("SettingsPanelToggle");
    },
    toLogin(){
       this.$router.push({ name: "Login" });
    }
  },
};
</script>
