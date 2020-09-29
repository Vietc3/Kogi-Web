<template>
  <div class="text-center mt-0">
    <div class="pl-10 pr-10 row">
      <div class="col-md-12 d-sm-none d-md-flex">
        <v-card>
          <img
            :src="listAssets[0].app_images.img_hot_banner | getAppBanner"
            class="white--text align-center"
            height="400px"
            width="100%"
          />
          <v-row align="center" class="mx-0">
            <v-card-title class="title">
              <img
                class="nameIcon"
                :src="listAssets[0].app_images.app_icon | getAppBanner"
                height="30px"
                max-width="10%"
              />
              {{ listAssets[0].name }}
            </v-card-title>
            <div class="review">
              <v-rating
                :value="listAssets[0].metrics.vote_average"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
              ></v-rating>
              <div class="grey--text ml-4">
                {{ listAssets[0].metrics.vote_average }}({{
                  listAssets[0].metrics.popularity
                }}
                reviews)
              </div>
            </div>
          </v-row>
        </v-card>
      </div>
    </div>

    <div class="pl-10 pr-10 row">
      <v-row>
        <div class="col-md-8 col-sm-12 col-xs-12 pl-10 pr-5 row">
          <div class="mb-5" v-for="(item, idx) in listAssets" :key="idx">
            <v-card>
              <img
                :src="item.app_images.img_hot_banner | getAppBanner"
                class="white--text align-center"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                width="100%"
                height="250px"
              />
              <v-row align="center" class="mx-0">
                <v-card-title>
                  <img
                    class="nameIcon"
                    :src="item.app_images.app_icon | getAppBanner"
                    height="30px"
                    max-width="10%"
                  />
                  {{ item.name }}
                </v-card-title>
                <div class="review">
                  <v-rating
                    :value="item.metrics.vote_average"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                  <div class="grey--text">
                    {{ item.metrics.vote_average }}({{
                      item.metrics.popularity
                    }}
                    reviews)
                  </div>
                </div>
              </v-row>
            </v-card>
          </div>
        </div>

        <v-col class="col-md-4 col-sm-0 col-xs-0  ranking row">
          <v-card>
            <v-card-title  style="font-size: 25px;font-style:oblique; color: #26a69a;">Rankings</v-card-title>
             <v-divider class="mb-5"></v-divider>
            <div>
              <v-row
                class="mx-0  align-left rankingCard"
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
                  <div
                    style="font-size: 12px; margin-right: 50%; color: #26a69a"
                  >
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
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import RepositoryFactory from "@/utils/RepositoryFactory";
const AssetsRepository = RepositoryFactory.get("assets");
import variables from "@/variables";

export default {
  name: "Home",
  filters: {
    getAppBanner(value) {
      return variables.urlImage + "/" + value;
    },
  },
  data() {
    return { listAssets: [], listTopRate: [] };
  },
  created() {
    this.fetchHome();
    this.fetchTopRate();
  },
  methods: {
    doMath: function (index) {
      return index + 1;
    },
    async fetchHome() {
      const { data } = await AssetsRepository.getHome();
      this.listAssets = data.results;
    },

    async fetchTopRate() {
      const { data } = await AssetsRepository.getTopRate();
      this.listTopRate = data.results;
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
  color: #26a69a;
}
.flex-container {
  display: flex;
  flex-wrap: nowrap;
}

.flex-container > div {
  text-align: center;
  margin: 10px;
}
.v-card__title {
  width: 50%;
}
.icon {
}
.ranking {
  height: 25%;
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
  color: #26a69a;
  font-style:oblique;
}
.rankingCard {
  margin-bottom: 10px;
}
</style>