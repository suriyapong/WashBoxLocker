<template>
  <div padding>
    <v-card class="my-card">
      <div class="row action" style="padding-top:50px;">
        <div
          class="col-12 col-md-12"
          align="center"
          style="font-size:25px;"
        >กรอกเลขล็อคเกอร์ที่ต้องการเปิด</div>

        <div class="col-12 col-md-12" align="center" style="font-size:150px; padding-top:30px;">
          <v-text-field label value outlined v-model="lockerID" style="width:20%; font-size:40px;"></v-text-field>
          <v-btn color="error" class="ma-2 white--text" @click="openLocker()">
            กดเพื่อเปิดล็อคเกอร์
            <v-icon right dark>mdi-lock</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card>
  </div>
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
        try {
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
        } catch (error) {
          alert("");
          this.$router.push({
            path: `/locker`
          });
        }
      }
    }
  }
};
</script>