<template>
  <div class="bgimg-pickup-4">
    <div class="flex flex-center body">
      <div class="q-pa-md">
        <div class="row action" style="padding-top:0px;">
          <b class="text-h5 content">
            รับผ้าของคุณได้ที่ล็อคเกอร์
            <br />
            หมายเลข {{ lockerNo }}
            <br />
            Get your items at the lockers Number {{ lockerNo }}
          </b>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.action {
  display: flex;
  align-items: center;
  justify-content: center;
}

.body {
  padding-top: 500px;
  font-size: 60px;
}
.content {
  text-align: center;
  font-size: 32px;
  color: aliceblue;
}

.bgimg-pickup-4 {
  background: url("../assets/PickUp/04-Pick-Up.png") no-repeat center center
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
      }, 10 * 1000);
    }
  }
};
</script>
