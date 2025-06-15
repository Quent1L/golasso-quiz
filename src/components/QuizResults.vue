<template>
  <div class="text-center">
    <!-- Score principal -->
    <div class="mb-8">
      <div class="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center" :class="scoreColorClass">
        <span class="text-2xl">{{ scoreEmoji }}</span>
      </div>
      <h2 class="text-3xl font-bold text-gray-900 mb-2">
        {{ scorePercentage }}%
      </h2>
      <p class="text-gray-600">
        {{ scoreMessage }}
      </p>
    </div>

    <!-- Statistiques détaillées -->
    <div class="bg-white rounded-xl p-6 mb-8">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Résultats détaillés</h3>
      <div class="grid grid-cols-3 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">{{ correctAnswers }}</div>
          <div class="text-sm text-gray-500">Correctes</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-red-600">{{ wrongAnswers }}</div>
          <div class="text-sm text-gray-500">Incorrectes</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600">{{ timeSpent }}s</div>
          <div class="text-sm text-gray-500">Temps total</div>
        </div>
      </div>
    </div>

    <!-- Performance -->
    <div class="bg-gradient-to-r from-primary-50 to-emerald-50 rounded-xl p-6 mb-8">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">Performance</h3>
      <div class="space-y-2">        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Précision</span>
          <span class="font-semibold text-green-600">{{ scorePercentage }}%</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Temps moyen par question</span>
          <span class="font-semibold text-green-600">{{ avgTimePerQuestion }}s</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600">Points obtenus</span>
          <span class="font-semibold text-green-600">{{ score }} / {{ maxScore }}</span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="space-y-3">
      <button
        @click="$emit('restart')"
        class="w-full bg-primary-500 hover:bg-primary-600 text-white rounded-xl py-3 font-semibold transition-colors"
      >
        🔄 Recommencer
      </button>
      
      <div class="grid grid-cols-2 gap-3">
        <button
          @click="$emit('home')"
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg py-3 font-medium transition-colors"
        >
          🏠 Accueil
        </button>
        <button
          @click="shareResults"
          class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-3 font-medium transition-colors"
        >
          📱 Partager
        </button>
      </div>
    </div>

    <!-- Badge de performance -->
    <div v-if="performanceBadge" class="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
      <div class="text-2xl mb-2">{{ performanceBadge.emoji }}</div>
      <div class="font-semibold text-yellow-800">{{ performanceBadge.title }}</div>
      <div class="text-sm text-yellow-700">{{ performanceBadge.description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
}

const props = defineProps<Props>()

defineEmits<{
  restart: []
  home: []
}>()

const scorePercentage = computed(() => {
  return Math.round((props.correctAnswers / props.totalQuestions) * 100)
})

const wrongAnswers = computed(() => {
  return props.totalQuestions - props.correctAnswers
})

const maxScore = computed(() => {
  return props.totalQuestions * 10
})

const avgTimePerQuestion = computed(() => {
  return Math.round(props.timeSpent / props.totalQuestions)
})

const scoreColorClass = computed(() => {
  const percentage = scorePercentage.value
  if (percentage >= 80) return 'bg-green-100 text-green-600'
  if (percentage >= 60) return 'bg-yellow-100 text-yellow-600'
  return 'bg-red-100 text-red-600'
})

const scoreEmoji = computed(() => {
  const percentage = scorePercentage.value
  if (percentage >= 90) return '🏆'
  if (percentage >= 80) return '🥉'
  if (percentage >= 70) return '👏'
  if (percentage >= 60) return '👍'
  return '💪'
})

const scoreMessage = computed(() => {
  const percentage = scorePercentage.value
  if (percentage >= 90) return 'Excellent ! Vous êtes un expert !'
  if (percentage >= 80) return 'Très bien ! Belle performance !'
  if (percentage >= 70) return 'Bien joué ! Bon niveau !'
  if (percentage >= 60) return 'Pas mal ! Continuez comme ça !'
  if (percentage >= 50) return 'Peut mieux faire ! Encore un effort !'
  return 'Il faut réviser ! Ne lâchez rien !'
})

const performanceBadge = computed(() => {
  const percentage = scorePercentage.value
  const time = avgTimePerQuestion.value
  
  if (percentage === 100) {
    return {
      emoji: '🎯',
      title: 'Quiz Parfait !',
      description: 'Toutes les réponses correctes !'
    }
  }
  
  if (percentage >= 90 && time <= 15) {
    return {
      emoji: '⚡',
      title: 'Expert Rapide',
      description: 'Excellent score en un temps record !'
    }
  }
  
  if (percentage >= 80) {
    return {
      emoji: '🧠',
      title: 'Connaisseur',
      description: 'Très bonne maîtrise du football !'
    }
  }
  
  return null
})

const shareResults = () => {
  if (navigator.share) {
    navigator.share({
      title: 'Golasso - Quiz Football',
      text: `J'ai obtenu ${scorePercentage.value}% au quiz football Golasso ! 🏆`,
      url: window.location.origin
    })
  } else {
    // Fallback pour les navigateurs qui ne supportent pas Web Share API
    const text = `J'ai obtenu ${scorePercentage.value}% au quiz football Golasso ! 🏆 ${window.location.origin}`
    navigator.clipboard.writeText(text)
  }
}
</script>
