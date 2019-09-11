<template>
  <q-page class="flex flex-center">
    <div class="flex flex-center">
      <img alt="Quasar logo" src="~assets/DropOff/07-Drop-Off.png" />
      <div class="q-pa-md body">
        <div class="row">
          <b class="text-h5 content">
            กรุณานำผ้าไปใส่ในช่อง {{ lockerNo }} แล้วกรอกจำนวนผ้าในใบงาน
            <br />ที่อยู่ในช่องล๊อคเกอร์
            <br />Please fill in your contact detail and amount of items
            <br />on the order form in the lockers
          </b>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
.body {
  position: absolute;
  padding-top: 300px;
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
  name: "DropOffComplete",
  data: () => ({
    //--start config
    lockerNo:""
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
      }, 5000);
    }
  }
};
</script>
