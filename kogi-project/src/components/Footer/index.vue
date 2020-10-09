<template>
  <v-footer id="footerApp" :padless="true">
    <v-card flat tile width="100%" class="secondary white--text text-center">
      <v-card-text>
        <v-btn class="mx-4 white--text" icon>
          <v-icon size="24px">mdi-home</v-icon>
        </v-btn>
        <v-btn class="mx-4 white--text" icon>
          <v-icon size="24px">mdi-email</v-icon>
        </v-btn>
        <v-btn class="mx-4 white--text" icon>
          <v-icon size="24px">mdi-calendar</v-icon>
        </v-btn>
        <v-btn class="mx-4 white--text" icon>
          <v-icon size="24px">mdi-delete</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text text-left pt-0"
        >{{$t('copyRight')}}
      </v-card-text>

      <v-card-text class="white--text text-left pt-0"
        >{{$t('address')}}
      </v-card-text>
      <v-card-text class="white--text text-left pt-0"
        >{{$t('phone')}}
      </v-card-text>
      <v-card-text class="white--text pt-0">GIHOT STUDIO </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="grey--text">
        {{ new Date().getFullYear() }} —
        <strong class="white--text">Kogi Store</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "footerApp",
};
</script>