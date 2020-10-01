<template>
  <div class="pl-10 pr-10 row" >
   
  <v-progress-circular
      :active="loading"
      :indeterminate="loading"
      :class="loading===false?'d-none':null"
      absolute
      bottom
      color="teal"
      style="margin-bottom:10px; margin-left:48%"
    ></v-progress-circular>

    <v-row v-if="loading===false">

      <div class="col-md-8 col-sm-12 col-xs-12 pl-10 pr-10 row">
        <div class="mb-5 col-12" height="100%">
          <v-card class="col-12">
            <div class="d-flex justify-space-between">
              <div>
                <v-avatar class="ma-3" size="200" tile>
                  <v-img
                    class="icon"
                    :src="asset.app_images.app_icon | getAppBanner"
                  />
                </v-avatar>
                <v-rating
                  :value="asset.metrics.vote_average"
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
                  v-text="asset.name"
                ></v-card-title>
                <div class="d-flex">
                  <v-btn
                    class="pt-0 ml-4 mr-2"
                    color="teal"
                    outlined
                    small
                    v-text="asset.genres_code"
                  ></v-btn>
                  <v-btn
                    class="pt-0 mr-2"
                    color="teal"
                    outlined
                    small
                    v-text="asset.platform_code"
                  ></v-btn>
                </div>

                <div class="ml-4">
                  <v-btn class="mt-3" color="teal" large dark>
                    Download
                    <v-icon dark>mdi-cellphone-android</v-icon>
                  </v-btn>
                  <v-btn class="mt-3" color="teal" large dark>
                    Google Play
                    <v-icon dark>mdi-google-play</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>
          </v-card>

          <v-card class="col-12 mt-5">
            <v-card-title class="headline font-weight-bold text-center">
              Details
            </v-card-title>
            <v-divider class="mb-5"></v-divider>

            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <div class="d-flex">
                  <v-icon color="#26a69a" fab dark
                    >mdi-android-debug-bridge</v-icon
                  >
                  <v-card-text class="text-left"
                    >Android 7.0 and above</v-card-text
                  >
                </div>
                <div class="d-flex">
                  <v-icon color="#26a69a" fab dark>mdi-map</v-icon>
                  <v-card-text class="text-left">Viet Nam</v-card-text>
                </div>
              </div>

              <div>
                <div class="d-flex">
                  <v-icon color="#26a69a" fab dark>mdi-wifi</v-icon>
                  <v-card-text class="text-left">Network Required</v-card-text>
                </div>
                <div class="d-flex">
                  <v-icon color="#26a69a" fab dark> mdi-flag-variant</v-icon>
                  <v-card-text class="text-left">{{
                    asset.genres_code
                  }}</v-card-text>
                </div>
              </div>

              <div>
                <div class="d-flex">
                  <v-icon color="#26a69a" fab dark>mdi-star-circle</v-icon>
                  <v-card-text class="text-left">{{
                    asset.metrics.vote_average
                  }}</v-card-text>
                </div>
                <div class="d-flex">
                  <v-icon color="#26a69a" fab dark>mdi-file</v-icon>
                  <v-card-text class="text-left">{{
                    asset.app[asset.app.length - 1].apkinfo.text
                  }}</v-card-text>
                </div>
              </div>
            </div>
          </v-card>

          <v-expansion-panels accordion >
            <v-expansion-panel class="col-12 mt-5" >
              <v-expansion-panel-header
              
                class="headline font-weight-bold text-center"
                >Description</v-expansion-panel-header
              >
              <v-expansion-panel-content class="text-left">
                "{{ asset.description }}"
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel class="col-12 mt-5">
              <v-expansion-panel-header
                class="headline font-weight-bold text-center"
                >Content</v-expansion-panel-header
              >
              <v-expansion-panel-content class="text-left">
                "{{ asset.content }}"
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-card class="col-12 mt-5" >
            <v-card-title>
              <v-icon large left> mdi-message </v-icon>
              <span class="title font-weight-light">Comment</span>
            </v-card-title>

            <div v-for="(item, idx) in listRatingComment.count" :key="idx">
              <v-divider class="mb-5"></v-divider>
              <v-card-text class="headline font-weight-bold">
                "{{ listRatingComment[listRatingComment.users[idx]].comment }}"
              </v-card-text>

              <v-card-actions>
                <v-list-item class="grow">
                  <v-list-item-avatar color="grey darken-3">
                    <v-img
                      class="elevation-6"
                      alt=""
                      src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content class="mr-10">
                    <v-list-item-title>{{
                      listRatingComment[listRatingComment.users[idx]]
                        .displayName
                    }}</v-list-item-title>
                  </v-list-item-content>

                  <v-row align="center" justify="end">
                    <v-icon class="mr-1"> mdi-heart </v-icon>
                    <span class="subheading mr-2">256</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1"> mdi-share-variant </v-icon>
                    <span class="subheading">45</span>
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </div>
          </v-card>
        </div>
      </div>

      <v-col class="col-md-4 d-sm-none d-md-flex ranking row mt-3" style="height:1200px;">
        <v-card class="col-12" style="height: 150px;" >
          <v-card-text
            style="
              font-size: 15px;
              font-style: oblique;
              width: 100%;
              color: #26a69a;
              margin-top:0px
              padding-top:0px !important
            "
            >Kogi Store Discover Superb Games</v-card-text
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

        <v-card class="col-12 mb-8 mt-5">
          <v-card-title
            class="justify-center"
            style="
              font-size: 25px;
              font-weigth: bold;
              color: #26a69a;
              width: 100%;
                 padding-top:0px !important
            "
            >Similars</v-card-title
          >
          <v-divider class="mb-5"></v-divider>
          <div>
            <v-row
              
              class="mx-0 align-left rankingCard"
              v-for="(item, index) in listSimilar"
              :key="item.id"
            >
              <div class="rank">{{ index + 1 }}</div>
              <div class="itemRanking">
                <img
                  :src="item.app_images.app_icon | getAppBanner"
                  class="white--text align-center pointer icon"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  width="60%"
                  height="60px"
                  @click="redirecAppInfo(item)"
                />
              </div>
              <div align="left" class="rankingItemName pointer" @click="redirecAppInfo(item)">
                <div style="font-size: 12px; margin-right: 30%; color: #26a69a">
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
</template>

<script>
import RepositoryFactory from "@/utils/RepositoryFactory";
const AssetsRepository = RepositoryFactory.get("assets");
let brand_icon_default = require("@/assets/icon-default.png");
import variables from "@/variables";
export default {
  name: "AppAsset",
  data() {
    return {
      asset: [],
      listSimilar: [],
      listRatingComment: [],
      loading: true,
    };
  },

  filters: {
    getAppBanner(value) {
      if (value === "") {
        return this.brand_icon_default;
      }
      return variables.urlImage + "/" + value;
    },
  },

  created() {
    this.fetchAsset();
  },

  methods: {
     async redirecAppInfo(value) {
        this.loading= true;
        const { data } = await AssetsRepository.findAssetById(
        value.id
      );
      const dataComment = await AssetsRepository.findRatingComments(
        value.id
      );
      const dataSimilar = await AssetsRepository.findAssetByGenres(
        data.genres_code
      );

      this.asset = data;

      this.listSimilar = dataSimilar.data.results;
       this.listSimilar= this.listSimilar.filter((similar,index)=>{return index<=9})
      this.listRatingComment = dataComment.data;
      this.loading= false;

    },
    async fetchAsset() {
      const { data } = await AssetsRepository.findAssetById(
        this.$route.params.id
      );
      const dataComment = await AssetsRepository.findRatingComments(
        this.$route.params.id
      );
      const dataSimilar = await AssetsRepository.findAssetByGenres(
        data.genres_code
      );

      this.asset = data;

      this.listSimilar = dataSimilar.data.results;
       this.listSimilar= this.listSimilar.filter((similar,index)=>{return index<=9})
      this.listRatingComment = dataComment.data;
      this.loading= false;
    },
  },
};
</script>

<style scoped>
.icon {
}
.itemRanking {
  height: 30%;
  width: 30%;
}
.rankingItemName {
  width: 50%;
}
.rank {
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