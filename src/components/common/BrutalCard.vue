<template>
  <section class="brutal-card pop-in safe-hover" :style="cardStyle">
    <slot />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    color?: string;
    tilt?: number;
    padded?: boolean;
  }>(),
  {
    color: 'var(--white)',
    tilt: 0,
    padded: true,
  },
);

const cardStyle = computed(() => ({
  '--tilt': `${props.tilt}deg`,
  '--card-tilt': `${props.tilt}deg`,
  background: props.color,
  padding: props.padded ? '20px' : '0',
}));
</script>
