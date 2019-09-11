<template>
  <q-page class="flex flex-center">
    <div class="flex flex-center">
      <img alt="Quasar logo" src="~assets/DropOff/06-Drop-Off.png" />
      <div class="q-pa-md body">
        <div class="row">
          <table>
            <tbody>
              <tr>
                <td align="center">{{ lockerNo }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="q-pa-md footer">
        <div class="row">
          <img @click="ok()" src="~assets/DropOff/06-Drop-Off-btn1.png" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
.body {
  position: absolute;
  padding-top: 0px;
  font-size: 60px;
}
.footer {
  position: absolute;
  padding-top: 380px;
  font-size: 60px;
}
</style>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "DropOffPhoneNumber",
  data: () => ({
    //--start config
    lockerNo:""
    //--end config
  }),
  props: ["LockerNo"],
  async mounted() {
    this.lockerNo = this.LockerNo;
  },
  methods: {
    ok() {
      this.$router.push({ path: `/dropoffcomplete/${this.LockerNo}`});
    }
  }
};
</script>
