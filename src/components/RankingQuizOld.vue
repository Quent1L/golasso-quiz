<template>
  <div class="card">    <!-- En-tête du quiz -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-primary mb-2">
        {{ question.title }}
      </h2>
      <p class="text-secondary text-sm mb-4">{{ question.description }}</p>
      
      <!-- Aide pour les indices -->
      <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
        <div class="flex items-start space-x-2">
          <svg class="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="text-xs text-blue-700 dark:text-blue-300">
            <p class="font-medium mb-1">💡 Système d'indices progressifs :</p>
            <p>• 1er essai : Indices de base (lettres, première lettre)</p>
            <p>• 2e essai : Localisation (ville, stade)</p>
            <p>• 3e essai : Palmarès et surnom</p>
            <p>• Plus d'essais = plus d'indices mais moins de points !</p>
          </div>
        </div>
      </div>
      
      <div class="flex items-center justify-between text-sm text-secondary">
        <span class="px-2 py-1 bg-accent rounded text-xs">{{ question.category }}</span>
        <span v-if="question.season" class="px-2 py-1 bg-accent rounded text-xs">{{ question.season }}</span>
        <span class="font-medium">Score: {{ score }} pts</span>
      </div>
    </div>

    <!-- Liste des positions -->
    <div class="space-y-4">
      <div 
        v-for="item in question.correctOrder" 
        :key="item.id"
        class="ranking-item"
      >
        <!-- Position et input -->
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center font-bold text-primary">
            {{ getPositionLabel(item.position) }}
          </div>
          
          <div class="flex-1">
            <input
              v-model="userAnswers[item.position - 1]"
              :disabled="isAnswerCorrect(item.position) || showResults"
              @input="validateAnswer(item.position)"
              @keyup.enter="submitAnswer(item.position)"
              type="text"
              :placeholder="`${getPositionLabel(item.position)} place...`"
              class="ranking-input w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 font-medium"
              :class="getInputClass(item.position)"
            >
          </div>

          <!-- Bouton indice -->
          <button
            v-if="question.hints && !isAnswerCorrect(item.position) && !showResults"
            @click="showHint(item.position)"
            class="btn-secondary px-3 py-2 text-sm"
            :disabled="hintUsed[item.position - 1]"
          >
            {{ hintUsed[item.position - 1] ? '💡' : 'Indice' }}
          </button>

          <!-- Statut -->
          <div class="flex-shrink-0 w-8">
            <CheckCircleIcon 
              v-if="isAnswerCorrect(item.position)" 
              class="w-6 h-6 text-green-500"
            />
            <XCircleIcon 
              v-else-if="attempts[item.position - 1] >= (question.maxAttempts || 3) && !showResults"
              class="w-6 h-6 text-red-500"
            />
          </div>
        </div>        <!-- Indices -->
        <div v-if="hintUsed[item.position - 1] && item.hints" class="mt-2 ml-16">
          <div class="text-sm text-secondary space-y-2">
            <!-- Indice niveau 1 : basique -->
            <div class="flex items-center space-x-2">
              <span class="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                📝 {{ item.hints.letterCount }} lettres
              </span>
              <span v-if="item.hints.firstLetter" class="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                🔤 Commence par "{{ item.hints.firstLetter }}"
              </span>
            </div>
            
            <!-- Indice niveau 2 : géographique -->
            <div v-if="attempts[item.position - 1] >= 1" class="flex items-center space-x-2">
              <span v-if="item.hints.city" class="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                �️ {{ item.hints.city }}
              </span>
              <span v-if="item.hints.stadium" class="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded">
                🏟️ {{ item.hints.stadium }}
              </span>
            </div>
            
            <!-- Indice niveau 3 : historique -->
            <div v-if="attempts[item.position - 1] >= 2" class="flex items-center space-x-2">
              <span v-if="item.hints.titles" class="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded">
                🏆 {{ item.hints.titles }}
              </span>
              <span v-if="item.hints.nickname" class="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded">
                🎭 {{ item.hints.nickname }}
              </span>
            </div>
            
            <!-- Indice niveau 4 : fait historique (dernier recours) -->
            <div v-if="attempts[item.position - 1] >= 3 && item.hints.historicalFact" class="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded">
              💡 {{ item.hints.historicalFact }}
            </div>
          </div>
        </div>

        <!-- Réponse correcte (révélée) -->
        <div v-if="attempts[item.position - 1] >= (question.maxAttempts || 3) && !isAnswerCorrect(item.position)" class="mt-2 ml-16">
          <div class="text-sm">
            <span class="text-red-600 dark:text-red-400 font-medium">
              Réponse correcte: {{ item.name }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Boutons d'action -->
    <div v-if="!showResults" class="mt-8 flex space-x-4">
      <button
        @click="validateAll"
        :disabled="!hasUserInputs"
        class="btn-primary flex-1 py-3 font-semibold"
      >
        Valider tout
      </button>
      
      <button
        @click="revealAll"
        class="btn-secondary flex-1 py-3 font-semibold"
      >
        Révéler les réponses
      </button>
    </div>

    <!-- Résultats finaux -->
    <div v-if="showResults" class="mt-8 p-4 bg-accent rounded-lg">
      <h3 class="font-semibold text-primary mb-2">🏆 Résultats</h3>
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span class="text-secondary">Bonnes réponses:</span>
          <span class="font-bold text-green-600 ml-2">{{ correctCount }}/{{ question.correctOrder.length }}</span>
        </div>
        <div>
          <span class="text-secondary">Score final:</span>
          <span class="font-bold text-primary ml-2">{{ score }} pts</span>
        </div>
        <div>
          <span class="text-secondary">Temps:</span>
          <span class="font-bold text-primary ml-2">{{ timeSpent }}s</span>
        </div>
        <div>
          <span class="text-secondary">Indices utilisés:</span>
          <span class="font-bold text-orange-600 ml-2">{{ hintsUsedCount }}</span>
        </div>
      </div>
      
      <div class="mt-4 flex space-x-3">
        <button @click="restart" class="btn-secondary flex-1 py-2">
          Recommencer
        </button>
        <button @click="$emit('next')" class="btn-primary flex-1 py-2">
          Quiz suivant
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid'
import type { RankingQuestion } from '@/types'

interface Props {
  question: RankingQuestion
}

const props = defineProps<Props>()

const emit = defineEmits<{
  completed: [score: number, timeSpent: number]
  next: []
}>()

// État du quiz
const userAnswers = ref<string[]>(new Array(props.question.correctOrder.length).fill(''))
const attempts = ref<number[]>(new Array(props.question.correctOrder.length).fill(0))
const hintUsed = ref<boolean[]>(new Array(props.question.correctOrder.length).fill(false))
const correctAnswers = ref<boolean[]>(new Array(props.question.correctOrder.length).fill(false))
const showResults = ref(false)
const startTime = ref<Date>(new Date())
const score = ref(0)

// Computed
const hasUserInputs = computed(() => {
  return userAnswers.value.some(answer => answer.trim().length > 0)
})

const correctCount = computed(() => {
  return correctAnswers.value.filter(Boolean).length
})

const hintsUsedCount = computed(() => {
  return hintUsed.value.filter(Boolean).length
})

const timeSpent = computed(() => {
  if (!showResults.value) return 0
  return Math.round((Date.now() - startTime.value.getTime()) / 1000)
})

// Méthodes
const getPositionLabel = (position: number): string => {
  if (position === 1) return '1er'
  return `${position}e`
}

const normalizeString = (str: string): string => {
  return str.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
}

const isAnswerCorrect = (position: number): boolean => {
  return correctAnswers.value[position - 1]
}

const validateAnswer = (position: number) => {
  const userInput = userAnswers.value[position - 1].trim()
  if (!userInput) return

  const correctItem = props.question.correctOrder.find(item => item.position === position)
  if (!correctItem) return

  const normalizedUser = normalizeString(userInput)
  const normalizedCorrect = normalizeString(correctItem.name)

  if (normalizedUser === normalizedCorrect || normalizedCorrect.includes(normalizedUser)) {
    correctAnswers.value[position - 1] = true
    userAnswers.value[position - 1] = correctItem.name // Remplace par la bonne orthographe
    calculateScore()
  } else {
    attempts.value[position - 1]++
  }
}

const submitAnswer = (position: number) => {
  validateAnswer(position)
}

const showHint = (position: number) => {
  hintUsed.value[position - 1] = true
}

const validateAll = () => {
  userAnswers.value.forEach((_, index) => {
    if (!correctAnswers.value[index]) {
      validateAnswer(index + 1)
    }
  })
}

const revealAll = () => {
  props.question.correctOrder.forEach((item, index) => {
    if (!correctAnswers.value[index]) {
      userAnswers.value[index] = item.name
      correctAnswers.value[index] = true
    }
  })
  completeQuiz()
}

const calculateScore = () => {
  let baseScore = 0
  correctAnswers.value.forEach((correct, index) => {
    if (correct) {
      let itemScore = 20 // Base score par bonne réponse
      
      // Malus pour les tentatives
      const attemptPenalty = Math.max(0, (attempts.value[index] - 1) * 5)
      itemScore = Math.max(5, itemScore - attemptPenalty)
      
      // Malus pour les indices
      if (hintUsed.value[index]) {
        itemScore = Math.max(5, itemScore - 5)
      }
      
      baseScore += itemScore
    }
  })
  
  score.value = baseScore
}

const completeQuiz = () => {
  showResults.value = true
  calculateScore()
  emit('completed', score.value, timeSpent.value)
}

const restart = () => {
  userAnswers.value = new Array(props.question.correctOrder.length).fill('')
  attempts.value = new Array(props.question.correctOrder.length).fill(0)
  hintUsed.value = new Array(props.question.correctOrder.length).fill(false)
  correctAnswers.value = new Array(props.question.correctOrder.length).fill(false)
  showResults.value = false
  startTime.value = new Date()
  score.value = 0
}

const getInputClass = (position: number): string => {
  const index = position - 1
  
  if (showResults.value || correctAnswers.value[index]) {
    return '!border-green-400 !bg-green-50 !text-green-900 dark:!border-green-500 dark:!bg-green-900/20 dark:!text-green-300'
  }
  
  if (attempts.value[index] >= (props.question.maxAttempts || 3)) {
    return '!border-red-400 !bg-red-50 !text-red-900 dark:!border-red-500 dark:!bg-red-900/20 dark:!text-red-300'
  }
  
  if (attempts.value[index] > 0) {
    return '!border-orange-400 !bg-orange-50 !text-orange-900 dark:!border-orange-500 dark:!bg-orange-900/20 dark:!text-orange-300'
  }
  
  return '!border-gray-300 hover:!border-blue-300 !bg-white !text-gray-900 dark:!border-gray-600 dark:hover:!border-gray-500 dark:!bg-gray-800 dark:!text-gray-100'
}

// Auto-completion du quiz quand tout est trouvé
const checkCompletion = () => {
  if (correctAnswers.value.every(Boolean)) {
    setTimeout(() => {
      completeQuiz()
    }, 500)
  }
}

// Watcher pour vérifier la completion
computed(() => {
  checkCompletion()
  return correctAnswers.value
})

onMounted(() => {
  startTime.value = new Date()
})
</script>

<style scoped>
.ranking-item {
  transition: all 0.2s;
}

.ranking-input:focus {
  box-shadow: 0 0 0 2px #3b82f6;
  border-color: transparent;
}

.ranking-input:disabled {
  cursor: not-allowed;
  opacity: 0.75;
}
</style>
