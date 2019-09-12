<template>
  <q-page class="bgimg-dropoff-1" @click="nextPage()">
  </q-page>
</template>

<style scoped>
.bgimg-dropoff-1 {
  background: url("/assets/DropOff/01-Drop-Off.png") no-repeat center center
    fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>

<script>
export default {
  data: () => ({
    //--start config
    
    //--end config
  }),
  computed: {},
  async mounted() {
    //init here
  },
  methods: {
    nextPage(){
       this.$router.push({ path: `/mainmenu` });
    }
  }
};
</script>
