<template>
  <v-card class="my-card">
    <div class="row action" style="padding-top:50px;">
      <div class="col-12 col-md-12" align="center" style="font-size:150px;">{{ lockerID }}</div>
      <div class="col-12 col-md-12" align="center" style="font-size:25px; padding-top:50px;">
      ล็อคเกอร์ได้ถูกเปิดและคืนเป็นว่างแล้ว</div>
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
    this.startInterval();
  },
  props: ["LockerID"],
  components: {
    ListCompLocker
  },
  filters: {
    date: createDateFilter("DD/MM/YYYY HH:mm", { locale })
  },
  methods: {
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