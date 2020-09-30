<template>
  <div class="text-center mt-0">
    <div class="pl-10 pr-10 row">
      <div class="col-md-12 d-sm-none d-md-flex pointer">
        <v-card>
          <img
            :src="listAssets[0].app_images.img_hot_banner | getAppBanner"
            @click="test(listAssets[0])"
            class="white--text align-center"
            height="400px"
            width="100%"
          />
          <v-row align="center" class="mx-0" @click="test(listAssets[0])">
            <v-card-title class="title">
              <img
                class="nameIcon"
                :src="listAssets[0].app_images.app_icon | getAppBanner"
                height="30px"
                max-width="10%"
              />
              {{ listAssets[0].name }}
            </v-card-title>
            <div class="review" @click="test(listAssets[0])">
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
        <div class="col-md-8 col-sm-12 col-xs-12 pl-10 pr-10 pointer row">
          <div class="mb-5" v-for="(item, idx) in listAssets" :key="idx"  @click="test(item)">
            <v-card>
              <img
                :src="item.app_images.img_hot_banner | getAppBanner"
                class="white--text align-center"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                width="100%"
                height="250px"
              />
              <v-row align="center" class="mx-0">
                <v-card-title style="font-weight: bold; font-size: 15px">
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

        <v-col class="col-md-4 d-sm-none d-md-flex pointer ranking row">
          <v-card class="mb-5" style="width: 100%; height: 10%">
            <v-card-title
              style="
                font-size: 15px;
                font-weigth: bold;
                width: 100%;
                color: #26a69a;
              "
              >Kogi Store Discover Superb Games</v-card-title
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
              Follow us
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
                color: #26a69a;
                width: 100%;
              "
              >Rankings</v-card-title
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
                  <div
                    style="font-size: 12px; margin-right: 30%; color: #26a69a"
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

          <v-card class="mt-5 genres">
            <v-card-title
              class="justify-center"
              style="
                font-size: 25px;
              font-weigth: bold;
                width: 100%;
                color: #26a69a;
              "
              >Hot Game Tags</v-card-title
            >
            <v-divider class="mb-5"></v-divider>

            <v-btn
              class="mr-3 mb-2"
              outlined
              color="#26a69a"
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
    return { listAssets: [], listTopRate: [], listGenres: [] };
  },
  created() {
    this.fetchHome();
    this.fetchTopRate();
    this.fetchGenres();
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
.flex-container > v-btn {
  text-align: center;
  margin: 10px;
}
.v-card__title {
  width: 50%;
  padding: 8px;
}
.icon {
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
  color: #26a69a;
  font-style: oblique;
}
.rankingCard {
  margin-bottom: 10px;
}

.pointer {
  cursor: pointer;
}
</style>