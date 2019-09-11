<template>
  <q-page class="flex flex-center">
    <img @click="nextPage()" src="~assets/DropOff/03-Drop-Off.png" />
  </q-page>
</template>

<style>
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
      }, 5000);
    }
  }
};
</script>
