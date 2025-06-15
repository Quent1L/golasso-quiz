# ⚽ Golasso

Une application de quiz football moderne et interactive, construite avec Vue.js 3, Vite et TailwindCSS.

![Golasso Logo](golasso.png)

## 🎯 À propos

**Golasso** est une application mobile-first qui permet aux fans de football de tester leurs connaissances à travers différents types de quiz :

- 🎮 **Quiz Classiques (QCM)** - Questions à choix multiples avec explications
- 🏆 **Quiz Classements** - Reconstruction de classements réels avec système d'indices progressifs
- 📊 **Suivi des performances** - Statistiques détaillées et historique des scores
- 🌓 **Mode sombre/clair** - Interface adaptative pour tous les environnements

## ✨ Fonctionnalités

### 🎯 Types de Quiz

#### Quiz Classique (QCM)

- Questions à choix multiples (3-5 réponses)
- Temps limité par question
- Explications détaillées après chaque réponse
- Score basé sur la rapidité et la précision

#### Quiz Classement (Innovation)

- **Mode unique de saisie** : Un seul champ pour toutes les réponses
- **Placement automatique** : Les bonnes réponses se placent dans le classement
- **Système d'indices progressifs** :
  - Niveau 1 : Nombre de lettres + première lettre
  - Niveau 2 : Informations géographiques (ville, stade)
  - Niveau 3 : Palmarès et surnoms
  - Niveau 4 : Faits historiques marquants
- **Tolérance de saisie** : Algorithme de similarité pour accepter les variantes

### 📱 Interface Utilisateur

- **Design Mobile-First** : Optimisé pour smartphones et tablettes
- **Navigation intuitive** : Barre de navigation inférieure
- **Thème adaptatif** : Basculement automatique ou manuel sombre/clair
- **Animations fluides** : Transitions et feedback visuels

### 📊 Statistiques et Suivi

- Historique des parties jouées
- Statistiques par catégorie
- Taux de réussite et séries
- Évolution des performances

## 🛠️ Technologies Utilisées

### Core Framework

- **Vue.js 3** - Framework JavaScript progressif avec Composition API
- **TypeScript** - Typage statique pour une meilleure robustesse
- **Vite** - Build tool ultra-rapide avec HMR

### Styling & UI

- **TailwindCSS v4** - Framework CSS utility-first
- **Headless UI** - Composants accessibles sans style
- **Heroicons** - Icônes SVG optimisées

### Routing & Navigation

- **Vue Router 4** - Routage SPA avec navigation programmatique

### Outils de Développement

- **TypeScript Compiler** - Vérification de types
- **PostCSS** - Traitement CSS avancé
- **Autoprefixer** - Préfixes CSS automatiques

## 🚀 Installation et Démarrage

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone <url-du-repo>
cd quizz-foot

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

### Scripts Disponibles

```bash
# Développement avec hot-reload
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

## 📁 Structure du Projet

```
src/
├── components/          # Composants Vue réutilisables
│   ├── BottomNav.vue    # Navigation inférieure
│   ├── QuestionCard.vue # Carte de question QCM
│   ├── QuizResults.vue  # Résultats de quiz
│   └── RankingQuiz.vue  # Quiz de classement
├── views/              # Pages/Vues principales
│   ├── HomeView.vue    # Page d'accueil
│   ├── QuizView.vue    # Sélection de quiz
│   ├── QuizClassicView.vue    # Quiz QCM
│   ├── QuizRankingView.vue    # Quiz classements
│   ├── RankingsView.vue       # Classements historiques
│   ├── StatsView.vue   # Statistiques utilisateur
│   └── ProfileView.vue # Profil et paramètres
├── data/               # Données statiques
│   ├── questions.ts    # Questions QCM
│   └── rankings.ts     # Données de classements
├── router/             # Configuration du routage
├── types/              # Définitions TypeScript
├── utils/              # Fonctions utilitaires
├── assets/             # Ressources statiques
│   ├── main.css        # Styles globaux et variables CSS
│   └── style.css       # Styles complémentaires
└── main.ts             # Point d'entrée de l'application
```

## 🎨 Système de Thème

L'application utilise un système de variables CSS personnalisées pour gérer les thèmes :

```css
:root {
  --primary: #22c55e;
  --secondary: #64748b;
  --background: #ffffff;
  --surface: #f8fafc;
  --border: #e2e8f0;
  /* ... */
}

.dark {
  --background: #0f172a;
  --surface: #1e293b;
  --border: #334155;
  /* ... */
}
```

## 🏆 Quiz Classement - Innovation

Le mode "Quiz Classement" est une fonctionnalité unique qui propose une approche différente :

### Principe

Au lieu d'avoir un champ par position, un seul champ de saisie permet de :

1. Taper une réponse
2. Si correcte, elle se place automatiquement dans le classement
3. Possibilité de se tromper plusieurs fois sans révéler les solutions
4. Indices progressifs selon le nombre d'erreurs globales

### Exemple de Données

```typescript
{
  id: 'ligue1-2023-top5',
  title: 'Top 5 Ligue 1 2022-2023',
  correctOrder: [
    {
      name: 'Paris Saint-Germain',
      position: 1,
      hints: {
        letterCount: 17,
        firstLetter: 'P',
        city: 'Capitale française',
        titles: '11 fois champion de France',
        stadium: 'Parc des Princes'
      }
    }
    // ...
  ]
}
```

## 🔮 Fonctionnalités Futures

- [ ] **Mode multijoueur** - Défis entre amis
- [ ] **Quiz temporels** - Événements et actualités
- [ ] **Achievements** - Système de badges et récompenses
- [ ] **Mode hors-ligne** - PWA avec cache des quiz
- [ ] **Partage social** - Partager ses scores sur les réseaux
- [ ] **Quiz personnalisés** - Création de quiz par les utilisateurs

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Pushez sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📱 Responsive Design

L'application est conçue avec une approche mobile-first :

- **Mobile** : Interface optimisée avec navigation tactile
- **Tablet** : Adaptation de la mise en page pour tablettes
- **Desktop** : Expérience enrichie sur grands écrans

## 🎯 Performance

- **Lazy Loading** : Chargement différé des composants
- **Code Splitting** : Division du code pour un chargement optimal
- **Tree Shaking** : Élimination du code inutilisé
- **Cache Intelligent** : Mise en cache des ressources statiques

---

**Développé avec IA pour les passionnés de football**

_Testez vos connaissances, défiez vos amis, et devenez un expert du football mondial !_
