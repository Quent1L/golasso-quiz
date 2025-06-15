<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <div class="bg-surface border-b border-border">
      <div class="px-6 py-4">
        <h1 class="text-2xl font-bold text-primary">Classements</h1>
        <p class="text-secondary">Comparez vos performances</p>
      </div>
    </div>

    <div class="px-6 py-8 space-y-6">
      <!-- Classement général -->
      <div class="card">
        <h2 class="text-lg font-semibold text-primary mb-4">🏆 Classement général</h2>
        <div class="space-y-3">
          <div 
            v-for="(player, index) in topPlayers" 
            :key="player.id"
            class="flex items-center justify-between p-3 rounded-lg"
            :class="index === 0 ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700' : 'bg-accent'"
          >
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                   :class="index === 0 ? 'bg-yellow-500 text-white' : 
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-amber-600 text-white' : 'bg-border text-primary'">
                {{ index + 1 }}
              </div>
              <div>
                <div class="font-medium text-primary">{{ player.username }}</div>
                <div class="text-sm text-secondary">{{ player.totalQuizzes }} quiz joués</div>
              </div>
            </div>
            <div class="text-right">
              <div class="font-semibold text-green-600">{{ player.averageScore }}%</div>
              <div class="text-xs text-secondary">{{ player.totalPoints }} pts</div>
            </div>
          </div>
        </div>
      </div>      <!-- Votre position -->
      <div class="card">
        <h2 class="text-lg font-semibold text-primary mb-4">📊 Votre position</h2>
        <div class="bg-accent rounded-lg p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                {{ userRank }}
              </div>
              <div>
                <div class="font-medium text-primary">Votre classement</div>
                <div class="text-sm text-secondary">Sur {{ totalPlayers }} joueurs</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xl font-bold text-green-600">{{ userStats.averageScore }}%</div>
              <div class="text-sm text-secondary">Moyenne générale</div>
            </div>
          </div>
        </div>
      </div>      <!-- Classements par catégorie -->
      <div class="card">
        <h2 class="text-lg font-semibold text-primary mb-4">🎯 Par catégorie</h2>
        <div class="grid grid-cols-2 gap-3">
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="bg-accent rounded-lg p-3 text-center"
          >
            <div class="text-sm font-medium text-primary">{{ category.name }}</div>
            <div class="text-lg font-bold text-green-600 mt-1">{{ category.userScore }}%</div>
            <div class="text-xs text-secondary">#{{ category.userRank }}</div>
          </div>
        </div>
      </div>      <!-- Défis hebdomadaires -->
      <div class="card">
        <h2 class="text-lg font-semibold text-primary mb-4">⚡ Défis de la semaine</h2>
        <div class="space-y-3">
          <div 
            v-for="challenge in weeklyLeaderboard" 
            :key="challenge.id"
            class="flex items-center justify-between p-3 bg-accent rounded-lg"
          >
            <div class="flex items-center space-x-3">
              <div class="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                {{ challenge.rank }}
              </div>
              <div>
                <div class="font-medium text-primary">{{ challenge.username }}</div>
                <div class="text-sm text-secondary">{{ challenge.quizzesThisWeek }} quiz cette semaine</div>
              </div>
            </div>
            <div class="text-right">
              <div class="font-semibold text-orange-600">{{ challenge.weeklyScore }} pts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Mock data
const userRank = ref(15)
const totalPlayers = ref(1247)
const userStats = ref({
  averageScore: 68,
  totalQuizzes: 12
})

const topPlayers = ref([
  { id: '1', username: 'FootballExpert', averageScore: 94, totalQuizzes: 156, totalPoints: 14664 },
  { id: '2', username: 'QuizMaster', averageScore: 91, totalQuizzes: 143, totalPoints: 13013 },
  { id: '3', username: 'SoccerFan2024', averageScore: 89, totalQuizzes: 128, totalPoints: 11392 },
  { id: '4', username: 'ChampionsLeague', averageScore: 87, totalQuizzes: 134, totalPoints: 11658 },
  { id: '5', username: 'Ligue1Pro', averageScore: 85, totalQuizzes: 119, totalPoints: 10115 }
])

const categories = ref([
  { id: 'ligue1', name: 'Ligue 1', userScore: 72, userRank: 8 },
  { id: 'champions', name: 'Champions', userScore: 68, userRank: 12 },
  { id: 'world-cup', name: 'Mondial', userScore: 65, userRank: 18 },
  { id: 'premier', name: 'Premier L.', userScore: 70, userRank: 15 }
])

const weeklyLeaderboard = ref([
  { id: '1', username: 'WeeklyChamp', rank: 1, quizzesThisWeek: 15, weeklyScore: 1350 },
  { id: '2', username: 'SpeedRunner', rank: 2, quizzesThisWeek: 12, weeklyScore: 1080 },
  { id: '3', username: 'ConsistentPlayer', rank: 3, quizzesThisWeek: 10, weeklyScore: 950 },
  { id: '4', username: 'RisingStart', rank: 4, quizzesThisWeek: 8, weeklyScore: 720 }
])
</script>
