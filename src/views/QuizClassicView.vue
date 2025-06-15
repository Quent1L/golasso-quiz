<template>
  <div class="min-h-screen bg-background">
    <!-- Header avec progression -->
    <div class="bg-surface border-b border-border sticky top-0 z-40">
      <div class="px-6 py-4">
        <div class="flex items-center justify-between mb-3">
          <button @click="$router.back()" class="p-2 -ml-2 text-secondary">
            <ArrowLeftIcon class="w-5 h-5" />
          </button>
          <div class="text-center">
            <div class="text-sm text-secondary">Question {{ currentQuestionIndex + 1 }} / {{ questions.length }}</div>
            <div class="text-xs text-muted">{{ currentCategory }}</div>
          </div>
          <div class="text-sm font-semibold text-green-600">
            {{ score }} pts
          </div>
        </div>
        <!-- Barre de progression -->
        <div class="w-full bg-border rounded-full h-2">
          <div 
            class="bg-accent h-2 rounded-full transition-all duration-300"
            :style="{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Quiz terminé -->
    <div v-if="quizCompleted" class="px-6 py-8">
      <QuizResults 
        :score="score"
        :totalQuestions="questions.length"
        :correctAnswers="correctAnswers"
        :timeSpent="timeSpent"
        @restart="restartQuiz"
        @home="$router.push('/')"
      />
    </div>

    <!-- Question actuelle -->
    <div v-else-if="currentQuestion" class="px-6 py-8">      <QuestionCard
        :question="currentQuestion"
        :selectedAnswer="selectedAnswer"
        :showResult="showResult"
        @answer-selected="handleAnswerSelected"
      />

      <!-- Timer -->
      <div v-if="timeLimit && timeRemaining > 0" class="mt-6">
        <div class="flex items-center justify-center space-x-2 text-sm text-secondary">
          <ClockIcon class="w-4 h-4" />
          <span>{{ timeRemaining }}s</span>
        </div>
        <div class="w-full bg-border rounded-full h-1 mt-2">
          <div 
            class="bg-orange-500 h-1 rounded-full transition-all duration-1000"
            :style="{ width: `${(timeRemaining / TIME_LIMIT) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Bouton suivant -->
      <div class="mt-8">
        <button
          v-if="showResult"
          @click="nextQuestion"
          class="w-full btn-primary py-3 font-semibold"
        >
          {{ currentQuestionIndex + 1 < questions.length ? 'Question suivante' : 'Voir les résultats' }}
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-else class="flex items-center justify-center min-h-[50vh]">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p class="text-secondary">Chargement du quiz...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeftIcon, ClockIcon } from '@heroicons/vue/24/outline'
import QuestionCard from '@/components/QuestionCard.vue'
import QuizResults from '@/components/QuizResults.vue'
import { getQuestionsByCategory, getRandomQuestions } from '@/data/questions'
import type { Question } from '@/types'

const route = useRoute()

const questions = ref<Question[]>([])
const currentQuestionIndex = ref(0)
const selectedAnswer = ref<number | null>(null)
const showResult = ref(false)
const score = ref(0)
const correctAnswers = ref(0)
const startTime = ref<Date>(new Date())
const timeRemaining = ref(30)
const timeLimit = ref(true)
const quizCompleted = ref(false)

const TIME_LIMIT = 30

let timer: NodeJS.Timeout | null = null

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
const currentCategory = computed(() => {
  const category = route.params.category as string
  return category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Quiz'
})

const timeSpent = computed(() => {
  if (!quizCompleted.value) return 0
  return Math.round((Date.now() - startTime.value.getTime()) / 1000)
})

const loadQuestions = () => {
  const category = route.params.category as string
  
  if (category && category !== 'all') {
    questions.value = getQuestionsByCategory(category)
  } else {
    questions.value = getRandomQuestions(10)
  }
  
  // Mélanger les questions
  questions.value = questions.value.sort(() => 0.5 - Math.random()).slice(0, 10)
  
  if (questions.value.length === 0) {
    questions.value = getRandomQuestions(10)
  }
}

const startTimer = () => {
  if (!timeLimit.value) return
  
  timeRemaining.value = TIME_LIMIT
  timer = setInterval(() => {
    timeRemaining.value--
    if (timeRemaining.value <= 0) {
      handleTimeUp()
    }
  }, 1000)
}

const stopTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const handleAnswerSelected = (answerIndex: number) => {
  if (showResult.value) return
  
  selectedAnswer.value = answerIndex
  stopTimer()
  
  const isCorrect = answerIndex === currentQuestion.value?.correctAnswer
  if (isCorrect) {
    correctAnswers.value++
    score.value += 10
  }
  
  showResult.value = true
}

const handleTimeUp = () => {
  if (showResult.value) return
  
  selectedAnswer.value = null
  showResult.value = true
}

const nextQuestion = () => {
  if (currentQuestionIndex.value + 1 < questions.value.length) {
    currentQuestionIndex.value++
    selectedAnswer.value = null
    showResult.value = false
    startTimer()
  } else {
    completeQuiz()
  }
}

const completeQuiz = () => {
  quizCompleted.value = true
  stopTimer()
}

const restartQuiz = () => {
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  showResult.value = false
  score.value = 0
  correctAnswers.value = 0
  quizCompleted.value = false
  startTime.value = new Date()
  loadQuestions()
  startTimer()
}

onMounted(() => {
  loadQuestions()
  startTimer()
})

onUnmounted(() => {
  stopTimer()
})
</script>
