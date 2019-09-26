
<style>
.spacetop {
  margin-top: 80px;
}
</style>

<template>
  <v-app>
    <div class="spacetop">
      <v-card width="400" class="mx-auto mt-5">
        <v-card-title class="pb-0">
          <h2>Login</h2>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Username"
              prepend-icon="mdi-account-circle"
              v-model="username"
              type="text"
              @keyup.enter="onLoginClick"
            />
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              v-model="password"
              name="password"
              id="password"
              @keyup.enter="onLoginClick"
            />
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="success">Register</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="onLoginClick()" color="info">Login</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import feathersClient from "../plugins/feathers-client";
export default {
  name: "App",
  data() {
    return {
      showPassword: false,
      username: "",
      password: "",
      submitted: false,
      loading: false,
      data: "",
       data2: ""
    };
  },
  methods: {
    async onLoginClick() {
      // const valid = await this.$validator.validateAll();
      // if (!valid) {
      //   alert("กรุณากรอกข้อมูลให้สมบรูณ์");
      //   return;
      // }

      this.loading = true;
      try {
          const response  = await feathersClient.authenticate({
            strategy: "local",
            UserName: this.username,
            Password: this.password
          })
          

        //  const { user } = await feathersClient.get('authentication');    
        //  this.data2 = user
        //  console.log(user)
        //console.log(response)
        // const accessToken = await feathersClient.authentication.getAccessToken()
        //  console.log(accessToken)
         this.$router.push("/home");
      } catch (error) {
        alert("login ไม่สำเร็จ [" + error.message + "]");
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

