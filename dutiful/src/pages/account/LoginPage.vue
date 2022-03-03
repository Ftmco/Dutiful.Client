<template>
  <AccountBase
    title="Login"
    subTitle="Welcome To Article News"
    formHeight="500px"
  >
    <template v-slot:image>
      <v-img
        contain
        src="@/assets/images/login.png"
        lazy-src="@/assets/images/login.png"
        width="100%"
        height="500px"
      />
    </template>
    <template v-slot:form>
      <v-form ref="loginForm">
        <v-text-field
          v-model="loginModel.userName"
          :rules="[rules.require]"
          outlined
          clearable
          color="blue darken-2"
          label="UserName"
          required
        ></v-text-field>

        <v-text-field
          v-model="loginModel.password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          :rules="[rules.require, rules.password]"
          outlined
          clearable
          label="Password"
          hint="At least 6 characters"
          counter
          @click:append="show = !show"
        ></v-text-field>
      </v-form>
    </template>
    <template v-slot:actions>
      <div>
        <v-btn color="primary" block @click="loginSubmit">
          <span>Login</span>
        </v-btn>
        <br />
        <v-row>
          <v-col>
            <v-btn color="info" block :to="{ name: 'ForgotPassword' }">
              <span>Forgot Password</span>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn color="info" block :to="{ name: 'SignUp' }">
              <span>Sign Up</span>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn color="info" block :to="{ name: 'ActiveAccount' }">
              <span>Active Account</span>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </template>
  </AccountBase>
</template>

<script lang="ts">
import Vue from "vue";
import { application, messages, rules } from "@/constants";
import AccountServiec from "@/api/service/account.service";
import { apiCall } from "@/api";
import AccountBase from "@/components/account/AccountBase.vue";
import { loading, showMessage } from "@/services/message";
import { login } from "fteam.identity.package/src/Account/account";
import { changeBaseUrl } from "fteam.identity.package/src/constants";

export default Vue.extend({
  components: { AccountBase },
  data: () => ({
    loginModel: {
      userName: "",
      password: "",
    },
    show: false,
    rules: rules,
    accountService: new AccountServiec(apiCall),
  }),
  mounted() {
    this.loginModel.userName = this.$route.query.userName?.toString();
  },
  methods: {
    loginSubmit() {
      let isValid = (this.$refs.loginForm as any).validate();
      if (isValid) {
        loading(this);
        login({
          ...this.loginModel,
          application: application,
        })
          .then((res: any) => {
            if (res.Status) {
              localStorage.setItem("sessionKey", res.Result.Key);
              localStorage.setItem(res.Result.Key, res.Result.Value);
              (window.location as any) = "/tabs/settings";
            }
            showMessage(this, res.Title);
          })
          .catch((e: any) => {
            showMessage(this, e.Title);
          });
      } else showMessage(this, messages.invalidForm);
    },
  },
});
</script>