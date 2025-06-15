import type { Question } from '@/types'

export const classicQuestions: Question[] = [
  {
    id: 'q1',
    question: 'Quel joueur a remporté le Ballon d\'Or 2023 ?',
    answers: ['Lionel Messi', 'Erling Haaland', 'Kylian Mbappé', 'Karim Benzema'],
    correctAnswer: 0,
    category: 'Ballon d\'Or',
    difficulty: 'easy',
    explanation: 'Lionel Messi a remporté son 8ème Ballon d\'Or en 2023, notamment grâce à sa victoire en Coupe du Monde avec l\'Argentine.'
  },
  {
    id: 'q2',
    question: 'Quelle équipe a remporté la Ligue 1 en 2023-2024 ?',
    answers: ['Paris Saint-Germain', 'AS Monaco', 'Olympique de Marseille', 'LOSC Lille'],
    correctAnswer: 0,
    category: 'Ligue 1',
    difficulty: 'easy',
    explanation: 'Le PSG a remporté son 12ème titre de champion de France.'
  },
  {
    id: 'q3',
    question: 'Combien de fois le Real Madrid a-t-il remporté la Ligue des Champions ?',
    answers: ['13 fois', '14 fois', '15 fois', '16 fois'],
    correctAnswer: 2,
    category: 'Champions League',
    difficulty: 'medium',
    explanation: 'Le Real Madrid a remporté la Ligue des Champions 15 fois, un record absolu.'
  },
  {
    id: 'q4',
    question: 'Qui est le meilleur buteur de l\'histoire de la Coupe du Monde ?',
    answers: ['Pelé', 'Miroslav Klose', 'Ronaldo Nazário', 'Gerd Müller'],
    correctAnswer: 1,
    category: 'Coupe du Monde',
    difficulty: 'medium',
    explanation: 'Miroslav Klose avec 16 buts marqués en Coupe du Monde.'
  },
  {
    id: 'q5',
    question: 'Dans quel stade évolue le FC Barcelone ?',
    answers: ['Camp Nou', 'Santiago Bernabéu', 'Spotify Camp Nou', 'Estadi Olímpic'],
    correctAnswer: 2,
    category: 'Stades',
    difficulty: 'easy',
    explanation: 'Depuis 2022, le stade du FC Barcelone s\'appelle Spotify Camp Nou suite à un accord de naming.'
  },
  {
    id: 'q6',
    question: 'Quel pays a organisé la Coupe du Monde 2022 ?',
    answers: ['Émirats Arabes Unis', 'Qatar', 'Arabie Saoudite', 'Koweït'],
    correctAnswer: 1,
    category: 'Coupe du Monde',
    difficulty: 'easy',
    explanation: 'La Coupe du Monde 2022 s\'est déroulée au Qatar du 20 novembre au 18 décembre.'
  },
  {
    id: 'q7',
    question: 'Qui a marqué le plus de buts en Ligue 1 sur la saison 2023-2024 ?',
    answers: ['Kylian Mbappé', 'Alexandre Lacazette', 'Pierre-Emerick Aubameyang', 'Wissam Ben Yedder'],
    correctAnswer: 0,
    category: 'Ligue 1',
    difficulty: 'medium',
    explanation: 'Kylian Mbappé a terminé meilleur buteur de Ligue 1 avec 27 buts.'
  },
  {
    id: 'q8',
    question: 'Combien de joueurs composent une équipe de football sur le terrain ?',
    answers: ['10 joueurs', '11 joueurs', '12 joueurs', '9 joueurs'],
    correctAnswer: 1,
    category: 'Règles',
    difficulty: 'easy',
    explanation: 'Une équipe de football est composée de 11 joueurs sur le terrain, dont un gardien de but.'
  }
]

export const getQuestionsByCategory = (category: string): Question[] => {
  return classicQuestions.filter(q => 
    q.category.toLowerCase().includes(category.toLowerCase()) ||
    category === 'all'
  )
}

export const getRandomQuestions = (count: number = 10): Question[] => {
  const shuffled = [...classicQuestions].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
