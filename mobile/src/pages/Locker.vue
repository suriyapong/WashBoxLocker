<template>
  <q-page padding>
    <q-card class="my-card">
      <q-card-section>
        <div class="q-pa-md q-gutter-md">
          <q-item-label header>{{ new Date() | date }}</q-item-label>
          <div v-for="l in listLocker" :key="l.LockerID">
            <ListCompLocker :BoxNo="l.BoxNo" :Type="l.Type" :StartTime="l.StartTime"></ListCompLocker>
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
    listLocker: {}

    //--end config
  }),
  async mounted() {
    this.remderUI();
  },
  components: {
    ListCompLocker
  },
  filters: {
    date: createDateFilter("DD/MM/YYYY HH:mm", { locale })
  },
  methods: {
    async remderUI() {
      const q = {};
      let result = await this.$store.dispatch("locker/find", {
        query: q
      });
      console.log(JSON.stringify(result.total));
      this.listLocker = result.data;
      console.log(JSON.stringify(this.listLocker));
    }
  }
};
</script>