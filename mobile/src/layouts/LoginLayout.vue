<template>
  <q-layout>
   
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";

export default {
  name: "LoginLayout",
  methods: {
    openURL
  }
};
</script>

<style>
@media screen and (min-width:768px) {
  .q-footer{
    display: none;
  }
}
</style>