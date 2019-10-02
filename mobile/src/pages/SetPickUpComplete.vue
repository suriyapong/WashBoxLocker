<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-md-4" align="center" style="font-size:150px;">{{ lockerID }}</div>
        </div>
        <div
          class="col-12 col-md-4"
          align="center"
          style="padding-top:30px; color:green; font-size:20px;"
        >
          ล็อคเกอร์ได้ถูกเปิดเพื่อคืนผ้าแล้ว
          <br />
          รหัสงาน {{ locker.JobCode }}
          <br />
          รหัสรับผ้า {{ locker.OTP }}
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
    locker:{},
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
      }, 3 * 1000);
    }
  }
};
</script>