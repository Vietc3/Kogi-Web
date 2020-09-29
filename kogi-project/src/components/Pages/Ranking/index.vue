<template>
  <v-btn class="black--text caption" href="/shop" text
    >Ranking <v-icon class="black--text caption">mdi-arrow-right</v-icon></v-btn
  >
</template>

<script>
import variables from "@/variables";
export default {
  name: "Home",

  data() {
    return { test: variables.urlImage };
  },

  mounted(){
      console.log(process.env.URL_IMAGE);
      console.log(process.env.ROOT_API);
  }
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
</style>