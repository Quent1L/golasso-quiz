<template>
  <nav class="nav-item fixed bottom-0 left-0 right-0 z-50">
    <div class="grid grid-cols-4 max-w-lg mx-auto">
      <RouterLink
        v-for="item in navItems"
        :key="item.name"
        :to="item.to"
        class="flex flex-col items-center justify-center py-3 px-2 text-xs font-medium transition-colors"        :class="[
          $route.path === item.to || ($route.path.startsWith(item.to) && item.to !== '/')
            ? 'nav-item-active' 
            : 'nav-item-inactive hover:text-primary'
        ]"
      >
        <component 
          :is="item.icon" 
          class="w-5 h-5 mb-1"          :class="[
            $route.path === item.to || ($route.path.startsWith(item.to) && item.to !== '/')
              ? 'text-green-600' 
              : 'text-muted'
          ]"
        />
        <span>{{ item.label }}</span>
      </RouterLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { 
  PuzzlePieceIcon,
  TrophyIcon, 
  ChartBarIcon,
  UserIcon
} from '@heroicons/vue/24/outline'

const navItems = [
  {
    name: 'quiz',
    label: 'Quiz',
    to: '/quiz',
    icon: PuzzlePieceIcon
  },
  {
    name: 'rankings',
    label: 'Classements',
    to: '/rankings',
    icon: TrophyIcon
  },
  {
    name: 'stats',
    label: 'Stats',
    to: '/stats',
    icon: ChartBarIcon
  },
  {
    name: 'profile',
    label: 'Profil',
    to: '/profile',
    icon: UserIcon
  }
]
</script>
