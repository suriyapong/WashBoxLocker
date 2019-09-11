<template>
  <q-page>
    <div class="flex flex-center">
      <img alt="Quasar logo" src="~assets/PickUp/03-Pick-Up.png" />
      <div class="q-pa-md body">
        <div class="row">
          <table align="center">
            <tbody>
              <tr>
                <td align="center">
                  <img @click="choose(1)" alt="Quasar logo" src="~assets/PickUp/03-Pick-Up-btn1.png" />
                </td>
                <td align="center">
                 <img @click="choose(2)" alt="Quasar logo" src="~assets/PickUp/03-Pick-Up-btn2.png" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
.body {
  position: absolute;
  padding-top: 120px;
}

td {
  width: 250px;
  font-size: 25px;
}
</style>

<script>
export default {
  name: "DropOffConfirm",
  data: () => ({
    //--start config

    //--end config
  }),
  async mounted() {},
  methods: {
    choose(choice) {
      if (choice == 1) {
        this.$router.push({ path: `/pickupcode` });
      } else {
        this.$router.push({ path: `/` });
      }
    }
  }
};
</script>
