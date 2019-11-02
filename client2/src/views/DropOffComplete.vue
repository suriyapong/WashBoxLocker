<template>
  <div class="bgimg-dropoff-5">
    <div class="flex flex-center">
      <div class="q-pa-md body">
        <div class="row" align="center" style="padding-top:100px;">
          <b class="text-h5 content">
            กรุณานำผ้าไปใส่ในช่อง {{ lockerNo }} แล้วกรอกจำนวนผ้าในใบงาน
            <br />ที่อยู่ในช่องล๊อคเกอร์
            <br />Please fill in your contact detail and amount of items
            <br />on the order form in the lockers
          </b>
        </div>
      </div>
    </div>
  </div>
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

.bgimg-dropoff-5 {
  background: url("../assets/DropOff/07-Drop-Off.png") no-repeat center center
    fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100%;
  width: 100%;
}
</style>

<script>
export default {
  name: "DropOffComplete",
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
      }, 10 * 1000);
    }
  }
};
</script>
