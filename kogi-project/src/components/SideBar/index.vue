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
        v-for="link in links"
        :key="link.text"
        router
        :to="link.router"
        active-class="border"
      >
        <v-list-item-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>{{ link.text }}</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
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
      links: [
        { icon: "fas fa-home", text: "Home", router: "/" },
        { icon: "mdi-trophy", text: "Rankings", router: "/rankings" },
        { icon: "mdi-compass-outline", text: "Discover", router: "/discover" },
      ],
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