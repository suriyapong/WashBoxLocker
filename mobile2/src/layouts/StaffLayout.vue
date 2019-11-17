<template>
  <v-layout view="hHh lpR fFf">
    <v-header elevated>
      <v-toolbar>
        <!-- <v-toolbar-title class="absolute-center">Wash Box</v-toolbar-title> -->
        <v-btn
          flat
          color="white"
          icon-right="account_circle"
          label="Logout"
          @click="logout"
          class="absolute-right"
        >Logout</v-btn> 
      </v-toolbar>
    </v-header>
    <v-footer>
      <v-tabs>
        <v-route-tab
          v-for="nav in navs"
          :key="nav.lable"
          :icon="nav.icon"
          
          :to="nav.to"
        />
      </v-tabs>
    </v-footer>
    <v-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      bordered
      content-class="bg-primary"
    >
      <v-list>
        <v-item
          v-for="nav in navs"
          class="text-white"
          :to="nav.to"
          exact
          clickable
          :key="nav.lable"
        >
          <v-item-section avatar>
            <v-icon :name="nav.icon" />
          </v-item-section>
          <v-item-section>
            <v-item-label>{{nav.lable}}</v-item-label>
          </v-item-section>
        </v-item>
      </v-list>
    </v-drawer>

    <v-page-container>
      <router-view />
    </v-page-container>
  </v-layout>
</template>

<script>

export default {
  name: "StaffLayout",
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      navs: [
        {
          lable: "Locker",
          icon: "description",
          to: "/locker"
        },
                {
          lable: "Open locker",
          icon: "description",
          to: "/openlocker"
        }
      ]
    };
  },
  methods: {
    async logout(){
      await this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  }
};
</script>

<style>
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}
</style>
