<template>
  <v-card class="my-card">
    <div class="row" style="padding-top:50px;">
      <div class="col-12 col-md-12" align="center" style="font-size:150px;">{{ lockerID }}</div>
      <div class="col-12 col-md-12" align="center" style="font-size:150px; padding-top:50px;">
        <div
          class="col-12 col-md-12"
          align="center"
          style="font-size:25px;"
        >{{ convertTypeToString(lockerDetail.Type) }} {{ lockerDetail.StartTime | date }}</div>
        <div class="col-12 col-md-12" align="center" style="font-size:25px;">
          <v-icon name="lock" color="red">mdi-phone</v-icon>
          {{ lockerDetail.TelNo }}
        </div>

        <v-btn color="green" class="ma-2 white--text" @click="clearDropOff()" style="color: green; font-size:20px;">
          เปิดล็อคเกอร์แล้วคืนเป็นว่าง
          <v-icon right dark>mdi-lock</v-icon>
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/th";
import feathersClient from "../plugins/feathers-client";
import ListCompLocker from "../components/ListCompLocker";

export default {
  data: () => ({
    //--start config
    lockerID: "",
    lockerDetail: {}
    //--end config
  }),
  async mounted() {
    this.lockerID = this.LockerID;
    this.remderUI();
  },
  props: ["LockerID"],
  components: {
    ListCompLocker
  },
  filters: {
    date: createDateFilter("DD/MM/YYYY HH:mm", { locale })
  },
  methods: {
    async remderUI() {
      const q = {};
      q.lockerID = this.lockerID;

      feathersClient
        .service("locker")
        .find({ query: q })
        .then(result => {
          this.lockerDetail = result.data[0];
        });
    },
    convertTypeToString(type) {
      let typeName = "";
      if (type == "" || type == null) {
        typeName = "ว่าง";
      }

      if (type == "dropoff") {
        typeName = "ฝากซัก";
      }

      if (type == "pickup") {
        typeName = "คืนลูกค้า";
      }

      return typeName;
    },
    clearDropOff() {
      feathersClient
        .service("wash-box-service")
        .patch("ClearDropOff", { LockerID: this.lockerID })
        .then(result => {
          console.log(result[0].Status);
          // if (result[0].Status) {
          //   feathersClient
          //     .service("wash-box-service")
          //     .patch("OpenLocker", { LockerID: this.lockerID })
          //     .then(no => {
          //       if (no != 0) {
                  this.$router.push({
                    path: `/clearlockerdropoffcomplete/${this.lockerID}`
                  });
          //       }
          //     });
          // } else {
          //   this.$router.push({ path: `/locker` });
          // }
        });
    }
  }
};
</script>