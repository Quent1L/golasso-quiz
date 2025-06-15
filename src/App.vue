<template>
  <div id="app" class="min-h-screen bg-primary">
    <RouterView />
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import BottomNav from '@/components/BottomNav.vue'
</script>
