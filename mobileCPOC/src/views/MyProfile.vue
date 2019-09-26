<template>
  <div>
    <v-toolbar v-show="$route.name != 'Login'" color="deep-purple" dark>
      <v-btn icon @click="Main()">
        <v-icon>mdi-arrow-left-bold</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <span align="center">My Profile</span>
      </v-toolbar-title>

      <div class="flex-grow-1"></div>

     
    </v-toolbar>
    <v-container fluid>
      <v-card align="center">
        <v-container fluid>
          <div class="mt-5" align="center" style="padding-bottom:20px">
            <v-avatar size="150px" v-ripple class="mb-3 mt-5">
              <img :src="formModel.ImageUrl" alt="avatar" />
            </v-avatar>
          </div>
          <div class="ml-5" align="left">Name : {{formModel.FullName}}</div>
          <div class="ml-5" align="left">Gender : {{formModel.Sex}}</div>
          <div class="ml-5" align="left">BirthDate : {{formModel.BirthDate |date}}</div>
          <div class="ml-5" align="left">BloodGroup : {{formModel.BloodGroup}}</div>
          <div class="ml-5" align="left">Nationality : {{formModel.Nationality}}</div>
          <div class="ml-5" align="left">Email : {{formModel.Email}}</div>
          <div class="ml-5" align="left">Telephone : {{formModel.Telephone}}</div>
          <div class="ml-5" align="left">Owner : {{formModel.Owner}}</div>
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>
<style >
</style>
<script>
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/th";
import feathersClient from "../plugins/feathers-client";

export default {
  data: () => ({
    service: "user",
    objectName: "พนักงาน",
    defaultValue: {
      ImageUrl: "/img/user.png"
    },
    //--end config
    formModel: {},
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
        this.formModel = Object.assign({}, inDTO.data[0]);
      } catch (err) {
        //console.log(err);
        alert("ไม่สามารถต่อ server ได้");
      }

      //let a = await feathersClient.service("historyservice").patch("ByPassenger", {UserId:"88"})
    },
    // uploadDone(uploadInfo) {
    //   this.formModel.ImageUrl = uploadInfo.url;
    // }
    Main() {
      this.$router.push({ path: "/mainpass" });
    }
  }
};
</script>