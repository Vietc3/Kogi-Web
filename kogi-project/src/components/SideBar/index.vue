<template>
  <v-navigation-drawer
    id="slideBar"
    class="nav-sidebar__ul"
    :permanent="$vuetify.breakpoint.mdAndUp"
    :mini-variant="valueMiniVariant"
    v-model="drawerProps"
    width="240"
    app
  >
    <v-list>
      <v-list-item
        v-for="routerLink in routerPath"
        :key="routerLink.name"
        router
        :to="routerLink.path"
        active-class="border"
      >
        <v-list-item-action>
          <v-icon>{{ routerLink.meta.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>{{ $t(`route.${routerLink.meta.title}`)  }}</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import routerPath from "@/router/index";
export default {
  name: "SideBar",
  props: ["valueMiniVariant", "drawerProps"],
  watch: {
    "drawerProps": function () {
      this.$emit("drawerPropsChange", this.drawerProps);
      return JSON.parse(this.drawerProps);
    },
  },
  data: () => {
    return {
      routerPath: routerPath.options.routes[0].children
    };
  },
};
</script>
<style scope>
#border {
  border-left: 4px solid #a9f5f2;
}
.theme--light.v-list {
    color: #26a69a;
}
</style>