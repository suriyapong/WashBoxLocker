<template>
  <div class="bgimg-dropoff-4">
    <div class="flex flex-center" style="padding-top:20px;">
      <div class="q-pa-md">
        <div class="row action" style="padding-top:175px">
          <div class="col-5" style="padding-top:75px; padding-left:140px;">
            <table>
              <tbody>
                <tr>
                  <td class="btn-number" @click="telephoneNo(1)" align="center">
                    <img src="../assets/DropOff/05-Drop-Off-btn-number1.png" />
                  </td>
                  <td class="btn-number" @click="telephoneNo(2)" align="center">
                    <img src="../assets/DropOff/05-Drop-Off-btn-number2.png" />
                  </td>
                  <td class="btn-number" @click="telephoneNo(3)" align="center">
                    <img src="../assets/DropOff/05-Drop-Off-btn-number3.png" />
                  </td>
                </tr>
                <tr>
                  <td class="btn-number" @click="telephoneNo(4)" align="center">
                    <img src="../assets/DropOff/05-Drop-Off-btn-number4.png" />
                  </td>
                  <td class="btn-number" @click="telephoneNo(5)" align="center">
                    <img src="../assets/DropOff/05-Drop-Off-btn-number5.png" />
                  </td>
                  <td class="btn-number" @click="telephoneNo(6)" align="center">
                    <img src="../assets/DropOff/05-Drop-Off-btn-number6.png" />
                  </td>
                </tr>
                <tr>
                  <td class="btn-number" @click="telephoneNo(7)" align="center">
                    <img src="../assets/DropOff/05-Drop-Off-btn-number7.png" />
                  </td>
                  <td class="btn-number" @click="telephoneNo(8)" align="center">
                    <img src="../assets/DropOff/05-Drop-Off-btn-number8.png" />
                  </td>
                  <td class="btn-number" @click="telephoneNo(9)" align="center">
                    <img src="../assets/DropOff/05-Drop-Off-btn-number9.png" />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td class="btn-number" @click="telephoneNo(0)" align="center">
                    <img src="../assets/DropOff/05-Drop-Off-btn-number0.png" />
                  </td>
                  <td class="btn-number" @click="deleteTelephoneNo()" align="center">
                    <img src="../assets/DropOff/05-Drop-Off-btn-numberX.png" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-7" align="center" style="padding-top:110px;">
            <b class="text-h2"  mask="##:##" style="color:red">{{ formModel.TelNo }}</b>
            <input
              aria-describedat
              class="text-h2"
              style="padding-left:150px; visibility: hidden;"
              v-model="formModel.TelNo"
              mask="### ### ####"
            >
            <div
              class="text-h2"
              style="padding-left:0px;padding-top:10px; height:100px; font-size:70px;"
            >{{ formModel.TelNo }}</div>
            <p style="padding-top:100px;">
              <img @click="ok()" src="../assets/DropOff/05-Drop-Off-btn1.png" />
            </p>
          </div>
        </div>
      </div>

      <v-dialog v-model="alert" align="center">
        <v-card style="max-width:500px; padding:30px;">
          <v-card-section>
            <!-- <div class="text-h6">แจ้งเตือน</div> -->
          </v-card-section>

          <v-card-section class="text-h5">
            เบอร์โทรนี้ได้ทำรายการไปแล้ว
            <br />กรุณาใช้เบอร์โทรศัพท์อื่น
          </v-card-section>

          <v-card-actions>
            <div>
              <v-btn
                class="text-h4"
                flat
                label="OK"
                color="primary"
                v-close-popup
                @click="closeAlert()"
              />
            </div>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
  background: url("../assets/DropOff/05-Drop-Off.png") no-repeat center center
    fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100%;
  width: 100%;
}
.header {
  font-size: 50px;
  text-align: center;
  color: white;
}

td {
  font-size: 50px;
}

.btn-number {
  width: 88px !important;
  height: 90px !important;
  background-repeat: no-repeat !important;
}
</style>

<!--<style lang="stylus" scoped>
.row + .row {
  margin-top: 1rem;
}
</style>-->

<script>
import feathersClient from "../plugins/feathers-client";

export default {
  name: "DropOffPhoneNumber",
  data: () => ({
    //--start config
    service: "locker",
    formModel: {
      Active: 1,
      TelNo: ""
    },
    alert: false
    //--end config
  }),
  async mounted() {
    //this.startInterval();
  },
  methods: {
    telephoneNo(no) {
      this.formModel.TelNo = this.formModel.TelNo + no;
    },
    deleteTelephoneNo() {
      if (
        this.formModel.TelNo.length == 4 ||
        this.formModel.TelNo.length == 8
      ) {
        this.formModel.TelNo = this.formModel.TelNo.substring(
          0,
          this.formModel.TelNo.length - 2
        );
      } else {
        this.formModel.TelNo = this.formModel.TelNo.substring(
          0,
          this.formModel.TelNo.length - 1
        );
      }
    },
    async ok() {
      try {
        if (this.formModel.TelNo.length >= 10) {
          feathersClient
            .service("wash-box-service")
            .patch("SetDropOff", { Telephone: this.formModel.TelNo })
            .then(result => {
              console.log(result[0].LockerNo);
              if (result[0].LockerNo != 0 && result[0].LockerNo != -1) {
                this.$router.push({
                  path: `/dropofflockernumber/${result[0].LockerNo}`
                });
              } else if (result[0].LockerNo == 0) {
                this.alert = true;
              } else if (result[0].LockerNo == -1) {
                this.$router.push({ path: `/lockernotavailable` });
              }
            });
        }
      } catch (err) {
        console.log(err);
      }
    },
    closeAlert() {
      this.$router.push({ path: `/` });
    },
    // startInterval() {
    //   this.stop = false;
    //   console.log(this.stop);
    //   var x = setInterval(() => {
    //     clearInterval(x);
    //     this.gotoMain();
    //   }, 15 * 1000);
    // },

    gotoMain() {
      this.$router.push({ path: `/` });
    }
  }
};
</script>
