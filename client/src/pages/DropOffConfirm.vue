<template>
  <q-page class="bgimg-dropoff-3">
    <div class="flex flex-center">
      <div class="q-pa-md" style="padding-top:400px;">
        <div class="row">
          <table align="center">
            <tbody>
              <tr>
                <td align="center">
                  <img
                    @click="choose(1)"
                    alt="Quasar logo"
                    src="~assets/DropOff/04-Drop-Off-btn1.png"
                  />
                </td>
                <td align="center">
                  <img
                    @click="choose(2)"
                    alt="Quasar logo"
                    src="~assets/DropOff/04-Drop-Off-btn2.png"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.bgimg-dropoff-3 {
  background: url("~assets/DropOff/04-Drop-Off.png") no-repeat center center
    fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

td {
  width: 250px;
  font-size: 25px;
}
</style>

<script>
export default {
  name: "DropOffConfirm",
  data: () => ({
    //--start config
    //--end config
  }),
  async mounted() {
    //this.startInterval();
  },
  methods: {
    choose(choice) {
      if (choice == 1) {
        this.$router.push({ path: `/dropoffphonenumber` });
      } else {
        this.$router.push({ path: `/` });
      }
    },
    startInterval() {
      this.stop = false;
      console.log(this.stop);
      var x = setInterval(() => {
        clearInterval(x);
        this.gotoMain();
      }, 15 * 1000);
    },

    gotoMain() {
      this.$router.push({ path: `/` });
    }
  }
};
</script>
