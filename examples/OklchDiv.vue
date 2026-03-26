<script setup lang="ts">
const props = defineProps<{
    l: string;
    c: string;
    h: string;
}>();

const color = `oklch(${props.l} ${props.c} ${props.h})`;
</script>

<template>
    <div :style="{ backgroundColor: color }" class="oklch-div">
        <p>{{ color }}</p>
    </div>
</template>

<style scoped>
.oklch-div {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
</style>
