<template>
  <v-col cols="12">
    <v-text-field
      placeholder="Search..."
      label="Search"
      outlined
      clearable
      append-icon="mdi-magnify"
    ></v-text-field>
    <v-col>
      <v-row>
        <team v-for="team in teams" :key="team.id" :team="team" />
      </v-row>
      <v-fab-transition>
        <v-btn
          color="primary"
          dark
          fixed
          bottom
          style="bottom: 80px"
          right
          fab
          @click="newTeam"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-col>
    <app-dialog :title="dialogOptions.title" :titleColor="dialogOptions.color">
      <template v-slot:body>
        <component :is="component"></component>
      </template>
    </app-dialog>
  </v-col>
</template>

<script lang="ts">
import AppDialog from "@/components/core/AppDialog.vue";
import { openDialog } from "@/services/message";
import Vue from "vue";
import Upsert from "@/components/team/Upsert.vue";
import Team from "@/components/team/Team.vue";

export default Vue.extend({
  components: { AppDialog, Team },
  data: () => ({
    teams: [
      {
        id: "10",
        name: "test",
        bio: "testing team for dutiful application",
        projectsCount: 5,
        usersCount: 5,
        token:'adlasdaksdhkhasd'
      },
    ],
    component: Upsert,
    dialogOptions: {
      title: "Create New Team",
      color: "primary",
    },
  }),
  beforeMount() {
    this.loadTeams();
  },
  methods: {
    loadTeams() {},
    newTeam() {
      openDialog(this);
    },
  },
});
</script>
