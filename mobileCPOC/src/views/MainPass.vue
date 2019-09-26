<template>
  <div>
    <v-toolbar v-show="$route.name != 'Login'" color="deep-purple" dark>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <span text-align="center">Prodigyfly</span>
      </v-toolbar-title>

      <div class="flex-grow-1"></div>

      <v-btn icon @click="Logout()">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid>
      <v-card>
        <v-list-item class="mt-5 ml-3">
          <v-list-item-content>
            <v-list-item-title align="left">
              <v-list-item-avatar size="70">
                <v-img :src="User.ImageUrl"></v-img>
              </v-list-item-avatar>
              {{User.FullName}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <div class="mt-5">
        <span class="mt-5 ml-3" align="left">Manu</span>
      </div>
      <v-row>
        <v-col cols="6">
          <v-card align="center" @click="Plan(User.Id)">
            <v-icon class="mt-4" size="50px">mdi-airplane-takeoff</v-icon>
            <v-card-text>Plan</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card align="center" @click="History(User.Id)">
            <v-icon class="mt-4" size="50px">mdi-history</v-icon>
            <v-card-text>History</v-card-text>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card align="center" @click="MyProfile(User.Id)">
            <v-icon class="mt-4" size="50px">mdi-account</v-icon>
            <v-card-text>MyProfile</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/th";
import feathersClient from "../plugins/feathers-client";

export default {
  data: () => ({
    User: "",
    dialog: false,
    loading: false
  }),
  props: ["Id"],
  components: {
    // ResetPassword
  },
  filters: {
    date: createDateFilter("DD/MM/YYYY", { locale }),
    dateC: createDateFilter("HH:mm", { locale }),
    fulldatetime: createDateFilter("DD/MM/YYYY HH:mm:ss", { locale })
  },
  async mounted() {
    this.renderUI();
  },
  methods: {
    async renderUI() {
      try {
        const { user } = await feathersClient.get("authentication");
        let inDTO = await feathersClient
          .service("user")
          .find({ query: { Id: user.Id } });
        this.User = inDTO.data[0];
      } catch (err) {
        //console.log(err);
        alert("ไม่สามารถต่อ server ได้");
      }

      //let a = await feathersClient.service("historyservice").patch("ByPassenger", {UserId:"88"})
    },
    Logout() {
      feathersClient.logout();
      this.$router.push("/login");
    },
    MyProfile() {
      this.$router.push({ path: "/myprofile" });
    },
    History() {
      this.$router.push({ path: "/history" });
    },
    Plan() {
      this.$router.push({ path: "/plan" });
    }
    // uploadDone(uploadInfo) {
    //   this.formModel.ImageUrl = uploadInfo.url;
    // }
  }
};
</script>

