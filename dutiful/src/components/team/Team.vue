<template>
  <v-col cols="12" md="4" sm="6" xl="3">
    <v-card class="mx-auto" elevation="5" outlined>
      <v-list-item
        three-line
        :to="{ name: 'Team', query: { token: team.token, name: team.name } }"
      >
        <v-list-item-content>
          <div class="text-overline mb-4">{{ team.name }}</div>
          <v-list-item-title class="text-h5 mb-1">
            {{ team.name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ team.bio }}</v-list-item-subtitle>
          <v-list-item-subtitle
            >projects : {{ team.projectsCount }}</v-list-item-subtitle
          >
          <v-list-item-subtitle
            >users : {{ team.usersCount }}</v-list-item-subtitle
          >
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
        <v-btn @click="deleteTeam" outlined fab text color="error">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <confirm-dialog
      :agreeText="confirm.aggree"
      :disagreeText="confirm.disagree"
      :text="confirm.message"
      :title="confirm.title"
      @action="confirmComplete"
    />
  </v-col>
</template>

<script lang="ts">
import { deleteTeam } from "@/api/apis/team";
import { openConfirm, showMessage } from "@/services/message";
import Vue from "vue";
import ConfirmDialog from "../core/ConfirmDialog.vue";
export default Vue.extend({
  components: {
    ConfirmDialog,
  },
  props: {
    team: {
      default: null,
      type: Object,
    },
  },
  data: () => ({
    confirm: {
      title: "",
      message: "",
      aggree: "",
      disagree: "",
    },
  }),
  methods: {
    deleteTeam() {
      this.confirm = {
        title: "Delete Team",
        message: `Are you sure to delete ${this.team.name}?`,
        aggree: "Delete",
        disagree: "Cancel",
      };
      openConfirm(this, {});
    },
    confirmComplete(e: any) {
      if (e.agree) {
        deleteTeam(this.team.token)
          .then((res) => {
            if (res.status) {
              this.$emit("delete", {
                status: res.status,
                team: this.team,
              });
            }
            showMessage(this, res.title);
          })
          .catch((e) => {
            showMessage(this, e.message);
          });
      }
    },
  },
});
</script>