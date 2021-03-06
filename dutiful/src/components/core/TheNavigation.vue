<template>
  <v-navigation-drawer app v-model="drawer" fixed temporary>
    <v-list nav dense>
      <v-list-item-group v-model="group" active-class="text--accent-4">
        <v-list-item :to="{ name: 'Settings' }" v-if="user.isAuthenticated">
          <v-col align="left">
            <v-list-item-avatar size="100" color="grey">
              <v-img
                v-if="user.profile.image != null"
                :src="createFileAddress(user.profile.image[0])"
                :lazy-src="createFileAddress(user.profile.image[0])"
              />
            </v-list-item-avatar>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{ user.profile.User.FullName }}
                </v-list-item-title>
                <v-list-item-subtitle>{{
                  user.profile.User.Email || user.profile.User.MobileNo
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-list-item>

        <v-list-item v-for="item in items" :key="item.id" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <v-list-item @click="changeTheme">
          <v-list-item-icon>
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ theme }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          v-if="user.isAuthenticated"
          block
          color="error"
          elevation="10"
          @click="logOut"
        >
          Logout
          <v-icon>mdi-logout</v-icon>
        </v-btn>
        <v-btn v-else block color="info" elevation="10" @click="login">
          Login
          <v-icon>mdi-login</v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>


<script lang="ts">
import Vue from "vue";
import { application, navigationItems } from "@/constants/";
import Account from "@/services/account";
import AccountServiec from "@/api/service/account.service";
import { apiCall } from "@/api";
import ProfileService from "@/api/service/profile.service";
import { createFileAddress } from "@/services/file";
import { getProfile } from "fteam.identity.package/src/Account/profile";

export default Vue.extend({
  data: () => ({
    drawer: false,
    user: {
      isAuthenticated: Account.isAuthenticated(),
      profile: {
        Image: "",
        Json: "",
        User: {},
      },
    },
    items: navigationItems,
    group: null,
    accountServices: new AccountServiec(apiCall),
    profileService: new ProfileService(apiCall),
    theme: "Light",
    active: 0,
  }),
  created() {
    this.$root.$refs.navigationDrawer = this;
    this.getUser();
  },
  methods: {
    open() {
      this.drawer = true;
    },
    getUser() {
      let currentUserAuthenticated = Account.isAuthenticated();
      if (currentUserAuthenticated) {
        getProfile(application).then((res: any) => {
          if (res.Status) {
            this.user.isAuthenticated = true;
            this.user.profile = res.Result;
          }
        });
      }
    },
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.theme = this.$vuetify.theme.dark ? "Dark" : "Light";
      localStorage.setItem("theme", this.theme);
    },
    logOut() {
      this.accountServices.LogOut().then(() => {
        (window.location as any) = "/account/login";
      });
    },
    login() {
      this.$router.push({ name: "Login" });
    },
    createFileAddress,
  },
});
</script>