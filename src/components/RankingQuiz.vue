<template>
  <div class="card">
    <!-- En-tête du quiz -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-primary mb-2">
        {{ question.title }}
      </h2>
      <p class="text-secondary text-sm mb-4">{{ question.description }}</p>

      <!-- Aide pour les indices -->
      <div
        class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4"
      >
        <div class="flex items-start space-x-2">
          <svg
            class="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div class="text-xs text-blue-700 dark:text-blue-300">
            <p class="font-medium mb-1">💡 Mode unique de saisie :</p>
            <p>• Saisissez une réponse dans le champ ci-dessous</p>
            <p>
              • Si c'est correct, elle se place automatiquement dans le
              classement
            </p>
            <p>• Plus d'erreurs = plus d'indices disponibles</p>
            <p>• Trouvez toutes les réponses pour terminer !</p>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between text-sm text-secondary">
        <span class="px-2 py-1 bg-accent rounded text-xs">{{
          question.category
        }}</span>
        <span
          v-if="question.season"
          class="px-2 py-1 bg-accent rounded text-xs"
          >{{ question.season }}</span
        >
        <span class="font-medium">Score: {{ score }} pts</span>
      </div>
    </div>

    <!-- Zone de saisie unique -->
    <div v-if="!isCompleted" class="mb-8">
      <div class="bg-surface border border-border rounded-lg p-4">
        <label
          for="answer-input"
          class="block text-sm font-medium text-primary mb-2"
        >
          Saisissez une réponse :
        </label>
        <div class="flex space-x-3">
          <input
            id="answer-input"
            v-model="currentInput"
            @keyup.enter="submitAnswer"
            :disabled="isCompleted"
            placeholder="Tapez le nom d'un club ou joueur..."
            class="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            @click="submitAnswer"
            :disabled="!currentInput.trim() || isCompleted"
            class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Valider
          </button>
        </div>

        <!-- Feedback sur la dernière tentative -->
        <div v-if="lastAttemptFeedback" class="mt-3">
          <div
            v-if="lastAttemptFeedback.type === 'success'"
            class="text-green-600 dark:text-green-400 text-sm flex items-center space-x-2"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4"
              />
            </svg>
            <span>{{ lastAttemptFeedback.message }}</span>
          </div>
          <div
            v-else-if="lastAttemptFeedback.type === 'error'"
            class="text-red-600 dark:text-red-400 text-sm flex items-center space-x-2"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span>{{ lastAttemptFeedback.message }}</span>
          </div>
          <div
            v-else
            class="text-blue-600 dark:text-blue-400 text-sm flex items-center space-x-2"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ lastAttemptFeedback.message }}</span>
          </div>
        </div>

        <!-- Statistiques -->
        <div class="mt-3 flex items-center space-x-4 text-xs text-secondary">
          <span>Tentatives: {{ totalAttempts }}</span>
          <span
            >Bonnes réponses: {{ correctAnswers }}/{{
              question.correctOrder.length
            }}</span
          >
          <span v-if="wrongAttempts > 0">Erreurs: {{ wrongAttempts }}</span>
        </div>
      </div>
    </div>

    <!-- Classement avec réponses trouvées -->
    <div class="space-y-3">
      <h3 class="text-lg font-medium text-primary mb-4">
        Classement ({{ correctAnswers }}/{{
          question.correctOrder.length
        }}
        trouvé{{ correctAnswers > 1 ? "s" : "" }})
      </h3>

      <div
        v-for="item in question.correctOrder"
        :key="item.id"
        class="ranking-item"
      >
        <!-- Position -->
        <div class="flex items-center space-x-4">
          <div
            class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold"
            :class="
              foundItems.includes(item.id)
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
            "
          >
            {{ getPositionLabel(item.position) }}
          </div>

          <div class="flex-1">
            <!-- Réponse trouvée -->
            <div
              v-if="foundItems.includes(item.id)"
              class="flex items-center space-x-3"
            >
              <span class="font-medium text-green-700 dark:text-green-300">{{
                item.name
              }}</span>
              <span v-if="item.value" class="text-sm text-secondary"
                >({{ item.value }})</span
              >
              <svg
                class="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4"
                />
              </svg>
            </div>

            <!-- Position vide -->
            <div v-else class="flex items-center justify-between">
              <span class="text-gray-400 dark:text-gray-500 italic"
                >Position à découvrir...</span
              >

              <!-- Bouton d'indices -->
              <button
                v-if="question.hints && !foundItems.includes(item.id)"
                @click="toggleHint(item.id)"
                class="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                {{
                  hintsRevealed.includes(item.id)
                    ? "Masquer indices"
                    : "Voir indices"
                }}
              </button>
            </div>
          </div>
        </div>

        <!-- Indices -->
        <div
          v-if="
            hintsRevealed.includes(item.id) &&
            item.hints &&
            !foundItems.includes(item.id)
          "
          class="mt-3 ml-16"
        >
          <div class="text-sm text-secondary space-y-2">
            <!-- Indices de base -->
            <div class="flex items-center space-x-2">
              <span
                class="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded"
              >
                📝 {{ item.hints.letterCount }} lettres
              </span>
              <span
                v-if="item.hints.firstLetter"
                class="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded"
              >
                🔤 Commence par "{{ item.hints.firstLetter }}"
              </span>
            </div>

            <!-- Indices géographiques -->
            <div v-if="wrongAttempts >= 3" class="flex items-center space-x-2">
              <span
                v-if="item.hints.city"
                class="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded"
              >
                🏙️ {{ item.hints.city }}
              </span>
              <span
                v-if="item.hints.stadium"
                class="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded"
              >
                🏟️ {{ item.hints.stadium }}
              </span>
            </div>

            <!-- Indices historiques -->
            <div v-if="wrongAttempts >= 5" class="flex items-center space-x-2">
              <span
                v-if="item.hints.titles"
                class="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded"
              >
                🏆 {{ item.hints.titles }}
              </span>
              <span
                v-if="item.hints.nickname"
                class="text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2 py-1 rounded"
              >
                🎭 {{ item.hints.nickname }}
              </span>
            </div>

            <!-- Fait historique -->
            <div
              v-if="wrongAttempts >= 8 && item.hints.historicalFact"
              class="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded"
            >
              💡 {{ item.hints.historicalFact }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Boutons d'action -->
    <div v-if="!isCompleted" class="mt-8 flex space-x-4">
      <button
        @click="revealAll"
        class="btn-secondary flex-1 py-3 font-semibold"
      >
        Révéler toutes les réponses
      </button>
    </div>

    <!-- Résultats finaux -->
    <div v-if="isCompleted" class="mt-8 p-4 bg-accent rounded-lg">
      <h3 class="font-semibold text-primary mb-2">🏆 Quiz terminé !</h3>
      <div class="space-y-2 text-sm text-secondary">
        <div class="flex justify-between">
          <span>Score final:</span>
          <span class="font-medium text-primary">{{ score }} points</span>
        </div>
        <div class="flex justify-between">
          <span>Total des tentatives:</span>
          <span class="font-medium">{{ totalAttempts }}</span>
        </div>
        <div class="flex justify-between">
          <span>Taux de réussite:</span>
          <span class="font-medium text-green-600"
            >{{ Math.round((correctAnswers / totalAttempts) * 100) }}%</span
          >
        </div>
        <div class="flex justify-between">
          <span>Performance:</span>
          <span class="font-medium">{{ getPerformanceText() }}</span>
        </div>
      </div>

      <div class="mt-4 flex space-x-3">
        <button
          @click="$emit('quiz-restart')"
          class="btn-primary flex-1 py-2 font-medium"
        >
          Recommencer
        </button>
        <button
          @click="
            $emit('quiz-completed', {
              score,
              attempts: totalAttempts,
              perfect: isPerfectScore,
            })
          "
          class="btn-secondary flex-1 py-2 font-medium"
        >
          Terminer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from "vue";
import type { RankingQuestion } from "@/types";

interface Props {
  question: RankingQuestion;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "quiz-completed": [
    result: { score: number; attempts: number; perfect: boolean }
  ];
  "quiz-restart": [];
}>();

// État du quiz
const currentInput = ref("");
const foundItems = ref<string[]>([]);
const hintsRevealed = ref<string[]>([]);
const totalAttempts = ref(0);
const wrongAttempts = ref(0);
const lastAttemptFeedback = ref<{
  type: "success" | "error" | "info";
  message: string;
} | null>(null);

// Computed
const correctAnswers = computed(() => foundItems.value.length);
const isCompleted = computed(
  () => correctAnswers.value === props.question.correctOrder.length
);

const score = computed(() => {
  const baseScore = correctAnswers.value * 100;
  const penalty = Math.max(0, wrongAttempts.value - correctAnswers.value) * 10;
  return Math.max(0, baseScore - penalty);
});

const isPerfectScore = computed(
  () => wrongAttempts.value === 0 && isCompleted.value
);

// Méthodes
const submitAnswer = () => {
  if (!currentInput.value.trim()) return;

  totalAttempts.value++;
  const input = currentInput.value.trim().toLowerCase();

  // Chercher une correspondance
  const foundItem = props.question.correctOrder.find((item) => {
    const itemName = item.name.toLowerCase();
    // Correspondance exacte ou partielle (au moins 70% des caractères)
    return (
      itemName === input ||
      itemName.includes(input) ||
      input.includes(itemName) ||
      similarity(itemName, input) > 0.7
    );
  });

  if (foundItem && !foundItems.value.includes(foundItem.id)) {
    // Bonne réponse !
    foundItems.value.push(foundItem.id);
    lastAttemptFeedback.value = {
      type: "success",
      message: `Excellent ! "${foundItem.name}" est bien en ${getPositionLabel(
        foundItem.position
      )} position.`,
    };
    currentInput.value = "";

    // Vérifier si le quiz est terminé
    if (isCompleted.value) {
      setTimeout(() => {
        emit("quiz-completed", {
          score: score.value,
          attempts: totalAttempts.value,
          perfect: isPerfectScore.value,
        });
      }, 1500);
    }
  } else if (foundItem && foundItems.value.includes(foundItem.id)) {
    // Réponse déjà trouvée
    lastAttemptFeedback.value = {
      type: "info",
      message: `"${foundItem.name}" a déjà été trouvé !`,
    };
  } else {
    // Mauvaise réponse
    wrongAttempts.value++;
    lastAttemptFeedback.value = {
      type: "error",
      message: `"${currentInput.value}" n'est pas dans ce classement. Essayez autre chose !`,
    };
  }

  // Effacer le feedback après 3 secondes
  setTimeout(() => {
    lastAttemptFeedback.value = null;
  }, 3000);

  if (!foundItem || foundItems.value.includes(foundItem.id)) {
    currentInput.value = "";
  }
};

const toggleHint = (itemId: string) => {
  const index = hintsRevealed.value.indexOf(itemId);
  if (index > -1) {
    hintsRevealed.value.splice(index, 1);
  } else {
    hintsRevealed.value.push(itemId);
  }
};

const revealAll = () => {
  foundItems.value = props.question.correctOrder.map((item) => item.id);
  lastAttemptFeedback.value = {
    type: "info",
    message: "Toutes les réponses ont été révélées !",
  };
};

const getPositionLabel = (position: number) => {
  const suffixes = ["", "er", "e", "e", "e", "e"];
  return `${position}${suffixes[position] || "e"}`;
};

const getPerformanceText = () => {
  const ratio = correctAnswers.value / totalAttempts.value;
  if (ratio === 1) return "🏆 Parfait !";
  if (ratio >= 0.8) return "🥇 Excellent";
  if (ratio >= 0.6) return "🥈 Très bien";
  if (ratio >= 0.4) return "🥉 Bien";
  return "📚 À améliorer";
};

// Fonction de similarité simple
const similarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 1.0;

  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
};

const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
};
</script>

<style scoped>
.ranking-item {
  padding: 1rem;
  background-color: var(--surface);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  transition: all 0.2s;
}

.ranking-item:hover {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.btn-primary {
  background-color: var(--primary-500);
  color: white;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: var(--primary-600);
}

.btn-secondary {
  background-color: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-primary);
  border-radius: 0.5rem;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background-color: var(--accent);
}
</style>
