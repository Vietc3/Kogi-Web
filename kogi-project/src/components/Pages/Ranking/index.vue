<template>
  <div>
   

    <div>
      <v-avatar class="ma-1 mt-5" size="100" tile
        ><v-img class="icon" :src="brand_icon_default"></v-img>
      </v-avatar>
      <div>
        <v-btn color="teal" large dark> TOP 15 RANKINGS </v-btn>
      </div>
      <v-divider class="mx-10 mt-5"></v-divider>
    </div>

    <div>
      <v-btn-toggle v-model="queryBy" tile color="teal" group>
        <v-btn v-for="(item, idx) in filterTopAsset" :value="item" :key="idx">
          {{ item }}
        </v-btn>
      </v-btn-toggle>
    </div>

     <v-progress-circular
      :active="loading"
      :indeterminate="loading"
      :class="loading===false?'d-none':null"
      absolute
      bottom
      color="teal"
      style="margin-bottom:10px"
    ></v-progress-circular>

    <div v-if="list.toString() === ''">
      <v-card>
        <v-card-text
          class="text-center font-weight-bold"
          style="font-size: 33px"
          >No data</v-card-text
        >
      </v-card>
    </div>

  
    <div class="ml-5 d-flex" v-for="(item, idx) in list" :key="idx"  v-else>
      <div class="col-md-12 col-sm-12 col-xs-12 pl-10 pr-10 row" v-if="loading===false" >
        <div class="mb-5 col-12" height="100%">
          <v-card class="col-12">
            <div class="d-flex justify-space">
              <div>
                <v-avatar
                  class="ma-3 pointer"
                  size="200"
                  tile
                  @click="redirecAppInfo(item)"
                >
                  <v-img
                    class="icon"
                    :src="item.app_images.app_icon | getAppBanner"
                  />
                </v-avatar>
                <v-rating
                  @click="redirecAppInfo(item)"
                  class="pointer"
                  :value="item.metrics.vote_average"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="18"
                ></v-rating>
              </div>

              <div>
                <v-card-title
                  class="headline"
                  v-text="item.name"
                ></v-card-title>
                <div class="d-flex">
                  <v-btn
                    class="pt-0 ml-4 mr-2"
                    color="teal"
                    outlined
                    small
                    v-text="item.genres_code"
                  ></v-btn>
                  <v-btn
                    class="pt-0 mr-2"
                    color="teal"
                    outlined
                    small
                    v-text="item.platform_code"
                  ></v-btn>
                </div>

                <div class="ml-0">
                  <v-btn class="mt-3" color="teal" large dark>
                    Download
                    <v-icon dark>mdi-cellphone-android</v-icon>
                  </v-btn>
                  <v-btn class="mt-3" color="teal" large dark>
                    Google Play
                    <v-icon dark>mdi-google-play</v-icon>
                  </v-btn>
                </div>
                <div
                  style="height: 100px pointer"
                  @click="redirecAppInfo(item)"
                >
                  <v-card-text
                    class="text-left hiddenOverFlow"
                    style="height: 60%"
                    >{{ item.description }}</v-card-text
                  >
                </div>
              </div>

              <div>
                <v-avatar class="ml-10" size="250" width="340px" tile>
                  <img
                    class="icon"
                    height="150px"
                    :src="item.app_images.img_hot_banner | getAppBanner"
                /></v-avatar>
              </div>
            </div>
          </v-card>
        </div>
      </div>
    </div>

    <div v-if="loading===false && list.toString() !== '' " >
      <v-btn class="mb-3" color="teal" large dark @click="more()" >
        <v-icon dark>mdi-view-grid-plus</v-icon>
        MORE
      </v-btn>
    </div>
  </div>
</template>

<script>
let brand_icon_default = require("@/assets/unnamed.png");
import RepositoryFactory from "@/utils/RepositoryFactory";
const AssetsRepository = RepositoryFactory.get("assets");
import variables from "@/variables";
export default {
  name: "Rankings",

  data() {
    return {
      loading: true,
      test: variables.urlImage,
      brand_icon_default: brand_icon_default,
      list: [],
      listTopRate: [],
      page: 1,
      filterTopAsset: ["Top Rate", "Popular", "New", "Up Coming"],
      queryBy: "Top Rate",
    };
  },

  created() {
    this.fetchTopRate();
  },
  
  filters: {
    getAppBanner(value) {
      if (value === "") {
        return this.brand_icon_default;
      }
      return variables.urlImage + "/" + value;
    },
  },

  watch: {
    queryBy: async function () {
      this.page = 1;
      this.loading = true;
      if (this.queryBy === "Top Rate") {
        let { data } = await AssetsRepository.getTopRate(this.page);
        this.loading = false;
        this.list = data.results;
      } else if (this.queryBy === "Popular") {
        let { data } = await AssetsRepository.getTopPopular(this.page);
        this.loading = false;
        this.list = data.results;
      } else if (this.queryBy === "New") {
        let { data } = await AssetsRepository.getTopNew(this.page);
        this.loading = false;
        this.list = data.results;
      } else if (this.queryBy === "Up Coming") {
        let { data } = await AssetsRepository.getTopUpcoming(this.page);
        this.list = data.results;
        this.loading = false;
      }
    },
  },

  methods: {
    redirecAppInfo(value) {
      this.$router.push({ name: "Info", params: { id: value.id } });
    },

    async fetchTopRate() {
      let { data } = await AssetsRepository.getTopRate(this.page);

      this.list = data.results;
      this.loading = false;
    },

    async more() {
      this.page = this.page + 1;
      let { data } = await AssetsRepository.getTopRate(this.page);
      this.list = [...this.list, ...data];
    },
  },
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}

.hiddenOverFlow {
  margin-top: 2px;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  white-space: normal;
}

.pointer {
  cursor: pointer;
}
</style>