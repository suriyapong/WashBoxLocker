<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">Wash Box</q-toolbar-title>
        <q-btn
          flat
          color="white"
          icon-right="account_circle"
          label="Logout"
          @click="logout"
          class="absolute-right"
        /> 
      </q-toolbar>
    </q-header>
    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.lable"
          :icon="nav.icon"
          
          :to="nav.to"
        />
      </q-tabs>
    </q-footer>
    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="250"
      bordered
      content-class="bg-primary"
    >
      <q-list>
        <q-item
          v-for="nav in navs"
          class="text-white"
          :to="nav.to"
          exact
          clickable
          :key="nav.lable"
        >
          <q-item-section avatar>
            <q-icon :name="nav.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{nav.lable}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";

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
        }
      ]
    };
  },
  methods: {
    openURL,
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
