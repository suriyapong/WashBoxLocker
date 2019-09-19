<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-md-12" align="center" style="font-size:150px;">{{ lockerID }}</div>
          <div
            class="col-12 col-md-12"
            align="center"
            style="font-size:25px;"
          >{{ convertTypeToString(lockerDetail.Type) }} {{ lockerDetail.StartTime | date }}</div>
          <div class="col-12 col-md-12" align="center" style="font-size:25px;">
            <q-icon name="call"></q-icon>
            {{ lockerDetail.TelNo }}
          </div>
        </div>
        <div class="col-12 col-md-12" align="center" style="padding-top:30px;">
          <q-btn
            icon="lock"
            flat
            style="color: green; font-size:20px;"
            label="เปิดล็อคเกอร์แล้วคืนเป็นว่าง"
            @click="clearDropOff()"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-page>
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
      this.lockerDetail = await this.$store.dispatch(
        "locker/get",
        this.lockerID
      );
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
    clearDropOff(){
            feathersClient
        .service("wash-box-service")
        .patch("ClearDropOff", { LockerID : this.lockerID})
        .then(result => {
          console.log(result[0].Status);
          if (result[0].Status) {
            this.$router.push({ path: `/staff/clearlockerdropoffcomplete/${this.lockerID}` });
          } else {
            this.$router.push({ path: `/locker` });
          }
        });
    }
  }
};
</script>