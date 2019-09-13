
<template>
  <q-item clickable v-ripple @click="openLocker()">
    <q-item-section avatar top>
      <q-avatar>{{ BoxNo }}</q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ typeName }}</q-item-label>
      <q-item-label caption>{{ StartTime | date }}</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-icon name="lock" v-if="Type == '' || Type == null" color="green" />
      <q-icon name="lock" v-if="Type == 'dropoff'" color="red" />
      <q-icon name="lock" v-if="Type == 'pickup'" color="yellow" />
    </q-item-section>

    <q-dialog v-model="dialog" persistent>
      <q-card class="row q-col-gutter-lg">
        <span class="text-h6">ยืนยันการเปิดล็อคเกอร์</span>
        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="col-12 col-md-4">ยืนยันการเปิดล็อคเกอร์เบอร์ {{ BoxNo }}</div>
          </div>
        </q-card-section>
        <div align="right" class="text-primary">
          <q-btn class="right" flat label="Cancel" q-close-popup @click="cancelClick" />
          <q-btn class="right" flat label="Confirm" @click="confirmClick" v-close-popup />
        </div>
      </q-card>
    </q-dialog>
  </q-item>
</template>


<script>
import { mapMutations, mapState } from "vuex";
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/th";

export default {
  data: () => ({
    typeName: "",
    dialog: false
    //--start config
    //--end config
  }),
  //props: ["mode", "Id"],
  props: ["BoxNo", "Type", "StartTime"],
  computed: {},
  async mounted() {
    this.renderUI();
  },
  filters: {
    date: createDateFilter("DD/MM/YYYY HH:mm", { locale })
  },
  methods: {
    convertType(type) {
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

    renderUI() {
      this.typeName = this.convertType(this.Type);
    },

    async renderUIAfterClear() {
      const q = {};
      q.BoxNo = this.BoxNo;
      let result = await this.$store.dispatch("locker/find", {
        query: q
      });
      let locker = result.data;
      alert(JSON.stringify(locker));
      this.typeName = this.convertType(locker[0].Type);
      this.StartTime = locker[0].StartTime;
    },

    openLocker() {
      this.dialog = true;
    },

    cancelClick() {
      this.dialog = false;
    },

    async confirmClick() {
      try {
        const q = {};
        q.cmd = "ClearDropOff";
        q.LockerNo = this.BoxNo;

        let result = await this.$store.dispatch("custom-service/find", {
          query: q
        });
      } catch (err) {
        console.log(err);
        this.$toast.error("ไม่สามารถเพิ่มข้อมูลได้" + err);
      } finally {
        this.loading = false;
        this.renderUIAfterClear();
      }
    }
  }
};
</script> 
