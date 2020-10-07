<template>
  <div>
        <v-progress-circular
      :active="loading"
      :indeterminate="loading"
      :class="loading === false ? 'd-none' : null"
      absolute
      bottom
      color="teal"
      style="margin-bottom: 10px"
    ></v-progress-circular>
    <div class="col-xl-12 col-lg-12 col-sm-12" v-if="loading===false"> 
      <v-card elevation="10">
        <v-card-title
          style="
            border-left: 7px solid teal;
            font-size: 15px;
            font-weigth: bold;
            width: 100%;
          "
          >{{ $route.params.genres_code }}</v-card-title
        >

        <v-divider class="mx-10"></v-divider>
        <div
          :class="
            $vuetify.breakpoint.mobile ? 'col-12' : 'd-flex flex-wrap pointer'
          "
        >
          <v-card
            :class="
              $vuetify.breakpoint.mobile
                ? 'col-12'
                : 'col-2 ml-10 mr-5 mb-5 cardAsset'
            "
            v-for="(asset, i) in listAssetByGenres"
            :key="i + 30"
          @click="redirecAppInfo(asset)"
          >
            <div>
              <v-avatar
                class="ma-3"
                :size="$vuetify.breakpoint.smAndDown ? 110 : 110"
                tile
              >
                <v-img
                  class="icon"
                  :src="asset.app_images.app_icon | getAppBanner"
                />
              </v-avatar>
            </div>
            <div>{{ asset.name }}</div>
            <div>
              <v-rating
                :value="asset.metrics.vote_average"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
            </div>
          </v-card>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import RepositoryFactory from "@/utils/RepositoryFactory";
const AssetsRepository = RepositoryFactory.get("assets");
let brand_icon_default = require("@/assets/icon-default.png");
import variables from "@/variables";
export default {
  name: "Categories",
  filters: {
    getAppBanner(value) {
      if (value === "") {
        return this.brand_icon_default;
      }
      return variables.urlImage + "/" + value;
    },
  },
  data() {
    return {
      listAssetByGenres: [],
      loading: true,
    };
  },
  created() {
    this.fetchAssetByGenres(this.$route.params.genres_code);
  },
  methods: {
        redirecAppInfo(value) {
      this.$router.push({ name: "Info", params: { id: value.id } });
    },

    async fetchAssetByGenres(genres_code) {
        this.loading =true;
      const { data } = await AssetsRepository.findAssetByGenres(genres_code);
      this.listAssetByGenres = data.results;
        this.loading =false;
    },
  },
};
</script>
<style>
</style>