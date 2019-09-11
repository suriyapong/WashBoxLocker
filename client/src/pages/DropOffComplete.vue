<template>
  <q-page class="bgimg-dropoff-5">
    <div class="flex flex-center">
      <div class="q-pa-md body">
        <div class="row" style="padding-top:900px;">
          <b class="text-h5 content">
            กรุณานำผ้าไปใส่ในช่อง {{ lockerNo }} แล้วกรอกจำนวนผ้าในใบงาน
            <br />ที่อยู่ในช่องล๊อคเกอร์
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

.bgimg-dropoff-5 {
  background: url("/assets/DropOff/07-Drop-Off.png") no-repeat center center
    fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
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
      }, 10000);
    }
  }
};
</script>
