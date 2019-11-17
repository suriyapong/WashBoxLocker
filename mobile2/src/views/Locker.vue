<template>
  <div padding>
    <v-card class="my-card">
      
        
    </v-card>
  </div>
</template>

<script>
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/th";

import ListCompLocker from "../components/ListCompLocker";

export default {
  data: () => ({
    //--start config
    listLocker: {},
    typeName: "",
    status: "ทั้งหมด",
    objStatus: ["ทั้งหมด", "ว่าง", "ฝากซัก", "คืนผ้า"]
    //--end config
  }),
  async mounted() {
    this.renderUI();
  },
  props: ["Type"],
  components: {
    ListCompLocker
  },
  filters: {
    date: createDateFilter("DD/MM/YYYY HH:mm", { locale })
  },
  methods: {
    async renderUI() {
      const q = {};
      if (this.Type != undefined) {
        this.status = this.convertTypeToString(this.Filter);
      }
      if (this.status == "ว่าง") {
        q.Active = 0;
      } else if (this.status == "ฝากซัก") {
        q.Active = 1;
        q.Type = "dropoff";
      } else if (this.status == "คืนผ้า") {
        q.Active = 1;
        q.Type = "pickup";
      }

      let result = await this.$store.dispatch("locker/find", {
        query: q
      });
      console.log(JSON.stringify(result.total));
      this.listLocker = result.data;
      //console.log(JSON.stringify(this.listLocker));
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
    openLocker(lockerID, type) {
      console.log("OPEN LOCKER ID" + lockerID + " TYPE : " + type);

      if (type == "dropoff") {
        this.$router.push({ path: `/clearlockerdropoff/${lockerID}` });
      }

      if (type == null || type == "") {
        this.$router.push({ path: `/setpickup/${lockerID}` });
      }
    }
  }
};
</script>