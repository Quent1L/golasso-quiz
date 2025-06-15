import type { RankingQuestion } from '@/types'

export const rankingQuestions: RankingQuestion[] = [  {
    id: 'ligue1-2023-top5',
    title: 'Top 5 Ligue 1 2022-2023',
    description: 'Retrouvez le classement final du top 5 de la Ligue 1 saison 2022-2023',
    category: 'Ligue 1',
    season: '2022-2023',
    hints: true,
    maxAttempts: 3,
    correctOrder: [
      {
        id: 'psg',
        name: 'Paris Saint-Germain',
        position: 1,
        nationality: 'France',
        club: 'Paris Saint-Germain',
        hints: {
          letterCount: 17,
          firstLetter: 'P',
          city: 'Capitale française',
          titles: '11 fois champion de France',
          stadium: 'Parc des Princes',
          nickname: 'Les Rouge et Bleu'
        }
      },
      {
        id: 'lens',
        name: 'RC Lens',
        position: 2,
        nationality: 'France',
        club: 'RC Lens',
        hints: {
          letterCount: 7,
          firstLetter: 'R',
          city: 'Pas-de-Calais',
          titles: '1 titre de champion (1998)',
          stadium: 'Bollaert-Delelis',
          nickname: 'Les Sang et Or'
        }
      },
      {
        id: 'marseille',
        name: 'Olympique de Marseille',
        position: 3,
        nationality: 'France',
        club: 'Olympique de Marseille',
        hints: {
          letterCount: 21,
          firstLetter: 'O',
          city: 'Cité phocéenne',
          titles: '10 fois champion de France',
          stadium: 'Orange Vélodrome',
          historicalFact: 'Seul club français vainqueur de la Ligue des Champions'
        }
      },
      {
        id: 'monaco',
        name: 'AS Monaco',
        position: 4,
        nationality: 'Monaco',
        club: 'AS Monaco',
        hints: {
          letterCount: 9,
          firstLetter: 'A',
          city: 'Principauté',
          titles: '8 fois champion de France',
          stadium: 'Louis II',
          nickname: 'Les Rouge et Blanc'
        }
      },
      {
        id: 'rennes',
        name: 'Stade Rennais',
        position: 5,
        nationality: 'France',
        club: 'Stade Rennais',
        hints: {
          letterCount: 13,
          firstLetter: 'S',
          city: 'Capitale bretonne',
          titles: '2 Coupes de France récentes (2019, 2022)',
          stadium: 'Roazhon Park',
          nickname: 'Les Rouge et Noir'
        }
      }
    ]
  },  {
    id: 'ligue1-buteurs-2024',
    title: 'Meilleurs buteurs Ligue 1 2023-2024',
    description: 'Classez les 5 meilleurs buteurs de Ligue 1 saison 2023-2024',
    category: 'Ligue 1',
    season: '2023-2024',
    hints: true,
    maxAttempts: 3,
    correctOrder: [
      {
        id: 'mbappe',
        name: 'Kylian Mbappé',
        position: 1,
        nationality: 'France',
        club: 'PSG',
        value: '27 buts',
        hints: {
          letterCount: 14,
          firstLetter: 'K',
          city: 'Né à Bondy',
          titles: 'Champion du monde 2018',
          nickname: 'Donatello',
          historicalFact: 'Plus jeune buteur français en Coupe du Monde'
        }
      },
      {
        id: 'lacazette',
        name: 'Alexandre Lacazette',
        position: 2,
        nationality: 'France',
        club: 'Lyon',
        value: '19 buts',
        hints: {
          letterCount: 18,
          firstLetter: 'A',
          city: 'Enfant de Lyon',
          titles: 'Ex-capitaine d\'Arsenal',
          nickname: 'Général',
          historicalFact: 'Formé à l\'OL, revenu au club en 2022'
        }
      },
      {
        id: 'aubameyang',
        name: 'Pierre-Emerick Aubameyang',
        position: 3,
        nationality: 'Gabon',
        club: 'Marseille',
        value: '17 buts',
        hints: {
          letterCount: 24,
          firstLetter: 'P',
          city: 'Né en France',
          titles: 'Ex-capitaine d\'Arsenal',
          nickname: 'Auba',
          historicalFact: 'Fils de l\'ex-international gabonais Pierre Aubameyang'
        }
      },
      {
        id: 'benyedder',
        name: 'Wissam Ben Yedder',
        position: 4,
        nationality: 'France',
        club: 'Monaco',
        value: '16 buts',
        hints: {
          letterCount: 16,
          firstLetter: 'W',
          city: 'Né à Sarcelles',
          titles: 'Meilleur buteur de L1 en 2019-20',
          nickname: 'WBY',
          historicalFact: 'Révélé à Toulouse'
        }
      },
      {
        id: 'david',
        name: 'Jonathan David',
        position: 5,
        nationality: 'Canada',
        club: 'Lille',
        value: '15 buts',
        hints: {
          letterCount: 13,
          firstLetter: 'J',
          city: 'Né à New York',
          titles: 'Champion de France 2021 avec Lille',
          nickname: 'JD',
          historicalFact: 'Arrivé de La Gantoise en 2020'
        }
      }
    ]
  },  {
    id: 'ballon-or-recent',
    title: 'Ballon d\'Or - Derniers gagnants',
    description: 'Classez les 5 derniers gagnants du Ballon d\'Or (2019-2023)',
    category: 'Ballon d\'Or',
    hints: true,
    maxAttempts: 3,
    correctOrder: [
      {
        id: 'messi-2023',
        name: 'Lionel Messi',
        position: 1,
        nationality: 'Argentine',
        club: 'Inter Miami',
        value: '2023',
        hints: {
          letterCount: 12,
          firstLetter: 'L',
          city: 'Né à Rosario',
          titles: 'Champion du monde 2022',
          nickname: 'La Pulga',
          historicalFact: '8e Ballon d\'Or, record absolu'
        }
      },
      {
        id: 'benzema-2022',
        name: 'Karim Benzema',
        position: 2,
        nationality: 'France',
        club: 'Al-Ittihad',
        value: '2022',
        hints: {
          letterCount: 13,
          firstLetter: 'K',
          city: 'Né à Lyon',
          titles: 'Vainqueur Ligue des Champions 2022',
          nickname: 'KB9',
          historicalFact: 'Premier français depuis Zidane (1998)'
        }
      },
      {
        id: 'messi-2021',
        name: 'Lionel Messi',
        position: 3,
        nationality: 'Argentine',
        club: 'PSG',
        value: '2021',
        hints: {
          letterCount: 12,
          firstLetter: 'L',
          city: 'Départ du Barça cette année-là',
          titles: 'Copa América 2021',
          nickname: 'La Pulga',
          historicalFact: '7e Ballon d\'Or'
        }
      },
      {
        id: 'modric-2018',
        name: 'Luka Modrić',
        position: 4,
        nationality: 'Croatie',
        club: 'Real Madrid',
        value: '2018',
        hints: {
          letterCount: 12,
          firstLetter: 'L',
          city: 'Né à Zadar',
          titles: 'Vice-champion du monde 2018',
          nickname: 'Le Magicien',
          historicalFact: 'A cassé le duopole Messi-Ronaldo'
        }
      },
      {
        id: 'messi-2019',
        name: 'Lionel Messi',
        position: 5,
        nationality: 'Argentine',
        club: 'FC Barcelone',
        value: '2019',
        hints: {
          letterCount: 12,
          firstLetter: 'L',
          city: 'Encore au Barça',
          titles: 'Meilleur buteur Liga 2019',
          nickname: 'La Pulga',
          historicalFact: '6e Ballon d\'Or'
        }
      }
    ]
  },  {
    id: 'champions-league-winners',
    title: 'Vainqueurs Champions League',
    description: 'Classez les 4 derniers vainqueurs de la Ligue des Champions',
    category: 'Champions League',
    hints: true,
    maxAttempts: 3,
    correctOrder: [
      {
        id: 'city-2023',
        name: 'Manchester City',
        position: 1,
        nationality: 'Angleterre',
        value: '2023',
        hints: {
          letterCount: 15,
          firstLetter: 'M',
          city: 'Manchester',
          titles: 'Premier titre en C1',
          stadium: 'Etihad Stadium',
          nickname: 'Les Citizens'
        }
      },
      {
        id: 'real-2022',
        name: 'Real Madrid',
        position: 2,
        nationality: 'Espagne',
        value: '2022',
        hints: {
          letterCount: 11,
          firstLetter: 'R',
          city: 'Capitale espagnole',
          titles: '14 Ligues des Champions',
          stadium: 'Santiago Bernabéu',
          nickname: 'Los Blancos'
        }
      },
      {
        id: 'chelsea-2021',
        name: 'Chelsea',
        position: 3,
        nationality: 'Angleterre',
        value: '2021',
        hints: {
          letterCount: 7,
          firstLetter: 'C',
          city: 'Londres',
          titles: '2e titre en C1',
          stadium: 'Stamford Bridge',
          nickname: 'The Blues'
        }
      },
      {
        id: 'bayern-2020',
        name: 'Bayern Munich',
        position: 4,
        nationality: 'Allemagne',
        value: '2020',
        hints: {
          letterCount: 12,
          firstLetter: 'B',
          city: 'Munich',
          titles: '6 Ligues des Champions',
          stadium: 'Allianz Arena',
          nickname: 'Der Rekordmeister'
        }
      }
    ]
  }
]

export const getRankingQuestionsByCategory = (category: string): RankingQuestion[] => {
  return rankingQuestions.filter(q => 
    q.category.toLowerCase().includes(category.toLowerCase()) ||
    category === 'all'
  )
}

export const getRandomRankingQuestions = (count: number = 5): RankingQuestion[] => {
  const shuffled = [...rankingQuestions].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
