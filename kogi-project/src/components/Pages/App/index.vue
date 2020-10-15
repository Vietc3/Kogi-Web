<template>
  <div :class="$vuetify.breakpoint.smAndDown ? 'pl-2  row' : 'pl-10 pr-10 row'">
    <v-progress-circular
      :active="loading"
      :indeterminate="loading"
      :class="loading === false ? 'd-none' : null"
      absolute
      bottom
      color="#14b9c8"
      style="margin-bottom: 10px; margin-left: 48%"
    ></v-progress-circular>

    <v-row v-if="loading === false">
      <div
        :class="
          $vuetify.breakpoint.mobile
            ? 'col-md-12 col-sm-12 col-xs-12  pr-5 row'
            : 'col-md-8 col-sm-12 col-xs-12 pl-10 pr-10 row'
        "
      >
        <div class="mb-5 col-12" height="100%">
          <v-card class="col-12" elevation="5">
            <div class="d-flex justify-space-between">
              <div>
                <v-avatar
                  class="ma-3"
                  :size="$vuetify.breakpoint.smAndDown ? 110 : 200"
                  tile
                >
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
                  v-if="$vuetify.breakpoint.mobile === false"
                ></v-card-title>

                <v-card-text
                  v-else
                  class="headline text-left"
                  v-text="asset.name"
                ></v-card-text>

                <div class="d-flex">
                  <v-btn
                    class="pt-0 ml-4 mr-2"
                    color="#14b9c8"
                    outlined
                    small
                    v-text="asset.genres_code"
                  ></v-btn>
                  <v-btn
                    class="pt-0 mr-2"
                    color="#14b9c8"
                    outlined
                    small
                    v-text="asset.platform_code"
                  ></v-btn>
                </div>

                <div class="ml-4" v-if="$vuetify.breakpoint.mobile === false">
                  <v-btn
                    class="mt-3"
                    color="#14b9c8"
                    @click="downloadGame()"
                    large
                    dark
                  >
                    {{ $t("download") }}
                    <v-icon dark>mdi-cellphone-android</v-icon>
                  </v-btn>
                  <v-btn class="mt-3" color="#14b9c8" large dark>
                    Google Play
                    <v-icon dark>mdi-google-play</v-icon>
                  </v-btn>
                </div>            
              </div>
            </div>
               <div class="d-flex" v-if="$vuetify.breakpoint.mobile === true" >
                  <v-btn
                    class="mt-3 mr-3 ml-3"
                    @click="downloadGame()"
                    color="#14b9c8"
                    width="45%"
                    dark
                  >
                    {{ $t("download") }}
                    <v-icon dark>mdi-cellphone-android</v-icon>
                  </v-btn>
                  <v-btn class="mt-3" color="#14b9c8" width="45%" dark>
                    Google Play
                    <v-icon dark>mdi-google-play</v-icon>
                  </v-btn>
                </div>
          </v-card>

          <v-card class="col-12 mt-5" elevation="5">
            <v-card-title
              class="headline font-weight-bold text-center"
              style="border-left: 7px solid #14b9c8"
            >
              {{ $t("detail") }}
            </v-card-title>
            <v-divider class="mb-5"></v-divider>

            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <div class="d-flex">
                  <v-icon color="#14b9c8" fab dark
                    >mdi-android-debug-bridge</v-icon
                  >
                  <v-card-text class="text-left"
                    >Android 7.0 and above</v-card-text
                  >
                </div>
                <div class="d-flex">
                  <v-icon color="#14b9c8" fab dark>mdi-map</v-icon>
                  <v-card-text class="text-left">Viet Nam</v-card-text>
                </div>
              </div>

              <div>
                <div class="d-flex">
                  <v-icon color="#14b9c8" fab dark>mdi-wifi</v-icon>
                  <v-card-text class="text-left">Network Required</v-card-text>
                </div>
                <div class="d-flex">
                  <v-icon color="#14b9c8" fab dark> mdi-flag-variant</v-icon>
                  <v-card-text class="text-left">{{
                    asset.genres_code
                  }}</v-card-text>
                </div>
              </div>

              <div>
                <div :class="$vuetify.breakpoint.mobile?'d-flex mt-2':'d-flex'">
                  <v-icon color="#14b9c8" fab dark>mdi-star-circle</v-icon>
                  <v-card-text class="text-left">{{
                    asset.metrics.vote_average
                  }}</v-card-text>
                </div>
                <div class="d-flex">
                  <v-icon color="#14b9c8" fab dark>mdi-file</v-icon>
                  <v-card-text class="text-left">{{
                    asset.app[asset.app.length - 1].apkinfo.text
                  }}</v-card-text>
                </div>
              </div>
            </div>
          </v-card>

          <v-expansion-panels accordion>
            <v-expansion-panel class="col-12 mt-5">
              <v-expansion-panel-header
                class="headline font-weight-bold text-center"
                style="border-left: 7px solid #14b9c8"
                >{{ $t("description") }}</v-expansion-panel-header
              >
              <v-expansion-panel-content class="text-left">
                "{{ asset.description }}"
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel class="col-12 mt-5">
              <v-expansion-panel-header
                class="headline font-weight-bold text-center"
                style="border-left: 7px solid #14b9c8"
                >{{ $t("content") }}</v-expansion-panel-header
              >
              <v-expansion-panel-content class="text-left">
                "{{ asset.content }}"
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-card class="col-12 mt-5" elevation="5">
            <v-card-title>
              <v-icon large left> mdi-message </v-icon>
              <span class="title font-weight-light">{{ $t("comment") }}</span>
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
                      :src="listRatingComment[listRatingComment.users[idx]]
                        .photoURL? listRatingComment[listRatingComment.users[idx]]
                        .photoURL:'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light'"
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
            <div v-if="$store.state.user.id !==''">
              <v-divider class="mb-5"></v-divider>
              <v-col cols="12">
                <v-card-actions>
                  <span
                    class="text--lighten-2 caption mr-2"
                    style="color: #14b9c8"
                  >
                    Vote
                  </span>
                  <v-rating
                    v-model="userRating"
                    background-color="orange lighten-3"
                    color="orange"
                    size="20"
                  ></v-rating>
                </v-card-actions>

                <v-form
                  class="d-flex justify-space-between"
                  ref="form"
                  v-model="valid"
                >
                  <v-text-field
                    class="col-9"
                    :label="$t(`yourComment`)"
                    auto-grow
                    outlined
                    rows="1"
                    row-height="15"
                    v-model="userComment"
                    :rules="rules"
                    required
                  ></v-text-field>
                  <v-btn
                    :disabled="!valid"
                    class="mt-3 col-3 ml-3"
                    color="#14b9c8"
                    :dark="valid"
                    @click="submitComment"
                  >
                    {{ $t(`submitComment`) }}</v-btn
                  >
                </v-form>
              </v-col>
            </div>

            <div v-else>

           
             <v-divider class="mb-5"></v-divider>
              <v-col cols="12">
                          
                  <v-btn    
                    class="mt-3 col-6 ml-3"
                    color="#14b9c8"
                    :dark="valid"
                    @click="redirectLogin"
                    large
                  >
                  Login to comment
                   </v-btn
                  >
              </v-col>
            </div>
          </v-card>
        </div>
      </div>

      <div
        :class="
          $vuetify.breakpoint.mobile ? 'd-none' : 'col-md-4 ranking row mt-3'
        "
        style="height: 1000px"
      >
        <v-card class="col-12" style="height: 150px" elevation="5">
          <v-card-text
            style="
              font-size: 15px;
              width: 100%;
              color: #14b9c8;
               font-weigth: bold;
              margin-top: 0px;
              padding-top: 0px !important;
              border-left: 7px solid #14b9c8;
               text-align: left;
            "
          >
            {{ $t("sologan") }}</v-card-text
          >
          <div
            class="grey--text ml-3"
            style="
              font-size: 12px;

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

        <v-card class="col-12 mb-8 mt-5" elevation="5">
          <v-card-title
            class="justify-center"
            style="
              font-size: 25px;
              font-weigth: bold;
              color: black;
              width: 100%;
              padding-top: 0px !important;
              border-left: 7px solid #14b9c8;
            "
          >
            {{ $t("similar") }}</v-card-title
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
              <div
                align="left"
                class="rankingItemName pointer"
                @click="redirecAppInfo(item)"
              >
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
      </div>
    </v-row>
  </div>
</template>

<script>
import RepositoryFactory from "@/utils/RepositoryFactory";
const AssetsRepository = RepositoryFactory.get("assets");
const UserRepository = RepositoryFactory.get("users");
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
      userRating: 0,
      userComment: "",

      valid: true,
      rules: [
        (v) => !!v || "Comment is required",
        (v) => v.length <= 25 || "Max 25 characters",
      ],
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
    downloadGame() {
      window.location.href =
        variables.urlImage +
        "/" +
        this.asset.app[this.asset.app.length - 1].apk_url;
    },

    async redirecAppInfo(value) {
      this.loading = true;
      const { data } = await AssetsRepository.findAssetById(value.id);
      const dataComment = await AssetsRepository.findRatingComments(value.id);
      const dataSimilar = await AssetsRepository.findAssetByGenres(
        data.genres_code
      );

      this.asset = data;

      this.listSimilar = dataSimilar.data.results;
      this.listSimilar = this.listSimilar.filter((similar, index) => {
        return index <= 9;
      });
      this.listRatingComment = dataComment.data;
      this.loading = false;
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
      this.listSimilar = this.listSimilar.filter((similar, index) => {
        return index <= 9;
      });
      this.listRatingComment = dataComment.data;
      this.loading = false;
    },
    submitComment() {
      if (this.valid === true &&this.$store.state.user.id!=='' ) {
        let post = {
          uid: this.$store.state.user.id,
          asset_id: this.$route.params.id,
          comment: this.userComment,
          rating: this.userRating,
        };
        UserRepository.voteApp(post);
      }
      else{
        this.$router.push({ name: "Login" });
      }
    },
    redirectLogin(){
       this.$router.push({ name: "Login" });
    }
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
  color: #14b9c8;
  font-style: oblique;
}
.rankingCard {
  margin-bottom: 10px;
}
.pointer {
  cursor: pointer;
}
</style>