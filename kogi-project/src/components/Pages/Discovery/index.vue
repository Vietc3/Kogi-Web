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


    <div id="buttonGroup" class="pt-2 row" v-if="loading===false">
      <v-btn-toggle
        class="col-12 mx-0"
        v-model="queryBy"
        tile
        color="teal"
        group
      >
        <v-btn
          style="border: 1px solid teal"
          v-for="(item, idx) in filterTopAsset"
          outlined
          :value="item"
          class="col-6 mx-0"
          :key="idx"
        >
          {{ item }}
        </v-btn>
      </v-btn-toggle>
    </div>

    <div id="inspire" class="pl-8 pr-8 row">
      <v-carousel height="380px">
        <v-carousel-item v-for="(item, i) in listAssetsCarousel" :key="i">
          <img
            height="380px"
            width="100%"
            :src="item.app_images.img_hot_banner | getAppBanner"
            reverse-transition="fade-transition"
            transition="fade-transition"
          />
        </v-carousel-item>
      </v-carousel>
      <v-divider class="mx-10 mt-5"></v-divider>
    </div>

    <div
      :class="item.assets.toString() !== '' ? 'col-12 ' : 'd-none'"
      v-for="(item, i) in listAssetByGenres"
      :key="i + 30"
    >
      <v-card elevation="10">
        <div class="d-flex">
          <v-card-title
            style="
              border-left: 7px solid teal;
              font-size: 15px;
              font-weigth: bold;
              width: 100%;
            "
            >{{ item.genres_code }}</v-card-title
          >
          <v-btn
            class="mt-5 mr-5"
            color="teal"
            outlined
            small
            v-text="$t('more')"
            @click="redirecCategoriesInfo(item)"
          ></v-btn>
        </div>

        <v-divider class="mx-10"></v-divider>
        <div :class="$vuetify.breakpoint.mobile ? 'col-12' : 'd-flex pointer'">
          <v-card
            :class="$vuetify.breakpoint.mobile ? 'col-12' : 'col-2 cardAsset'"
            v-for="(asset, i) in item.assets"
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
const GenresRepository = RepositoryFactory.get("genres");
let brand_icon_default = require("@/assets/icon-default.png");
import variables from "@/variables";
export default {
  name: "Discovery",
  filters: {
    getAppBanner(value) {
      if (value === "") {
        return this.brand_icon_default;
      }
      return variables.urlImage + "/" + value;
    },
  },

  created() {
    this.fetchHome();
    this.fetchGenres();
  },

  data() {
    return {
      listAssetsCarousel: [],
      listGenres: [],
      listAssets: [],
      listAssetByGenres: [],
      loading: true,
      filterTopAsset: ["ANDROID", "PC"],
      queryBy: "ANDROID",
    };
  },

  methods: {
    redirecAppInfo(value) {
      this.$router.push({ name: "Info", params: { id: value.id } });
    },

     redirecCategoriesInfo(value) {
      this.$router.push({ name: "Categories", params: { genres_code: value.genres_code } });
    },


    async fetchHome() {
       this.loading=true
      const { data } = await AssetsRepository.getHome();
      this.listAssets = data.results;
      this.listAssetsCarousel = this.listAssets.filter(
        (asset, index) => index <= 2
      );
      this.loading = false;
    },

    async fetchGenres() {
       this.loading=true
      const { data } = await GenresRepository.get();
      this.listGenres = data.results;
      this.listGenres.forEach(async (genres) => {
        let keyGenres = genres;
        let dataGenres = await this.fetchAssetByGenres(genres);
        this.listAssetByGenres.push({
          genres_code: genres.code,
          assets: dataGenres,
        });
      });
      this.loading=false
    },

    async fetchAssetByGenres(genres_code) {
      const { data } = await AssetsRepository.findAssetByGenres(
        genres_code.code
      );
      let result = [];
      if (data.results.length > 5) {
        result = data.results.filter((asset, i) => {
          return i <= 5;
        });
      } else result = data.results;
      return result;
    },
  },
};
</script>

<style scoped>
.buttonGroup {
  width: 100%;
}
.cardAsset {
  padding-right: 10px !important;
}
.boderCustom {
  border: 1px solid #e2dada;
}
.pointer {
  cursor: pointer;
}
</style>