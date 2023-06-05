<script setup>
import Loader from "./Loader.vue";

defineProps({
  loading: {
    type: Boolean,
    default: false,
  }
});
</script>

<template>
  <button
      type="submit"
      class="btn btn-primary w-100"
      :disabled="loading"
  >
    <slot v-if="!loading" />
    <Loader v-else />
  </button>
</template>
