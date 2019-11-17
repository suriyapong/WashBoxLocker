<template>
  <q-page padding>
    <div class="absolute-center text-left">
      <div class="floating-label">
        <v-card class="mx-auto my-12 text-xs-center" max-width="600">
          <v-card-title primary-title class="justify-left" color="text-primary">Login</v-card-title>
          <v-card-text>
            <v-row align="center" justify="center">
              <v-img src="..\assets\img\logo-washbox.png" max-width="250" />
            </v-row>
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field label="username" value hint outlined v-model="username"></v-text-field>
              </v-col>

              <v-col cols="12" sm="12">
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Normal with hint text"
                  hint="At least 8 characters"
                  outlined
                  @click:append="show1 = !show1"
                  @keydown.enter.prevent="onLoginClick()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-btn @click="onLoginClick">Login</v-btn>
          </v-card-actions>
        </v-card>
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
      username: "",
      password: "",
      submitted: false,
      loading: false,

      show1: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 4 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  created() {
    ShowBgImage("/img/login_bg.jpg");
  },
  methods: {
    async onLoginClick() {
      // this.loading = true;
      // try {
      //   var res = await this.$store.dispatch("auth/authenticate", {
      //     strategy: "local",
      //     UserName: this.username,
      //     Password: this.password
      //   });
      //   alert(res);
      //   this.$router.push("/locker");
      // } catch (error) {
      //   alert('login ไม่สำเร็จ ['  + error.message +']');
      // } finally {
      //   this.loading = false;
      // }
      if (this.username == "admin" && this.password == "1234") {
        this.$router.push("/locker");
      }
    }
  },
  destroyed() {
    NotShowBgImage();
  }
};
</script>

<style>
@media screen and (min-width: 768px) {
  .absolute-center {
    min-width: 45% !important;
  }
}
@media screen and (max-width: 768px) {
  .absolute-center {
    min-width: 90% !important;
  }
}
</style>
