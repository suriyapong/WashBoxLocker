<template>
  <q-page class="bgimg-dropoff-2">
    <div class="flex flex-center">
      <div class="q-pa-md" style="padding-top:400px;">
        <div class="row">
          <p>{{ elem }}</p>
          <table align="center">
            <tbody>
              <tr>
                <td align="center">
                  <img
                    @click="choose(1)"
                    alt="Quasar logo"
                    src="~assets/DropOff/02-Drop-Off-btn1.png"
                  />
                </td>
                <td align="center">
                  <img
                    @click="choose(2)"
                    alt="Quasar logo"
                    src="~assets/DropOff/02-Drop-Off-btn2.png"
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
td {
  width: 250px;
  font-size: 25px;
}

.bgimg-dropoff-2 {
  background: url("~assets/DropOff/02-Drop-Off.png") no-repeat center center
    fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>

<script>
import feathersClient from "../plugins/feathers-client";

export default {
  data: () => ({
    //--start config
    service: "locker",
    elem: "",
    timerId:0,
    //--end config
  }),
  mounted() {
    this.startInterval();
  },
  methods: {
    async choose(choice) {
      if (choice == 1) {
        feathersClient
          .service("wash-box-service")
          .patch("CheckAvilable", {})
          .then(result => {
            console.log(result[0].Status);
            if (result[0].Status) {
              this.$router.push({ path: `/dropoffconfirm` });
            } else {
              this.$router.push({ path: `/lockernotavailable` });
            }
          });
      } else {
        this.$router.push({ path: `/pickupcode` });
      }
    },
    countdown() {
      var timeLeft = 30;
      if (timeLeft == -1) {
        clearTimeout(this.timerId);
        doSomething();
      } else {
        this.elem = timeLeft + " seconds remaining";
        timeLeft--;
      }
      alert(this.elem);
    },

    doSomething() {
      alert("Hi");
    },
    startInterval: function() {
      this.timerId = setInterval(this.countdown(), 1000);
    }
  }
};
</script>
