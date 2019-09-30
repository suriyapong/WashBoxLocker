<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-md-12" align="center" style="font-size:150px;">{{ lockerID }}</div>
          <div class="col-12 col-md-12" align="center" style="font-size:150px;">
            <q-input class="text-h3" v-model="jobCode" style="width:80%" />
          </div>
        </div>
        <div class="col-12 col-md-12" align="center" style="padding-top:30px;">
          <q-btn
            icon="lock"
            flat
            style="color: red; font-size:20px;"
            label="คืนผ้าลูกค้าที่ช่องนี้"
            @click="setPickUp()"
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