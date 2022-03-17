<template>
  <v-bottom-navigation
    :input-value="show"
    v-model="page"
    shift
    fixed
    grow
    color="primary"
  >
    <v-btn
      v-for="(item, i) in items"
      :value="item.title"
      :key="i"
      :to="item.to"
    >
      <span>{{ item.title }}</span>

      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
import Vue from "vue";
import { bottomItems } from "@/constants/";

export default Vue.extend({
  watch: {
    $route() {
      this.page = this.$route.name ?? "Home";
    },
  },
  data: () => ({
    page: "Home",
    show: false,
    items: bottomItems,
  }),
  mounted() {
    this.setShow();
  },
  methods: {
    setShow() {
      this.show = window.screen.width <= 700;
    },
  },
});
</script>

<style scoped>
</style>