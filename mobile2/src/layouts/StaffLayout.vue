<template>
  <v-card class="mx-auto overflow-hidden" height="100%">
    <v-system-bar color="indigo darken-1"></v-system-bar>

    <v-app-bar color="indigo accent-4" dark prominent>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Wash Box Locker</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn @click="logout" text>
        <span class="mr-2">Logout</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item @click="Locker()">
            <v-list-item-title>Locker</v-list-item-title>
          </v-list-item>

          <v-list-item @click="OpenLocker()">
            <v-list-item-title>Open Locker</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-card-text>
      <router-view></router-view>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null
  }),

  watch: {
    group() {
      this.drawer = false;
    }
  },
  methods: {
    Locker() {
       this.$router.push("/locker");
    },
    OpenLocker() {
       this.$router.push("/openlocker");
    },
    async logout() {
      // await this.$store.dispatch('auth/logout');
      this.$router.push("/login");
    }
  }
};
</script>