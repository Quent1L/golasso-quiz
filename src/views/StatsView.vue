<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <div class="bg-surface border-b border-border">
      <div class="px-6 py-4">
        <h1 class="text-2xl font-bold text-primary">Mes Statistiques</h1>
        <p class="text-secondary">Analysez vos performances</p>
      </div>
    </div>    <div class="px-6 py-8 space-y-6">
      <!-- Vue d'ensemble -->
      <div class="card">
        <h2 class="text-lg font-semibold text-primary mb-4">📊 Vue d'ensemble</h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="text-center p-4 bg-accent rounded-lg">
            <div class="text-2xl font-bold text-green-600">{{ stats.totalQuizzes }}</div>
            <div class="text-sm text-secondary">Quiz joués</div>
          </div>
          <div class="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div class="text-2xl font-bold text-green-600">{{ stats.averageScore }}%</div>
            <div class="text-sm text-secondary">Score moyen</div>
          </div>
          <div class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div class="text-2xl font-bold text-blue-600">{{ stats.currentStreak }}</div>
            <div class="text-sm text-secondary">Série actuelle</div>
          </div>
          <div class="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div class="text-2xl font-bold text-yellow-600">{{ stats.bestScore }}%</div>
            <div class="text-sm text-secondary">Meilleur score</div>
          </div>
        </div>
      </div>      <!-- Progression -->
      <div class="card">
        <h2 class="text-lg font-semibold text-primary mb-4">📈 Progression</h2>
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-sm text-secondary">Précision générale</span>
            <span class="font-semibold text-green-600">{{ stats.averageScore }}%</span>
          </div>
          <div class="w-full bg-border rounded-full h-2">
            <div 
              class="bg-accent h-2 rounded-full transition-all duration-500"
              :style="{ width: `${stats.averageScore}%` }"
            ></div>
          </div>
          
          <div class="flex justify-between items-center mt-4">
            <span class="text-sm text-secondary">Série en cours</span>
            <span class="font-semibold text-blue-600">{{ stats.currentStreak }} / {{ stats.bestStreak }}</span>
          </div>
          <div class="w-full bg-border rounded-full h-2">
            <div 
              class="bg-blue-500 h-2 rounded-full transition-all duration-500"
              :style="{ width: `${(stats.currentStreak / stats.bestStreak) * 100}%` }"
            ></div>
          </div>
        </div>
      </div>      <!-- Performance par catégorie -->
      <div class="card">
        <h2 class="text-lg font-semibold text-primary mb-4">🎯 Performance par catégorie</h2>
        <div class="space-y-4">
          <div 
            v-for="category in categoryStats" 
            :key="category.name"
            class="flex items-center justify-between p-3 bg-accent rounded-lg"
          >
            <div class="flex items-center space-x-3">
              <div class="text-lg">{{ category.emoji }}</div>
              <div>
                <div class="font-medium text-primary">{{ category.name }}</div>
                <div class="text-sm text-secondary">{{ category.played }} quiz joués</div>
              </div>
            </div>
            <div class="text-right">
              <div class="font-semibold text-green-600">{{ category.averageScore }}%</div>
              <div class="text-xs text-secondary">{{ category.correct }}/{{ category.played }} réussis</div>
            </div>
          </div>
        </div>
      </div>      <!-- Historique récent -->
      <div class="card">
        <h2 class="text-lg font-semibold text-primary mb-4">📅 Historique récent</h2>
        <div class="space-y-3">
          <div 
            v-for="quiz in recentQuizzes" 
            :key="quiz.id"
            class="flex items-center justify-between p-3 border border-border rounded-lg"
          >
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                   :class="quiz.score >= 70 ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 
                          quiz.score >= 50 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' : 'bg-red-100 dark:bg-red-900/30 text-red-600'">
                {{ quiz.score }}%
              </div>
              <div>
                <div class="font-medium text-primary">{{ quiz.category }}</div>
                <div class="text-sm text-secondary">{{ formatDate(quiz.date) }}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm font-medium" :class="quiz.score >= 70 ? 'text-green-600' : 
                      quiz.score >= 50 ? 'text-yellow-600' : 'text-red-600'">
                {{ quiz.correctAnswers }}/{{ quiz.totalQuestions }}
              </div>
              <div class="text-xs text-secondary">{{ quiz.timeSpent }}s</div>
            </div>
          </div>
        </div>
      </div>      <!-- Badges et réalisations -->
      <div class="card">
        <h2 class="text-lg font-semibold text-primary mb-4">🏅 Badges obtenus</h2>
        <div class="grid grid-cols-3 gap-3">
          <div 
            v-for="badge in earnedBadges" 
            :key="badge.id"
            class="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700"
          >
            <div class="text-2xl mb-1">{{ badge.emoji }}</div>
            <div class="text-xs font-medium text-primary">{{ badge.name }}</div>
            <div class="text-xs text-secondary mt-1">{{ badge.description }}</div>
          </div>
        </div>
        
        <div v-if="earnedBadges.length === 0" class="text-center py-8 text-secondary">
          Jouez plus de quiz pour débloquer des badges !
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const stats = ref({
  totalQuizzes: 12,
  totalQuestions: 145,
  correctAnswers: 98,
  averageScore: 68,
  bestScore: 95,
  currentStreak: 3,
  bestStreak: 7
})

const categoryStats = ref([
  { name: 'Ligue 1', emoji: '🇫🇷', played: 5, correct: 4, averageScore: 72 },
  { name: 'Champions League', emoji: '🏆', played: 3, correct: 2, averageScore: 68 },
  { name: 'Coupe du Monde', emoji: '🌍', played: 2, correct: 1, averageScore: 65 },
  { name: 'Premier League', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', played: 2, correct: 1, averageScore: 70 }
])

const recentQuizzes = ref([
  {
    id: '1',
    category: 'Ligue 1',
    score: 85,
    correctAnswers: 8,
    totalQuestions: 10,
    timeSpent: 156,
    date: new Date('2025-06-14')
  },
  {
    id: '2',
    category: 'Champions League',
    score: 72,
    correctAnswers: 7,
    totalQuestions: 10,
    timeSpent: 203,
    date: new Date('2025-06-13')
  },
  {
    id: '3',
    category: 'Coupe du Monde',
    score: 45,
    correctAnswers: 4,
    totalQuestions: 10,
    timeSpent: 187,
    date: new Date('2025-06-12')
  }
])

const earnedBadges = ref([
  {
    id: '1',
    name: 'Première victoire',
    emoji: '🎯',
    description: 'Premier quiz réussi'
  },
  {
    id: '2',
    name: 'Série de 3',
    emoji: '🔥',
    description: '3 quiz consécutifs'
  }
])

const formatDate = (date: Date) => {
  return new Intl.RelativeTimeFormat('fr', { numeric: 'auto' }).format(
    Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
    'day'
  )
}
</script>
