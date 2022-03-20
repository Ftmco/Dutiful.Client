<template>
  <v-col cols="12" md="4" sm="6" xl="3">
    <v-card class="mx-auto" elevation="5"  outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="text-overline mb-4">{{ project.name }}</div>
          <v-list-item-title class="text-h5 mb-1">
            {{ project.name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ project.description }}</v-list-item-subtitle>
           <v-list-item-subtitle>tasks : {{ project.tasksCount }}</v-list-item-subtitle>
           <v-list-item-subtitle>users : {{ project.usersCount }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="90" color="grey"></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined fab text color="red">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn outlined fab text color="info">
          <v-icon>mdi-comment</v-icon>
        </v-btn>
        <v-btn outlined fab text>
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    project: {
      default: null,
      type: Object,
    },
  },
});
</script>