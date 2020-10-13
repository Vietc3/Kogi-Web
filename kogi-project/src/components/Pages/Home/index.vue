<template>
  <div class="text-center mt-0">
    <v-progress-circular
      :active="loading"
      :indeterminate="loading"
      :class="loading === false ? 'd-none' : null"
      absolute
      bottom
      color="#14b9c8"
      style="margin-bottom: 10px"
    ></v-progress-circular>

    <div
      :class="$vuetify.breakpoint.mobile ? 'd-none' : 'pl-10 pr-10 row'"
      v-if="loading === false"
      style="height: 420px"
    >
      <div class="col-md-12 d-sm-none d-md-flex pointer">
        <img
          :src="listAssets[0].app_images.img_hot_banner | getAppBanner"
          @click="test(listAssets[0])"
          class="white--text"
          height="400px"
          width="100%"
        />
      </div>
    </div>

    <div
      :class="$vuetify.breakpoint.mobile ? null : 'pl-10 pr-10 row'"
      v-if="loading === false"
    >
      <v-row>
        <div
          :class="
            $vuetify.breakpoint.mobile
              ? 'col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 pd-0 pointer row'
              : 'col-md-8 col-sm-12 col-xs-12 pl-6 pr-5 pointer row'
          "
          style="padding-top: 0px"
        >
          <div
            class="col-12"
            style="padding-top: 0px"
            v-for="(item, idx) in listAssets"
            :key="idx"
            @click="test(item)"
          >
            <v-card class="col-12">
              <img
                :src="item.app_images.img_hot_banner | getAppBanner"
                class="white--text align-center"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                width="100%"
                height="250px"
              />

              <v-card-actions class="pa-4">
                <img
                    class="nameIcon"
                    :src="item.app_images.app_icon | getAppBanner"
                    height="30px"
                    max-width="10%"
                  />
              <div style="font-size:13px"> {{ item.name }}</div> 
                <v-spacer></v-spacer>
                <span :class="$vuetify.breakpoint.mobile ? 'd-none' :'text--lighten-2 caption mr-2'" style="color:#14b9c8">
                  ({{ item.metrics.popularity }}
                  reviews)
                </span>
                <v-rating
                  :value="item.metrics.vote_average"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>
              </v-card-actions>
            </v-card>
          </div>
        </div>

        <v-col
          class="col-md-4 d-sm-none d-md-flex pointer pd-0 ranking row"
          :style="$vuetify.breakpoint.mobile ? 'display:none' : null"
          style="padding-top: 0px"
        >
          <v-card class="mb-5" style="width: 100%; height: 10%" elevation="5">
            <v-card-title
              style="
                font-size: 15px;
                font-weigth: bold;
                width: 100%;
                color: #14b9c8;
                  border-left: 7px solid #14b9c8;
              "
              >{{ $t("sologan") }}</v-card-title
            >
            <div
              class="grey--text ml-3"
              style="
                font-size: 12px;
                font-style: oblique;
                width: 100%;
                color: #26a69a;
                text-align: left;
              "
            >
              {{ $t("follow") }}
            </div>
            <v-card-actions>
              <v-btn fab dark small color="primary">
                <v-icon dark> mdi-facebook-box</v-icon>
              </v-btn>
              <v-btn fab dark small color="red">
                <v-icon dark>mdi-instagram</v-icon>
              </v-btn>
              <v-btn fab dark small color="#26a69a">
                <v-icon dark> mdi-email</v-icon>
              </v-btn>
              <v-btn fab dark small color="primary">
                <v-icon dark> mdi-twitter-box</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>

          <v-card>
            <v-card-title
              class="justify-center"
              style="
                font-size: 25px;
                font-weigth: bold;
                color: black;
                width: 100%;
                border-left: 7px solid #14b9c8;
              "
              >{{ $t("rankings") }}</v-card-title
            >
            <v-divider class="mb-5"></v-divider>
            <div>
              <v-row
                @click="test(item)"
                class="mx-0 align-left rankingCard"
                v-for="(item, index) in listTopRate"
                :key="item.id"
              >
                <div class="rank">{{ index + 1 }}</div>
                <div class="itemRanking">
                  <img
                    :src="item.app_images.app_icon | getAppBanner"
                    class="white--text align-center icon"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    width="60%"
                    height="60px"
                  />
                </div>
                <div align="left" class="rankingItemName">
                  <div style="font-size: 12px; margin-right: 30%; color: black">
                    {{ item.name }}
                  </div>
                  <v-rating
                    style="padding-right: 100%"
                    :value="item.metrics.vote_average"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                  <div
                    class="grey--text"
                    style="font-size: 12px; margin-right: 50%"
                  >
                    {{ item.genres_code }}
                  </div>
                </div>
              </v-row>
            </div>
          </v-card>

          <v-card class="mt-5 genres" elevation="5">
            <v-card-title
              class="justify-center"
              style="
                font-size: 25px;
                font-weigth: bold;
                width: 100%;
                color: #14b9c8;
                border-left: 7px solid #14b9c8;
              "
              >{{ $t("hotGame") }}</v-card-title
            >
            <v-divider class="mb-5"></v-divider>

            <v-btn
              class="mr-3 mb-2"
              outlined
              color="#14b9c8"
              v-for="item in listGenres"
              :key="item.code"
              >{{ item.name }}</v-btn
            >
          </v-card>
        </v-col>
      </v-row>
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
  name: "Home",
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
      listAssets: [],
      loading: true,
      listTopRate: [],
      listGenres: [],
      page: 1,
    };
  },
  created() {
    this.fetchHome();
    this.fetchTopRate();
    this.fetchGenres();
    this.updateUser();
  },
  methods: {
    test(value) {
      this.$router.push({ name: "Info", params: { id: value.id } });
    },
    async fetchGenres() {
      const { data } = await GenresRepository.get();
      this.listGenres = data.results;
    },

    doMath: function (index) {
      return index + 1;
    },
    async fetchHome() {
      const { data } = await AssetsRepository.getHome();
      this.listAssets = data.results;
      this.loading = false;
    },

    async fetchTopRate() {
      const { data } = await AssetsRepository.getTopRate(this.page);
      this.listTopRate = data.results;
    },
    async updateUser() {
      await this.$store.dispatch("getInfoUser");
    },
  },
};
</script>



<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
.nameIcon {
  padding-right: 10px !important;
}
.review {
  text-align: right;
  padding-left: 28%;
  color: #14b9c8;
}
.review-mobile {
  text-align: right;
  padding-left: 100%;
  color: #14b9c8;
}
.flex-container {
  display: flex;
  flex-wrap: nowrap;
}

.flex-container > div {
  text-align: center;
  margin: 10px;
}
.flex-container > v-btn {
  text-align: center;
  margin: 10px;
}
.v-card__title {
  width: 50%;
  padding: 8px;
}

.ranking {
  height: 30%;
}
.genres {
  height: 25%;
  word-wrap: break-word;
}

.itemRanking {
  height: 30%;
  width: 30%;
}
.rankingItemName {
  width: 50%;
}
.rank {
  padding-top: 20px;
  width: 20%;
  color: #14b9c8;
  font-style: oblique;
}
.rankingCard {
  margin-bottom: 10px;
}

.pointer {
  cursor: pointer;
}
.justify-end {
  margin-left: 35%;
}
</style>