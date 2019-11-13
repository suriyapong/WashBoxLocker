<template>
  <div class="home">
    <p v-if="Cando('update','Company')">Hello</p>
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    //HelloWorld
  },
  methods: {
    Cando(action, object) {
      const userlogin = 1;
      var Ican = this.$can(action, { type: object, RoleId: userlogin });
      return Ican;
    }
  }
}
</script>
