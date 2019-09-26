<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
     
      {{userStatus}}
    </v-layout>
  </v-container>
</template>
<script>
//import { mapGetters, mapMutations, mapState } from "vuex";
// import store from "../store";
//Grid จำเป็น
// import {
//   GridPlugin,
//   Page,
//   Sort,
//   Group,
//   Toolbar,
//   ExcelExport
// } from "@syncfusion/ej2-vue-grids";

import feathersClient from '../plugins/feathers-client'


export default {
  data: () => ({
  
   
    user: [],
    userStatus:[],
   
   
  }),
  computed: {},
  mounted: function() {
    this.renderUI();
  },

  methods: {
    // //ExportExcel
    // toolbarClickReport1(args) {
    //   if (args.item.id === "GridReport1_excelexport") {
    //     // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
    //     this.$refs.gridReport1.excelExport();
    //   }
    // },
    // closeDialog() {
    //   this.dialog = false;
    //   this.dialogDelete = false;
    // },
    // async onDelete(item) {
    //   this.deleteItem = Object.assign({}, item);
    //   this.dialogDelete = true;
    // },
    // async deleteToServer(id) {
    //   this.loading = true;
    //   try {
    //     await this.$store.dispatch("user/remove", this.deleteItem.Id);
    //     this.renderUI();
    //   } catch (err) {
    //     alert("ไม่สามารถต่อ server ได้");
    //   } finally {
    //     this.loading = false;
    //     this.dialogDelete = false;
    //   }
    // },

   async renderUI() {
      // try {
      //   //User
      //   this.search = "";
      //   const q = {};
      //   q.$eager = "[role,company]";
      //   let res = await this.$store.dispatch("user/find", { query: q });
      //   this.user = res.data;

      // } catch (err) {
      //    alert("ไม่สามารถต่อ server ได้");
      // }

      try {
        var role = await feathersClient.service('role').find({})
        this.userStatus = role;
         
         

      } catch (err) {
        alert("ไม่สามารถต่อ server ได้"+err);
      } 
      
      // try {
      //   var res = await this.$store.dispatch("userofcompany/find", {});
      //   this.report1 = res[0].data;
        
         

      // } catch (err) {
      //   alert("ไม่สามารถต่อ server ได้");
      // }
    }
  }
};
</script>