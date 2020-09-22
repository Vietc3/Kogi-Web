<template>
    
      <v-navigation-drawer id="slideBar"  class="nav-sidebar__ul" v-model="drawer" app>
        <v-list>
          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.router"
           
            active-class="border"
          >
            <v-list-item-action>
              <v-icon>{{link.icon}}</v-icon>
            </v-list-item-action>
            <v-list-item-content>{{link.text}}</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    
  
</template>

<script>
export default {
  name: "SideBar",
  data: () => ({
    drawer: true,
    links: [
      { icon: "fas fa-home", text: "Home", router: "/" },
      { icon: "mdi-trophy", text: "Rankings", router: "/rankings" },
      { icon: "mdi-compass-outline", text: "Discover", router: "/discover" },
    ],
  }),
};
</script>
<style scope>
#border {
  border-left: 4px solid #A9F5F2;

}


</style>