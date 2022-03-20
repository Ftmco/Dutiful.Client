<template></template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    token: "",
    team: {},
  }),
  created() {
    this.token = this.$route.query.token.toString() ?? "";
  },
  methods: {
    teamInfo() {},
  },
});
</script>