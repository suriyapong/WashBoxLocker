<template>
  <q-page class="bgimg">
    <div class="flex flex-center" style="padding-top:20px;">
      <div class="q-pa-md">
        <p class="header">PLEASE ENTER PHONE NUMBER</p>
        <p class="header">กรุณาใส่เบอร์โทรศัพท์ของคุณ</p>
        <div class="row" style="width:1200px; padding-top:20px">
          <div class="col-5" style="padding-top:55px; padding-left:85px;">
            <table>
              <tbody>
                <tr>
                  <td
                    class="btn-number"
                    @click="telephoneNo(1)"
                    align="center"
                  ><img src="assets/DropOff/05-Drop-Off-btn-number.png"></td>
                  <td
                    class="btn-number"
                    @click="telephoneNo(2)"
                    align="center"
                  ><img src="assets/DropOff/05-Drop-Off-btn-number.png"></td>
                  <td
                    class="btn-number"
                    @click="telephoneNo(3)"
                    align="center"
                  ><img src="assets/DropOff/05-Drop-Off-btn-number.png"></td>
                </tr>
                <tr>
                  <td
                    class="btn-number"
                    @click="telephoneNo(4)"
                    align="center"
                    background="assets/DropOff/05-Drop-Off-btn-number.png"
                  >4</td>
                  <td
                    class="btn-number"
                    @click="telephoneNo(5)"
                    align="center"
                    background="assets/DropOff/05-Drop-Off-btn-number.png"
                  >5</td>
                  <td
                    class="btn-number"
                    @click="telephoneNo(6)"
                    align="center"
                    background="assets/DropOff/05-Drop-Off-btn-number.png"
                  >6</td>
                </tr>
                <tr>
                  <td
                    class="btn-number"
                    @click="telephoneNo(7)"
                    align="center"
                    background="assets/DropOff/05-Drop-Off-btn-number.png"
                  >7</td>
                  <td
                    class="btn-number"
                    @click="telephoneNo(8)"
                    align="center"
                    background="assets/DropOff/05-Drop-Off-btn-number.png"
                  >8</td>
                  <td
                    class="btn-number"
                    @click="telephoneNo(9)"
                    align="center"
                    background="assets/DropOff/05-Drop-Off-btn-number.png"
                  >9</td>
                </tr>
                <tr>
                  <td align="center"></td>
                  <td
                    class="btn-number"
                    @click="telephoneNo(0)"
                    align="center"
                    background="assets/DropOff/05-Drop-Off-btn-number.png"
                  >0</td>
                  <td
                    class="btn-number"
                    @click="deleteTelephoneNo()"
                    align="center"
                    background="assets/DropOff/05-Drop-Off-btn-number.png"
                  >X</td>
                  <td align="center"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-7" align="center" style="padding-top:135px;">
            <!-- <b class="text-h2" style="color:red">{{ formModel.TelNo }}</b> -->
            <q-input
              class="text-h2"
              style="padding-left:150px;"
              v-model="formModel.TelNo"
              mask="### ### ####"
            />
            <p style="padding-top:60px;">
              <img @click="ok()" src="~assets/DropOff/05-Drop-Off-btn1.png" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
.bgimg {
  background: url("/assets/DropOff/05-Drop-Off.png") no-repeat center center
    fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.header {
  font-size: 50px;
  text-align: center;
  color: white;
}
.body {
  position: absolute;
  padding-top: 140px;
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

<style lang="stylus" scoped>
.row > div {
  background: rgba(86, 61, 124, 0.15);
  border: 1px solid rgba(86, 61, 124, 0.2);
}

.row + .row {
  margin-top: 1rem;
}
</style>

<script>
import { mapState } from "vuex";

export default {
  name: "DropOffPhoneNumber",
  data: () => ({
    //--start config
    service: "locker",
    formModel: {
      Active: 1,
      TelNo: ""
    }
    //--end config
  }),
  async mounted() {},
  methods: {
    telephoneNo(no) {
      this.formModel.TelNo = this.formModel.TelNo + no;
    },
    deleteTelephoneNo() {
      //alert(this.formModel.TelNo.length);
      this.formModel.TelNo = this.formModel.TelNo.substring(0, this.formModel.TelNo.length-1);
    },
    async ok() {
      try {
        if (this.formModel.TelNo.length >= 10) {
          const q = {};
          q.Telephone = this.formModel.TelNo;
          await this.$store
            .dispatch("drop-off/find", { query: q })
            .then(result => {
              console.log(JSON.stringify(result));
              if (result[0].LockerNo != 0) {
                this.$router.push({
                  path: `/dropofflockernumber/${result[0].LockerNo}`
                });
              } else {
                this.$router.push({ path: `/lockernotavailable` });
              }
            });
        }
      } catch (err) {
        console.log(err);
      } finally {
      }
    }
  }
};
</script>
