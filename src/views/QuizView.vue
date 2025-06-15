<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <div class="bg-surface border-b border-border">
      <div class="px-6 py-4">
        <h1 class="text-2xl font-bold text-primary">Quiz Football</h1>
        <p class="text-secondary">Choisissez votre type de quiz</p>
      </div>
    </div>

    <div class="px-6 py-8 space-y-6">
      <!-- Quiz Types -->
      <div class="space-y-4">
        <div class="card hover:shadow-md transition-shadow cursor-pointer" @click="selectQuizType('classic')">
          <div class="flex items-start space-x-4">
            <div class="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-primary">Quiz Classique (QCM)</h3>
              <p class="text-secondary text-sm mt-1">Questions à choix multiples sur le football</p>
              <div class="flex items-center space-x-4 mt-3 text-sm text-secondary">
                <span>🎯 3-5 réponses</span>
                <span>⏱️ Temps limité</span>
                <span>📊 Score sur 100</span>
              </div>
            </div>
            <ChevronRightIcon class="w-5 h-5 text-secondary" />
          </div>
        </div>

        <div class="card hover:shadow-md transition-shadow cursor-pointer" @click="selectQuizType('ranking')">
          <div class="flex items-start space-x-4">
            <div class="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg">
              <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>            <div class="flex-1">
              <h3 class="text-lg font-semibold text-primary">Quiz Classement</h3>
              <p class="text-secondary text-sm mt-1">Reconstituez des classements et palmarès</p>
              <div class="flex items-center space-x-4 mt-3 text-sm text-secondary">
                <span>📝 Saisie libre</span>
                <span>💡 Indices disponibles</span>
                <span>🏆 Classements réels</span>
              </div>
            </div>
            <ChevronRightIcon class="w-5 h-5 text-secondary" />
          </div>
        </div>
      </div>

      <!-- Categories -->
      <div>
        <h2 class="text-lg font-semibold text-primary mb-4">Catégories populaires</h2>
        <div class="grid grid-cols-2 gap-3">
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="bg-surface rounded-lg border border-border p-4 text-center hover:border-green-500 transition-colors cursor-pointer"
            @click="selectCategory(category.id)"
          >
            <div class="text-2xl mb-2">{{ category.emoji }}</div>
            <div class="font-medium text-primary text-sm">{{ category.name }}</div>
            <div class="text-xs text-secondary mt-1">{{ category.questionCount }} questions</div>
          </div>
        </div>
      </div>

      <!-- Quick Start -->
      <div class="pt-4">
        <button 
          @click="startRandomQuiz"
          class="w-full btn-primary py-4 font-semibold"
        >
          🎲 Quiz aléatoire
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronRightIcon } from '@heroicons/vue/24/outline'

const router = useRouter()

const selectedQuizType = ref<'classic' | 'ranking' | null>(null)

const categories = ref([
  { id: 'ligue1', name: 'Ligue 1', emoji: '🇫🇷', questionCount: 150 },
  { id: 'premier-league', name: 'Premier League', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', questionCount: 120 },
  { id: 'champions-league', name: 'Champions League', emoji: '🏆', questionCount: 85 },
  { id: 'world-cup', name: 'Coupe du Monde', emoji: '🌍', questionCount: 95 },
  { id: 'la-liga', name: 'La Liga', emoji: '🇪🇸', questionCount: 110 },
  { id: 'serie-a', name: 'Serie A', emoji: '🇮🇹', questionCount: 90 }
])

const selectQuizType = (type: 'classic' | 'ranking') => {
  selectedQuizType.value = type
  // Rediriger vers la sélection de catégorie ou démarrer directement
  router.push(`/quiz/${type}`)
}

const selectCategory = (categoryId: string) => {
  if (selectedQuizType.value) {
    router.push(`/quiz/${selectedQuizType.value}/${categoryId}`)
  } else {
    // Si aucun type sélectionné, démarrer un quiz classique par défaut
    router.push(`/quiz/classic/${categoryId}`)
  }
}

const startRandomQuiz = () => {
  const randomCategory = categories.value[Math.floor(Math.random() * categories.value.length)]
  const randomType = Math.random() > 0.5 ? 'classic' : 'ranking'
  router.push(`/quiz/${randomType}/${randomCategory.id}`)
}
</script>
