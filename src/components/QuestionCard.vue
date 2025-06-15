<template>
  <div class="card">
    <!-- Question -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-primary mb-2">
        {{ question.question }}
      </h2>
      <div class="flex items-center space-x-2 text-sm text-secondary">
        <span class="px-2 py-1 bg-accent rounded text-xs">{{
          question.category
        }}</span>
        <span class="px-2 py-1 rounded text-xs" :class="difficultyClass">
          {{ difficultyLabel }}
        </span>
      </div>
    </div>
    <!-- Réponses -->
    <div class="space-y-3">
      <button
        v-for="(answer, index) in question.answers"
        :key="index"
        @click="selectAnswer(index)"
        :disabled="showResult"
        class="answer-button w-full p-4 text-left rounded-xl border-2 transition-all duration-200 font-medium"
        :class="getAnswerClass(index)"
      >
        <div class="flex items-center justify-between">
          <span class="font-medium">{{ answer }}</span>
          <div v-if="showResult" class="flex-shrink-0 ml-2">
            <CheckCircleIcon
              v-if="index === question.correctAnswer"
              class="w-5 h-5 text-green-500"
            />
            <XCircleIcon
              v-else-if="
                selectedAnswer === index && index !== question.correctAnswer
              "
              class="w-5 h-5 text-red-500"
            />
          </div>
        </div>
      </button>
    </div>    <!-- Explication -->
    <div
      v-if="showResult && question.explanation"
      class="mt-6 p-4 rounded-lg border"
      :class="[
        'bg-blue-50 border-blue-200 text-gray-800',
        'dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200'
      ]"
    >
      <h3 class="font-semibold mb-2" :class="[
        'text-gray-900',
        'dark:text-gray-100'
      ]">
        💡 Explication
      </h3>
      <p class="text-sm leading-relaxed" :class="[
        'text-gray-800',
        'dark:text-gray-200'
      ]">{{ question.explanation }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/vue/24/solid";
import type { Question } from "@/types";

interface Props {
  question: Question;
  selectedAnswer: number | null;
  showResult: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  answerSelected: [index: number];
}>();

const difficultyClass = computed(() => {
  switch (props.question.difficulty) {
    case "easy":
      return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
    case "medium":
      return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300";
    case "hard":
      return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
    default:
      return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
  }
});

const difficultyLabel = computed(() => {
  switch (props.question.difficulty) {
    case "easy":
      return "Facile";
    case "medium":
      return "Moyen";
    case "hard":
      return "Difficile";
    default:
      return "Normal";
  }
});

const getAnswerClass = (index: number) => {
  if (!props.showResult) {
    // Avant de montrer le résultat
    if (props.selectedAnswer === index) {
      return "!border-blue-500 !bg-blue-50 !text-blue-900 dark:!border-blue-400 dark:!bg-blue-900/30 dark:!text-blue-200";
    }
    return "!border-gray-300 hover:!border-blue-300 !bg-white !text-gray-900 dark:!border-gray-600 dark:hover:!border-gray-500 dark:!bg-gray-800 dark:!text-gray-100";
  }

  // Après avoir montré le résultat
  if (index === props.question.correctAnswer) {
    return "!border-green-500 !bg-green-100 !text-green-900 dark:!border-green-400 dark:!bg-green-900/30 dark:!text-green-200";
  }

  if (
    props.selectedAnswer === index &&
    index !== props.question.correctAnswer
  ) {
    return "!border-red-500 !bg-red-100 !text-red-900 dark:!border-red-400 dark:!bg-red-900/30 dark:!text-red-200";
  }

  return "!border-gray-200 !bg-gray-100 !text-gray-600 dark:!border-gray-600 dark:!bg-gray-700 dark:!text-gray-300";
};

const selectAnswer = (index: number) => {
  if (!props.showResult) {
    emit("answerSelected", index);
  }
};
</script>
