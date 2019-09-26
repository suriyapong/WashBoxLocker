<template>
  <div>
    <v-toolbar v-show="$route.name != 'Login'" color="deep-purple" dark>
      <v-btn icon @click="Main()">
        <v-icon>mdi-arrow-left-bold</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <span align="center">My Plan</span>
      </v-toolbar-title>

      <div class="flex-grow-1"></div>
     
    </v-toolbar>
     <v-tabs v-model="currentItem" background-color="white" fixed-tabs slider-color="white">
      <v-tabs-slider color="deep-purple"></v-tabs-slider>
      <v-tab>Outbound</v-tab>

      <v-tab>Inbound</v-tab>

      <v-tab-item>
        <v-container style="background-color: lightgrey;">
          <v-card max-width="500" class="mx-auto">
            <v-list two-line>
              <template v-for="(item, index) in itemsOut">
                <v-list-item :key="item.title">
                  <template>
                    <v-list-item-content>
                      <v-list-item-title>{{item.Date | fulldatetime}}</v-list-item-title>
                      <v-list-item-subtitle class="text--primary">FlightNo. {{item.FlightNo}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>

                <v-divider v-if="index + 1 < itemsOut.length" :key="index"></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-container>
      </v-tab-item>

      <v-tab-item>
        <v-container style="background-color: lightgrey;">
          <v-card max-width="500" class="mx-auto">
            <v-list two-line>
              <template v-for="(item, index) in itemsIn">
                <v-list-item :key="item.title">
                  <template>
                    <v-list-item-content>
                      <v-list-item-title>{{item.Date | fulldatetime}}</v-list-item-title>
                      <v-list-item-subtitle class="text--primary">FlightNo. {{item.FlightNo}}</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>

                <v-divider v-if="index + 1 < itemsIn.length" :key="index"></v-divider>
              </template>
            </v-list>
          </v-card>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import { createDateFilter } from "vue-date-fns";
import locale from "date-fns/locale/en";
import feathersClient from "../plugins/feathers-client";

export default {
  data: () => ({
   
    itemsOut: [],
      itemsIn: []
  }),
  props: ["Id"],
  components: {
    // ResetPassword
  },
  filters: {
    date: createDateFilter("DD/MM/YYYY", { locale }),
    dateC: createDateFilter("HH:mm", { locale }),
    fulldatetime: createDateFilter("DD/MM/YYYY HH:mm", { locale })
  },

  computed: {
    // ...mapState("auth", ["user"])
  },
  async mounted() {
    this.renderUI();
  },
  methods: {
    async renderUI() {
      try {
        const { user } = await feathersClient.get("authentication");
        let inDTO = await feathersClient.service("historyservice").patch("ByBoarding", { UserId: user.Id });
       this.itemsOut = inDTO[0].dataOutbound;
        this.itemsIn = inDTO[0].dataInbound;
      } catch (err) {
        //console.log(err);
        alert("ไม่สามารถต่อ server ได้");
      }
    },
    Main() {
      this.$router.push({ path: "/mainpass" });
    }
  }
};
</script>