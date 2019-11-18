<template>
  <v-card max-width="auto" class="mx-auto">
    <v-list three-line>
      <template>
        <v-list-item>
          <v-list-item-avatar>{{ BoxNo }}</v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{Type}}</v-list-item-title>
            <v-list-item-subtitle>
              <p>{{ Active }}</p>
              <!-- <span :v-if="Active == 1">{{ TelNo }}</span>
              <span style="padding-left:5px;" :v-if="Type != null">{{ JobCode }}</span> -->
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>


<script>
export default {
  data: () => ({}),
  props: ["BoxNo", "Type", "Active","TelNo","JobCode"],
  async mounted() {

  }
};
</script>
