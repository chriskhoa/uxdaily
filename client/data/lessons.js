// Sample lesson data for quick front-end testing

export default lessons = [
  {
    id: "lesson1",
    title: "Visual Perception and Hierarchy",
    description:
      "Apply Gestalt psychological laws to organize interface elements effectively.",
    number: 1,
    totalExercises: 6, // main exercise types are "reading", "multiple_choice", "quiz"
    exercises: [
      {
        id: "exercise1.1",
        order: 1,
        type: "reading",
        image: null,
        content:
          "Gestalt Principles are psychological laws that explain how the brain organizes visual information into a unified whole.",
      },
      {
        id: "exercise1.5",
        order: 5,
        type: "multiple_choice",
        image: null,
        question: "How do you say 'Hello' in Spanish?",
        options: ["Hola", "Adiós", "Gracias", "Por favor"],
        correctAnswer: ["Hola"],
      },
      {
        id: "exercise1.6",
        order: 6,
        type: "quiz",
        image: null,
        question: "Complete the sentence: **_** días, ¿cómo estás?",
        correctAnswers: ["buenos", "Buenos"],
      },
    ],
  },
];
