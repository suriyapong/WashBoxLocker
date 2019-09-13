<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div class="q-pa-md" style="max-width: 100%">
          <div class="q-gutter-md">
            <q-select
              outlined
              v-model="status"
              :options="objStatus"
              @input="renderUI()"
              label="เลือกสถานะ"
            />
          </div>
        </div>
        <div class="q-pa-md q-gutter-md">
          <!-- <q-item-label header>{{ new Date() | date }}</q-item-label> -->
          <div v-for="l in listLocker" :key="l.LockerID">
            <div @click="openLocker(l.LockerID, l.Type)">
              <q-item>
                <q-item-section avatar top>
                  <q-avatar>{{ l.LockerID }}</q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">
                    {{ convertTypeToString(l.Type) }}
                    <span v-if="l.TelNo != null">[{{ l.TelNo }}]</span>
                  </q-item-label>
                  <q-item-label caption>{{ l.StartTime | date }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                  <q-icon name="lock" v-if="l.Type == '' || l.Type == null" color="green" />
                  <q-icon name="lock" v-if="l.Type == 'dropoff'" color="red" />
                  <q-icon name="lock" v-if="l.Type == 'pickup'" color="yellow" />
                </q-item-section>
              </q-item>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
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
        this.$router.push({ path: `/staff/clearlockerdropoff/${lockerID}` });
      }

      if (type == null) {
        this.$router.push({ path: `/staff/setpickup/${lockerID}` });
      }
    }
  }
};
</script>