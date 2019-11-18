<template>
  <v-card class="my-card">
    <div class="row action" style="padding-top:50px;">
      <div class="col-12 col-md-12" align="center" style="font-size:150px;">{{ lockerID }}</div>
      <div class="col-12 col-md-12" align="center" style="font-size:25px; padding-top:50px;">
        ล็อคเกอร์ได้ถูกเปิดเพื่อคืนผ้าแล้ว
        <br />
        รหัสงาน {{ locker.JobCode }}
        <br />
        รหัสรับผ้า {{ locker.OTP }}
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
    locker: {}
    //--end config
  }),
  props: ["LockerID"],
  components: {
    ListCompLocker
  },
  async mounted() {
    this.lockerID = this.LockerID;
    this.renderUI();
    this.startInterval();
  },
  filters: {
    date: createDateFilter("DD/MM/YYYY HH:mm", { locale })
  },
  methods: {
    async renderUI() {
      const q = {};
      q.LockerID = this.lockerID;
      let result = await this.$store.dispatch("locker/find", {
        query: q
      });
      this.locker = result.data[0];
    },
    startInterval: function() {
      var handle = setInterval(() => {
        this.$router.push({ path: `/locker` });

        // When you want to cancel it:
        clearInterval(handle);
        handle = 0; // I just do this so I know I've cleared the interval
      }, 5 * 1000);
    }
  }
};
</script>