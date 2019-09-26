
<style>
.spacetop {
  margin-top: 80px;
}
</style>

<template>
  <v-app>
    
    <v-content style="background-color: lightgrey;">
     
        <router-view></router-view>
     
    </v-content>
   
  </v-app>
</template>

<script>
import feathersClient from "./plugins/feathers-client";
export default {
  name: "App",
  components: {},
  data: () => ({
    activeBtn: 1,
    drawer: null,
    User: ""
  }),
  async mounted() {
  },
  methods: {
    
  }
};
</script>

