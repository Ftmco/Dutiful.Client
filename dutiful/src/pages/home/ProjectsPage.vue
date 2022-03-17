<template>
  <v-col cols="12">
    <v-text-field
      placeholder="Search..."
      label="Search"
      outlined
      clearable
      append-icon="mdi-magnify"
    ></v-text-field>
    <v-card>
      <v-fab-transition>
        <v-btn color="primary" dark fixed bottom style="bottom: 80px" right fab>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>