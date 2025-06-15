/// <reference types="vite/client" />
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import QuizView from "@/views/QuizView.vue";
import RankingsView from "@/views/RankingsView.vue";
import StatsView from "@/views/StatsView.vue";
import ProfileView from "@/views/ProfileView.vue";
import QuizClassicView from "@/views/QuizClassicView.vue";
import QuizRankingView from "@/views/QuizRankingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/quiz",
      name: "quiz",
      component: QuizView,
    },
    {
      path: "/quiz/classic/:category?",
      name: "quiz-classic",
      component: QuizClassicView,
    },
    {
      path: "/quiz/ranking/:category?",
      name: "quiz-ranking",
      component: QuizRankingView,
    },
    {
      path: "/rankings",
      name: "rankings",
      component: RankingsView,
    },
    {
      path: "/stats",
      name: "stats",
      component: StatsView,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
    },
  ],
});

export default router;
