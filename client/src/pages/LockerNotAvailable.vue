<template>
  <q-page class="bgimg-dropoff-available">
  </q-page>
</template>

<style scoped>
td {
  width: 250px;
  font-size: 25px;
}

.bgimg-dropoff-available {
  background: url("~assets/DropOff/03-Drop-Off.png") no-repeat center center
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
    this.startInterval();
  },
  methods: {
    startInterval: function() {
      var handle = setInterval(() => {
        this.$router.push({ path: `/` });

        // When you want to cancel it:
        clearInterval(handle);
        handle = 0; // I just do this so I know I've cleared the interval
      }, 5*1000);
    }
  }
};
</script>
