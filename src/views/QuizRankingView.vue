<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <div class="bg-surface border-b border-border">
      <div class="px-4 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-primary">Quiz Classement</h1>
          <p class="text-sm text-secondary">Reconstituez l'ordre correct</p>
        </div>
        <button
          @click="goBack"
          class="p-2 rounded-lg bg-background border border-border text-secondary hover:text-primary hover:bg-surface transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <div class="px-4 py-4">
      <!-- Quiz Selection -->
      <div v-if="!selectedQuiz" class="space-y-4">
        <h2 class="text-lg font-semibold text-primary mb-4">Choisissez un quiz</h2>
        <div class="grid gap-3">
          <button
            v-for="quiz in availableQuizzes"
            :key="quiz.id"
            @click="startQuiz(quiz)"
            class="p-4 bg-surface border border-border rounded-lg text-left hover:bg-primary hover:text-surface transition-colors"
          >
            <h3 class="font-semibold text-primary">{{ quiz.title }}</h3>
            <p class="text-sm text-secondary mt-1">{{ quiz.description }}</p>
            <div class="flex items-center gap-2 mt-2 text-xs text-secondary">
              <span class="px-2 py-1 bg-background rounded">{{ quiz.category }}</span>
              <span class="px-2 py-1 bg-background rounded">{{ quiz.season }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Quiz Component -->
      <div v-else>
        <RankingQuiz
          :question="selectedQuiz"
          @quiz-completed="onQuizCompleted"
          @quiz-restart="onQuizRestart"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import RankingQuiz from '@/components/RankingQuiz.vue'
import { rankingQuestions } from '@/data/rankings'
import type { RankingQuestion } from '@/types'

const router = useRouter()
const route = useRoute()
const selectedQuiz = ref<RankingQuestion | null>(null)
const availableQuizzes = ref<RankingQuestion[]>([])

const loadQuizzes = () => {
  const category = route.params.category as string
  
  if (category) {
    // Filtrer par catégorie si spécifiée
    availableQuizzes.value = rankingQuestions.filter(q => 
      q.category.toLowerCase().includes(category.toLowerCase()) ||
      category === 'random'
    )
    
    // Si c'est un quiz aléatoire ou une seule question disponible, la sélectionner automatiquement
    if (category === 'random' || availableQuizzes.value.length === 1) {
      const randomQuiz = availableQuizzes.value[Math.floor(Math.random() * availableQuizzes.value.length)]
      selectedQuiz.value = randomQuiz
    }
  } else {
    // Afficher tous les quiz disponibles
    availableQuizzes.value = rankingQuestions
  }
}

// Observer les changements de route pour gérer les catégories
watch(() => route.params.category, () => {
  loadQuizzes()
}, { immediate: true })

const startQuiz = (quiz: RankingQuestion) => {
  selectedQuiz.value = quiz
}

const onQuizCompleted = (result: { score: number; attempts: number; perfect: boolean }) => {
  console.log('Quiz completed:', result)
  // Ici on pourrait sauvegarder le résultat dans le store ou localStorage
  // Pour l'instant on reste sur le résultat affiché par le composant
}

const onQuizRestart = () => {
  // Reset pour recommencer le même quiz
  selectedQuiz.value = { ...selectedQuiz.value! }
}

const goBack = () => {
  if (selectedQuiz.value) {
    selectedQuiz.value = null
    // Si on était dans une catégorie spécifique, revenir à la sélection
    if (route.params.category) {
      router.push('/quiz/ranking')
    }
  } else {
    router.push('/quiz')
  }
}
</script>
