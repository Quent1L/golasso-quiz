<template>
  <div class="min-h-screen bg-primary">
    <!-- Header -->
    <div class="px-6 pt-12 pb-8 text-center">
      <img 
        src="/golasso.png" 
        alt="Golasso" 
        class="w-20 h-20 mx-auto mb-4 rounded-2xl shadow-lg"      >      <h1 class="text-3xl font-bold text-primary mb-2">
        Golasso
      </h1>
      <p class="text-secondary">
        Testez votre culture football
      </p>
    </div>

    <!-- Quick Stats -->
    <div class="px-6 mb-8">      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Vos statistiques</h2>        <div class="grid grid-cols-3 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">{{ userStats.totalQuizzes }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Quiz joués</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">{{ userStats.averageScore }}%</div>            <div class="text-xs text-gray-500 dark:text-gray-400">Moyenne</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">{{ userStats.currentStreak }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">Série actuelle</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="px-6 space-y-4">
      <RouterLink 
        to="/quiz"
        class="block w-full bg-primary-500 hover:bg-primary-600 text-white rounded-2xl p-6 text-center font-semibold text-lg shadow-sm transition-colors"
      >
        🎮 Commencer un quiz
      </RouterLink>
      
      <div class="grid grid-cols-2 gap-4">        <RouterLink 
          to="/rankings"
          class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl p-4 text-center font-medium shadow-sm transition-colors"
        >
          🏆 Classements
        </RouterLink>
        <RouterLink 
          to="/stats"
          class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl p-4 text-center font-medium shadow-sm transition-colors"
        >
          📊 Mes stats
        </RouterLink>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="px-6 mt-8 mb-24">      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activité récente</h2>
        <div v-if="recentQuizzes.length > 0" class="space-y-3">
          <div 
            v-for="quiz in recentQuizzes" 
            :key="quiz.id"            class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div>
              <div class="font-medium text-gray-900 dark:text-white">{{ quiz.type === 'classic' ? 'QCM' : 'Classement' }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">{{ formatDate(quiz.endTime) }}</div>
            </div>
            <div class="text-right">
              <div class="font-semibold text-green-600">{{ quiz.score }}%</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ quiz.type === 'classic' ? 'QCM' : 'Classement' }}</div>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-gray-500 dark:text-gray-400 py-8">
          Aucun quiz joué récemment
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { QuizSession, UserStats } from '@/types'

// Mock data - à remplacer par un store
const userStats = ref<UserStats>({
  totalQuizzes: 12,
  totalQuestions: 145,
  correctAnswers: 98,
  averageScore: 68,
  bestScore: 95,
  currentStreak: 3,
  bestStreak: 7,
  categoryStats: {}
})

const recentQuizzes = ref<Partial<QuizSession>[]>([
  {
    id: '1',
    type: 'classic',
    score: 85,
    endTime: new Date('2025-06-14')
  },
  {
    id: '2',
    type: 'ranking',
    score: 72,
    endTime: new Date('2025-06-13')
  }
])

const formatDate = (date: Date | undefined) => {
  if (!date) return ''
  return new Intl.RelativeTimeFormat('fr', { numeric: 'auto' }).format(
    Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    'day'
  )
}
</script>
