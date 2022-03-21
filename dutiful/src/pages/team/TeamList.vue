<template>
  <v-col cols="12">
    <v-text-field
      placeholder="Search..."
      label="Search"
      outlined
      clearable
      append-icon="mdi-magnify"
      @input="search"
    ></v-text-field>
    <v-col>
      <v-row>
        <team
          @delete="teamDeleted"
          v-for="(team, i) in teams"
          :key="i"
          :team="team"
        />
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
        <component @upserted="teamUpsert" :is="component"></component>
      </template>
    </app-dialog>
  </v-col>
</template>

<script lang="ts">
import AppDialog from "@/components/core/AppDialog.vue";
import {
  closeDialog,
  closeLoading,
  loading,
  openDialog,
  showMessage,
} from "@/services/message";
import Vue from "vue";
import Upsert from "@/components/team/Upsert.vue";
import Team from "@/components/team/Team.vue";
import { getTeams } from "@/api/apis/team";

export default Vue.extend({
  components: { AppDialog, Team },
  data: () => ({
    allTeams: [],
    teams: [],
    component: Upsert,
    dialogOptions: {
      title: "Create New Team",
      color: "primary",
    },
  }),
  watch: {
    allTeams() {
      this.teams = this.allTeams;
    },
  },
  beforeMount() {
    this.loadTeams();
  },
  methods: {
    loadTeams() {
      loading(this);
      getTeams()
        .then((res) => {
          if (res.status) {
            this.allTeams = res.result;
          }
          showMessage(this, res.title);
          closeLoading(this);
        })
        .catch((e) => {
          showMessage(this, e.message);
          closeLoading(this);
        });
    },
    newTeam() {
      openDialog(this);
    },
    teamUpsert(e: any) {
      if (e.status) {
        this.allTeams.push(e.team as never);
        closeDialog(this);
      }
    },
    teamDeleted(e: any) {
      if (e.status) {
        const teamIdnex = this.allTeams.findIndex(
          (t: any) => t.token == e.team.token
        );
        this.allTeams.splice(teamIdnex, 1);
      }
    },
    search(e: string) {
      e = e.toLocaleLowerCase().trim();
      this.teams = this.allTeams.filter(
        (t: any) =>
          t.name.toLocaleLowerCase().includes(e) ||
          t.bio.toLocaleLowerCase().includes(e)
      );
    },
  },
});
</script>
