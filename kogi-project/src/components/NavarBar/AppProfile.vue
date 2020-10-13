<template>
  <v-menu
    offset-y
    origin="center center"
    :nudge-bottom="10"
    transition="scale-transition"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon large text v-on="on" style="margin-right: 0px">
        <v-avatar size="36px">
          <img v-if="id" :src="photoUrl===''?'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light':photoUrl" alt="name" />
       
          <v-icon v-else large> mdi-account </v-icon>
        </v-avatar>
      </v-btn>
    </template>

    <v-list class="pa-0">
      <v-list>
        <v-list-item v-if="displayName || phoneNumber || photoUrl">
          <v-list-item-avatar>
            <img v-if="photoUrl" :src="photoUrl" alt="name" />

            <img
              v-else
              :src="'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light'"
              alt="name"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{
              displayName || phoneNumber
            }}</v-list-item-title>
            <v-list-item-subtitle>Kogi Point: {{ point }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-else @click="toLogin()">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ $t("login") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list v-if="displayName || phoneNumber || photoUrl">
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
            <v-list-item-title>{{ $t(`${item.title}`) }}</v-list-item-title>
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
          title: "profile",
          click: () => {
            this.profile();
          },
        },
        {
          icon: "mdi-exit-to-app",
          href: "#",
          title: "logout",
          click: () => {
            this.logout();
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["displayName", "photoUrl", "phoneNumber", "point",'id']),
  },
  methods: {
    profile() {
      this.$router.push({ name: "InfoAccount" });
    },

    logout() {
      this.$store.dispatch("logOut");
      this.$router.push({ name: "Home" });
    },
    toggleSettingsPanel() {
      console.log("this.toggleSettingsPanel()111");
      this.$vuetify.goTo(0);
      this.$store.dispatch("SettingsPanelToggle");
    },
    toLogin() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
