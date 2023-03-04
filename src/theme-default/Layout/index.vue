<template>
  <h1>This is Layout Component</h1>
  <div>
    {{ court }}
    <button @click="court++">Add Court</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const court = ref(1);
</script>
