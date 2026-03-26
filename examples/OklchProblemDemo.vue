<script setup lang="ts">
import OklchDiv from './OklchDiv.vue';

const props = defineProps<{
    lightness: string;
    chroma: string;
    showGray?: boolean;
    whiteText?: boolean;
}>();
</script>

<template>
    <div class="oklch-problem-demo-palette" :class="{ 'color-white': whiteText }">
        <OklchDiv :l="lightness" :c="chroma" h="0" />
        <OklchDiv :l="lightness" :c="chroma" h="130" />
        <OklchDiv :l="lightness" :c="chroma" h="260" />
        <OklchDiv v-if="showGray" :l="lightness" c="0" h="0" />
    </div>
</template>

<style>
.oklch-problem-demo-palette {
    display: flex;
    flex-flow: row nowrap;
    gap: 0.5rem;
    align-items: stretch;
    justify-content: center;
    padding: 0.25rem 0px;
    color: black;

    > * {
        flex: 1 1 0;
        text-align: center;
    }
}

.color-white {
    color: white;
}
</style>
