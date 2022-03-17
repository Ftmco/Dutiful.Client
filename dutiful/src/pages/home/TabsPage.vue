<template>
  <v-main>
    <app-bar />
    <router-view />
    <br>
    <the-bottom-navigation />
    <the-loading />
    <the-snackbar />
  </v-main>
</template>


<script lang="ts">
import AppBar from "@/components/core/AppBar.vue";
import TheBottomNavigation from "@/components/core/TheBottomNavigation.vue";
import TheLoading from "@/components/core/TheLoading.vue";
import TheSnackbar from "@/components/core/TheSnackbar.vue";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  components: {
    TheBottomNavigation,
    AppBar,
    TheLoading,
    TheSnackbar,
  },
})
</script>
