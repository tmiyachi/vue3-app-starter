<template>
  <p>{{ greeting }} World</p>
</template>

<script setup>
  import { ref } from 'vue';

  const greeting = ref('Hello');
</script>

<style>
  p {
    font-size: 16px;
    font-weight: bold;
    color: black;
    text-align: center;
  }
</style>
