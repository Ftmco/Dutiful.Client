<template>
  <v-dialog v-model="dialog" hide-overlay persistent width="300">
    <v-card color="primary" dark>
      <v-card-text>
        Please Wait
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    dialog: false,
  }),
  created() {
    this.$root.$refs.loading = this;
  },
  methods: {
    open() {
      console.log('loading opend',this.dialog);
      this.dialog = true;
    },
    close() {
      console.log('loading closed',this.dialog);
      this.dialog = false;
    },
  },
});
</script>