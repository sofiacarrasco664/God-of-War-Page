<template>
   
    <slot v-if="!loading"/>
    <Loader v-else />
</template>

<script>
import Loader from "./Loader.vue";

export default {
    name: "LoadingContext",
    components: {Loader},
    props: {
        loading: {
            type: Boolean,
            required: true,
        }
    },
};
</script>
