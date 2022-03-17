<template>
  <v-col cols="12">
    <v-col align="left">
      <v-list-item-avatar size="150" color="grey">
        <v-img
          v-if="team.avatar.base64 != ''"
          :src="team.avatar.base64"
          :lazy-src="team.avatar.base64"
        />
      </v-list-item-avatar>
      <v-list-item>
        <v-file-input
          placeholder="Avatar"
          chips
          show-size
          clearable
          accept="image/*"
          @change="choseAvatar"
        />
      </v-list-item>
    </v-col>
    <v-text-field outlined placeholder="Team Name" label="Team Name" />
    <v-textarea outlined placeholder="Bio" label="Bio" auto-grow></v-textarea>
    <v-btn
      color="primary"
      :loading="inAction"
      @click="inAction = !inAction"
      block
      >Create</v-btn
    >
  </v-col>
</template>

<script lang="ts">
import { convertToBase64File } from "@/services/file";
import { showMessage } from "@/services/message";
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    team: {
      name: "",
      avatar: {
        base64: "",
        ogName: "",
        type: "",
      },
    },
    inAction: false,
  }),
  methods: {
    choseAvatar(file: any) {
      if (file != null) {
        convertToBase64File(file)
          .then((res: any) => {
            if (res != null) {
              this.team.avatar = {
                base64: res.base64,
                ogName: res.ogName,
                type: res.type,
              };
            } else this.team.avatar.base64 = "";
          })
          .catch((e) => {
            this.team.avatar.base64 = "";
            showMessage(this, e.message);
          });
      } else {
        this.team.avatar.base64 = "";
      }
    },
  },
});
</script>