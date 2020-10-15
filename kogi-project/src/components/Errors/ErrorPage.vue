<template>
  <app-center>
    <template v-slot:page>
      <h1 class="display-2" style="color:#14b9c8">
        {{ `${$t('errors.whoops')}, ${errorCode}` }}
      </h1>
      <p class="mt-5">{{ $t(`errors.${errorCode}`) }}</p>
      <v-btn
        outlined
        color="#14b9c8"
        @click="$router.go(-1)"
      >
        {{ $t('errors.back') }}
      </v-btn>
    </template>
  </app-center>
</template>

<script>
import AppCenter from './AppCenter.vue';

export default {
  name: 'ErrorPage',
  components: {
    AppCenter,
  },
  props: {
    errorCode: {
      type: Number,
      default: 404,
    },
  },
  data: () => ({}),
};
</script>
