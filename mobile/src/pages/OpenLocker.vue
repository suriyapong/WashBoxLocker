<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div
          class="col-12 col-md-12"
          align="center"
          style="padding-top:30px;"
        ><h4>กรอกเลขล็อคเกอร์ที่ต้องการเปิด</h4></div>
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-md-12" align="center" style="font-size:150px;">
            <q-input class="text-h3" v-model="lockerID" style="width:80%" />
          </div>
        </div>
        <div class="col-12 col-md-12" align="center" style="padding-top:30px;">
          <q-btn
            icon="lock"
            flat
            style="color: red; font-size:20px;"
            label="กดเพื่อเปิดล็อคเกอร์"
            @click="openLocker()"
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
    lockerID: ""
    //--end config
  }),
  async mounted() {},
  components: {
    ListCompLocker
  },
  filters: {
    date: createDateFilter("DD/MM/YYYY HH:mm", { locale })
  },
  methods: {
    openLocker() {
      if (this.lockerID != "") {
        // alert(this.lockerID);
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
      }
    }
  }
};
</script>