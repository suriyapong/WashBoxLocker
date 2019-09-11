<template>
  <q-page class="flex flex-center">
    <div class="flex flex-center">
      <img alt="Quasar logo" src="~assets/PickUp/04-Pick-Up.png" />
      <div class="q-pa-md body">
        <div class="row">
          <table>
            <tbody>
              <tr>
                <td align="center">{{ lockerNo }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="q-pa-md footer">
        <div class="row">
          <img @click="ok()" src="~assets/PickUp/04-Pick-Up-btn1.png" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
.body {
  position: absolute;
  padding-top: 0px;
  font-size: 60px;
}
.footer {
  position: absolute;
  padding-top: 380px;
  font-size: 60px;
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
