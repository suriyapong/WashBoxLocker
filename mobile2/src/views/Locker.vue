<template>
  <div padding>
    <v-card>
      <div style="max-width: 100%">
        <v-col class="d-flex" cols="12" sm="12">
          <v-select
            v-model="status"
            :items="objStatus"
            label="เลือกสถานะ"
            dense
            outlined
            @input="renderUI()"
          ></v-select>
        </v-col>
      </div>
    </v-card>

    <v-card class="my-card">
      <div v-for="l in listLocker" :key="l.LockerID">
        <div @click="openLocker(l.LockerID, l.Type)">
          <v-card max-width="auto" class="mx-auto">
            <v-list three-line>
              <template>
                <v-list-item>
                  <v-list-item-avatar>{{ l.BoxNo }}</v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ convertTypeToString(l.Type) }}
                      <span v-if="l.Active == 1">{{ l.TelNo }}</span>
                      <span style="padding-left:5px;" v-if="l.Type != null">{{ l.JobCode }}</span>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ l.StartTime | date }}
                      <span
                        v-if="l.Type == 'pickup'"
                        style="padding-left:5px; color:red"
                      >{{ l.OTP }}</span>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-icon name="lock" v-if="l.Type == '' || l.Type == null" color="green">mdi-lock</v-icon>
                    <v-icon name="lock" v-if="l.Type == 'dropoff'" color="red">mdi-lock</v-icon>
                    <v-icon name="lock" v-if="l.Type == 'pickup'" color="yellow">mdi-lock</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import feathersClient from "../plugins/feathers-client";

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

      feathersClient
        .service("locker")
        .find({ query: q })
        .then(result => {
          this.listLocker = {};
          this.listLocker = result.data;
          console.log(JSON.stringify(this.listLocker));
        });

      // let result = await this.$store.dispatch("locker/find", {
      //   query: q
      // });
      // alert(JSON.stringify(result));
      // this.listLocker = result.data;
      // console.log(JSON.stringify(this.listLocker));
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