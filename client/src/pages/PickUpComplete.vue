<template>
  <q-page class="flex flex-center">
    <div class="flex flex-center">
      <img alt="Quasar logo" src="~assets/Pickup/04-Pick-Up.png" />
      <div class="q-pa-md body">
        <div class="row">
          <b class="text-h5 content">
            รับผ้าของคุณได้ที่ล็อคเกอร์<br/>
            หมายเลข {{ lockerNo }}<br/>
            Get your items at the lockers Number {{ lockerNo }}
          </b>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.body {
  position: absolute;
  padding-top: 400px;
  font-size: 60px;
}
.content {
  text-align: center;
  font-size: 32px;
  color: aliceblue;
}
</style>

<script>
export default {
  name: "DropOffPhoneNumber",
  data: () => ({
    //--start config
    lockerNo: ""
    //--end config
  }),
    props: ["LockerNo"],
  async mounted() {
    this.lockerNo = this.LockerNo;
    this.startInterval();
  },
  methods: {
    startInterval: function() {
      var handle = setInterval(() => {
        this.$router.push({ path: `/` });

        // When you want to cancel it:
        clearInterval(handle);
        handle = 0; // I just do this so I know I've cleared the interval
      }, 10*1000);
    }
  }
};
</script>
