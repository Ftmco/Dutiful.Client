<template>
  <v-col cols="12">
    <v-form ref="upsertForm">
      <v-col align="left">
        <v-list-item-avatar size="150" color="grey">
          <v-img
            v-if="teamModel.avatar.base64 != ''"
            :src="teamModel.avatar.base64"
            :lazy-src="teamModel.avatar.base64"
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
      <v-text-field
        outlined
        placeholder="Team Name"
        v-model="teamModel.name"
        :rules="[rules.require]"
        label="Team Name"
      />
      <v-textarea
        outlined
        v-model="teamModel.bio"
        placeholder="Bio"
        label="Bio"
        auto-grow
      ></v-textarea>
      <v-btn color="primary" :loading="inAction" @click="upsertTeam" block
        >Create</v-btn
      >
    </v-form>
  </v-col>
</template>

<script lang="ts">
import { rules } from "@/constants";
import { convertToBase64File } from "@/services/file";
import { showMessage } from "@/services/message";
import { messages } from "@/constants/index";
import Vue from "vue";
import { upsert } from "@/api/apis/team";
export default Vue.extend({
  data: () => ({
    teamModel: {
      name: "",
      bio: "",
      avatar: {
        base64: "",
        ogName: "",
        type: "",
      },
    },
    inAction: false,
    rules: rules,
  }),
  methods: {
    choseAvatar(file: any) {
      if (file != null) {
        convertToBase64File(file)
          .then((res: any) => {
            if (res != null) {
              this.teamModel.avatar = {
                base64: res.base64,
                ogName: res.ogName,
                type: res.type,
              };
            } else this.teamModel.avatar.base64 = "";
          })
          .catch((e) => {
            this.teamModel.avatar.base64 = "";
            showMessage(this, e.message);
          });
      } else {
        this.teamModel.avatar.base64 = "";
      }
    },
    upsertTeam() {
      const isValid = (this.$refs.upsertForm as any).validate();
      if (isValid) {
        this.inAction = true;
        upsert(this.teamModel)
          .then((res) => {
            if (res.status) {
              this.$emit("upserted", {
                status: res.status,
                team: res.result,
              });
            }
            this.inAction = false;
            showMessage(this, res.title);
          })
          .catch((e) => {
            showMessage(this, e.message);
            this.inAction = false;
          });
      } else showMessage(this, messages.invalidForm);
    },
  },
});
</script>