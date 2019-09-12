<template>
  <q-page padding>
    <div class="absolute-center text-left">
      <div class="floating-label" >
        <q-card class="shadow-8">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Login</div>
          </q-card-section>
          <div class="q-pa-md q-gutter-sm" style="text-align:center">
            <q-avatar rounded size="150px">
              <img src="\assets\img\logo-washbox.png" />
            </q-avatar>
            <q-input
              standout="bg-grey-3 text-black"
              v-model="username"
              label="User"
              filled 
              :dense="dense"
            />

            <q-input
              standout="bg-grey-3 text-black"
              label="Password"
              filled 
              :dense="dense"
              v-model="password"
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
          <q-card-actions align="right">
            <q-btn flat class="bg-primary text-white" @click="onLoginClick">Login</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ShowBgImage, NotShowBgImage } from "../utils/bgHelper";
export default {
  // name: 'PageName',
  data() {
    return {
      isPwd: true,
      dense: false,
      username: "",
      password: "",
      submitted: false,
      loading: false
    };
  },
  created() {
    ShowBgImage("/img/login_bg.jpg");
  },
  methods: {
    async onLoginClick() {
      this.loading = true;
      try {
        var res = await this.$store.dispatch("auth/authenticate", {
          strategy: "local",
          UserName: this.username,
          Password: this.password
        });
        this.$router.push("/home");
      } catch (error) {
        alert('login ไม่สำเร็จ ['  + error.message +']');
      } finally {
        this.loading = false;
      }
    }
  },
  destroyed() {
    NotShowBgImage();
  }
};
</script>

<style>
@media screen and (min-width:768px) {
  .absolute-center{
    min-width:45% !important
  }
}
@media screen and (max-width:768px) {
  .absolute-center{
    min-width:90% !important
  }
}
</style>
