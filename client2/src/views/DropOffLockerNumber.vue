<template>
  <div class="bgimg-dropoff-4">
    <div class="flex flex-center">
      <div class="q-pa-md">
        <div class="row action">
          <table>
            <tbody>
              <tr>
                <td align="center" style="font-size:130px; padding-top:270px;">{{ lockerNo }}</td>
              </tr>
              <tr>
                <td align="center" style="padding-top:100px;">
                  <img @click="ok()" src="../assets/DropOff/06-Drop-Off-btn1.png" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.action {
  display: flex;
  align-items: center;
  justify-content: center;
}

.bgimg-dropoff-4 {
  background: url("../assets/DropOff/06-Drop-Off.png") no-repeat center center
    fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100%;
  width: 100%;
}
</style>

<script>
// import feathersClient from "../plugins/feathers-client";

export default {
  name: "DropOffPhoneNumber",
  data: () => ({
    //--start config
    lockerNo: ""
    //--end config
  }),
  props: ["LockerNo"],
  async mounted() {
    this.lockerNo = this.LockerNo;
    //this.startInterval();
  },
  methods: {
    ok() {
      // feathersClient
      //   .service("wash-box-service")
      //   .patch("OpenLocker", { LockerID: this.LockerNo })
      //   .then(no => {
      //     if (no != 0) {
      this.$router.push({ path: `/dropoffcomplete/${this.LockerNo}` });
      //}
      // });
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
