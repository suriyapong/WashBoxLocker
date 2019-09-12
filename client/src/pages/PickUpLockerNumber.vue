<template>
  <q-page class="bgimg-pickup-2">
    <div class="flex flex-center">
      <div class="q-pa-md body">
        <div class="row">
          <table>
            <tbody>
              <tr>
                <td align="center" style="font-size:130px; padding-top:270px; padding-left:30px;">{{ lockerNo }}</td>
              </tr>
              <tr>
                <td align="center" style="padding-top:100px; padding-left:30px;">
                  <img @click="ok()" src="~assets/PickUp/03-Pick-Up-btn1.png" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="q-pa-md">
        <div class="row" style="padding-top:550px;"></div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.bgimg-pickup-2 {
  background: url("/assets/PickUp/03-Pick-Up.png") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>

<script>
export default {
  name: "PickUpComplete",
  data: () => ({
    //--start config
    service: "locker",
    lockerNo: ""
    //--end config
  }),
  props: ["LockerNo"],
  async mounted() {
    this.lockerNo = this.LockerNo;
  },
  methods: {
    async ok() {
      //clear locker
      const q = {};
      q.Cmd = "ClearPickUp";
      q.LockerNo = this.lockerNo;
      this.$store.dispatch("custom-service/find", { query: q }).then(result => {
        var res = [];
        console.log(result[0].Status);
        if (result[0].Status) {
          this.$router.push({ path: `/pickupcomplete/${this.lockerNo}` });
        } else {
          this.$router.push({ path: `/` });
        }
      });
    }
  }
};
</script>
