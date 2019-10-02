<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-md-4" align="center" style="font-size:150px;">{{ lockerID }}</div>
        </div>
        <div class="col-12 col-md-4" align="center" style="padding-top:30px; color:green; font-size:20px;">
          ล็อคเกอร์ได้ถูกเปิดและคืนเป็นว่างแล้ว
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
        this.$router.push({ path: `/staff/locker` });

        // When you want to cancel it:
        clearInterval(handle);
        handle = 0; // I just do this so I know I've cleared the interval
      }, 3*1000);
    }
  }
};
</script>