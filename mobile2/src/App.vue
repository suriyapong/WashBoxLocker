<template>
  <v-app>
    <!-- <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
         <v-icon>mdi-open-in-new</v-icon>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="assets\img\logo-washbox.png"
          transition="scale-transition"
          width="40"
        />
        <div class="text-h3">washbox</div>
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->

    <v-content>
      <!-- <Navbar></Navbar> -->
      <!-- <HelloWorld/> -->
      
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

import Navbar from "./components/Navbar";

export default {
  name: "App",

  components: {
    //HelloWorld
  },

  data: () => ({
    //
  }),
  components: {
    Navbar,
  },
};
</script>
