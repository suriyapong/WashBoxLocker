<template>
  <q-page>
    <div class="flex flex-center">
      <img @click="nextPage()" alt="Quasar logo" src="~assets/PickUp/02-Pick-Up.png" />
      <div class="q-pa-md body">
        <div class="row">
          <table align="center">
            <tbody>
              <tr>
                <td align="center" colspan="5" height="180px">
                  <b>{{ formModel.OTP }}</b>
                </td>
              </tr>
              <tr>
                <td @click="codeNo(1)" align="center">1</td>
                <td @click="codeNo(2)" align="center">2</td>
                <td @click="codeNo(3)" align="center">3</td>
              </tr>
              <tr>
                <td @click="codeNo(4)" align="center">4</td>
                <td @click="codeNo(5)" align="center">5</td>
                <td @click="codeNo(6)" align="center">6</td>
              </tr>
              <tr>
                <td @click="codeNo(7)" align="center">7</td>
                <td @click="codeNo(8)" align="center">8</td>
                <td @click="codeNo(9)" align="center">9</td>
              </tr>
              <tr>
                <td></td>
                <td @click="codeNo(0)" align="center">0</td>
                <td></td>
              </tr>
              <tr></tr>
              <tr>
                <td align="center" colspan="5">
                  <img @click="ok()" alt="Quasar logo" src="~assets/DropOff/05-Drop-Off-btn1.png" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
.body {
  position: absolute;
  padding-top: 80px;
}
td {
  width: 100px;
  font-size: 25px;
}
</style>

<script>
export default {
  name: "Drop-Off-1",
  data: () => ({
    //--start config
    service: "locker",
    formModel: {
      Active: 1,
      TelNo: "",
      OTP: ""
    }
    //--end config
  }),
  async mounted() {},
  methods: {
    codeNo(no) {
      if (this.formModel.OTP.length < 4) {
        this.formModel.OTP = this.formModel.OTP + no;
      }
    },
    async ok() {
      if (this.formModel.OTP.length == 4) {
        //check OTP
        const q = {};
        q.Cmd = "CheckCodePickUp";
        q.Code = this.formModel.OTP;
        this.$store
          .dispatch("custom-service/find", { query: q })
          .then(result => {
            var res = [];
            if (result[0].LockerNo != 0) {
              this.$router.push({
                path: `/pickuplockernumber/${result[0].LockerNo}`
              });
            } else {
              this.$router.push({ path: `/` });
            }
          });
      }
    }
  }
};
</script>
