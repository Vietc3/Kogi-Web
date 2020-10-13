<template>
  <div>
    <v-card class="col-12" elevation="5">
      <div class="d-flex justify-space">
        <v-avatar class="ma-3 pointer" size="40" tile>
          <img
            class="nameIcon"
            :src="listAssets[0].app_images.app_icon | getAppBanner"
            height="15px"
            width="3%"
          />
        </v-avatar>
        <v-card-text v-text="`${listAssets[0].name}`"></v-card-text>
        <v-btn
          class="mt-3 mr-2"
          @click="downloadGame(listAssets[0])"
          color="#14b9c8"
          small
          dark
        >
          {{ $t("download") }}
          <v-icon dark>mdi-cellphone-android</v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import RepositoryFactory from "@/utils/RepositoryFactory";
const AssetsRepository = RepositoryFactory.get("assets");
let brand_icon_default = require("@/assets/icon-default.png");
import variables from "@/variables";
export default {
  name: "AppMobile",
 
  filters: {
    getAppBanner(value) {
      if (value === "") {
        return this.brand_icon_default;
      }
      return variables.urlImage + "/" + value;
    },
  },
  data() {
    return { listAssets: [] };
  },
  created() {
    this.fetchHome();
  },
  methods: {
       downloadGame(asset) {
      window.location.href =
        variables.urlImage +
        "/" +
        asset.app[asset.app.length - 1].apk_url;
    },
    async fetchHome() {
      const { data } = await AssetsRepository.get();
      this.listAssets = data.results.filter((result) => {
        return result.package_id === "sg.kogi.gkplay.apps";
      });
    },
  },
};
</script>

<style>
</style>