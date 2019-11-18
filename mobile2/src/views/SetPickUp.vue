<template>
  <v-card class="my-card">
    <div class="row action" style="padding-top:50px;">
      <div class="col-12 col-md-12" align="center" style="font-size:150px;">{{ lockerID }}</div>
      <div class="col-12 col-md-12" align="center" style="font-size:150px; padding-top:50px;">
        <v-text-field label value hint outlined v-moel="jobCode" style="width:20%; font-size:40px;"></v-text-field>
        <v-btn color="error" class="ma-2 white--text" @click="setPickUp()">
          คืนผ้าลูกค้าที่ช่องนี้
          <v-icon right dark>mdi-lock</v-icon>
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.action {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script>
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/th";
import feathersClient from "../plugins/feathers-client";
import ListCompLocker from "../components/ListCompLocker";

export default {
  data: () => ({
    //--start config
    lockerID: "",
    lockerDetail: {},
    jobCode: ""
    //--end config
  }),
  async mounted() {
    this.lockerID = this.LockerID;
  },
  props: ["LockerID"],
  components: {
    ListCompLocker
  },
  filters: {
    date: createDateFilter("DD/MM/YYYY HH:mm", { locale })
  },
  methods: {
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
    setPickUp() {
      if (this.jobCode != "") {
        feathersClient
          .service("wash-box-service")
          .patch("SetPickUp", {
            LockerID: this.lockerID,
            JobCode: this.jobCode
          })
          .then(result => {
            console.log(result[0].Status);
            if (result[0].Status) {
              feathersClient
                .service("wash-box-service")
                .patch("OpenLocker", { LockerID: this.lockerID })
                .then(no => {
                  if (no != 0) {
                    this.$router.push({
                      path: `/setpickupcomplete/${this.lockerID}`
                    });
                  }
                });
            } else {
              this.$router.push({ path: `/locker` });
            }
          });
      }
    }
  }
};
</script>