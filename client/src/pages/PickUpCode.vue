<template>
  <q-page class="bgimg-pickup-1">
    <div class="flex flex-center" style="padding-top:20px;">
      <div class="q-pa-md">
        <div class="row" style="width:1210px; padding-top:175px">
          <div class="col-5" style="padding-top:55px; padding-left:85px;">
            <table>
              <tbody>
                <tr>
                  <td class="btn-number" @click="codeNo(1)" align="center">
                    <img src="assets/PickUp/02-Pick-Up-btn-number1.png" />
                  </td>
                  <td class="btn-number" @click="codeNo(2)" align="center">
                    <img src="assets/PickUp/02-Pick-Up-btn-number2.png" />
                  </td>
                  <td class="btn-number" @click="codeNo(3)" align="center">
                    <img src="assets/PickUp/02-Pick-Up-btn-number3.png" />
                  </td>
                </tr>
                <tr>
                  <td class="btn-number" @click="codeNo(4)" align="center">
                    <img src="assets/PickUp/02-Pick-Up-btn-number4.png" />
                  </td>
                  <td class="btn-number" @click="codeNo(5)" align="center">
                    <img src="assets/PickUp/02-Pick-Up-btn-number5.png" />
                  </td>
                  <td class="btn-number" @click="codeNo(6)" align="center">
                    <img src="assets/PickUp/02-Pick-Up-btn-number6.png" />
                  </td>
                </tr>
                <tr>
                  <td class="btn-number" @click="codeNo(7)" align="center">
                    <img src="assets/PickUp/02-Pick-Up-btn-number7.png" />
                  </td>
                  <td class="btn-number" @click="codeNo(8)" align="center">
                    <img src="assets/PickUp/02-Pick-Up-btn-number8.png" />
                  </td>
                  <td class="btn-number" @click="codeNo(9)" align="center">
                    <img src="assets/PickUp/02-Pick-Up-btn-number9.png" />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td class="btn-number" @click="telephoneNo(0)" align="center">
                    <img src="assets/PickUp/02-Pick-Up-btn-number0.png" />
                  </td>
                  <td class="btn-number" @click="deleteTelephoneNo()" align="center">
                    <img src="assets/PickUp/02-Pick-Up-btn-numberX.png" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-7" align="center" style="padding-top:170px;">
            <q-input
              class="text-h2"
              style="padding-left:150px; text-align:center;"
              v-model="formModel.OTP"
            />
            <p style="padding-top:100px;">
              <img @click="ok()" src="~assets/PickUp/02-Pick-Up-btn-1.png" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
textarea:focus, input:focus{
    outline: none;
}
.bgimg-pickup-1 {
  background: url("~assets/PickUp/02-Pick-Up.png") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

td {
  width: 100px;
  font-size: 25px;
}
</style>

<script>
import feathersClient from "../plugins/feathers-client";

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
      if (this.formModel.OTP.length >= 4) {
        //check OTP
        feathersClient
          .service("wash-box-service")
          .patch("CheckCodePickUp", { OTP: this.formModel.OTP })
          .then(result => {
            console.log(result[0].LockerID);
            if (result[0].LockerID != 0) {
              this.$router.push({
                path: `/pickuplockernumber/${result[0].LockerID}`
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
