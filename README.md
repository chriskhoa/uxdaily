# UX Learning app

A mobile learning application teaching UX design principles through interactive lessons and gamification, similar to Duolingo's approach but for UX/UI design education.

**Target Platform:** React Native
**Current Stage:** MVP

## 10 key features (to be updated)

1. User sign-up
2. User login with authentication
3. Users can edit their account information (name, email, password, etc.)
4. The home screen will allow users to check their learning progress for each lesson to help them quickly pick up where they left off.
5. Each lesson is broken down into multiple screens (e.g. learning contents, interactive activities). Learners navigate through the screen with the “Next” button at the bottom (see prototype below).
6. Interactive activity 1 - quiz: a multiple choice quiz where the learners select the correct choice and check the answer afterward.
7. Interactive activity 2 - question: users are asked to type in the definition for certain learning concepts (or it can be filled in the blank as long as they need to type down text input).
8. Interactive activity 3 - review errors: users can go back to each lesson and review the errors they made to reinforce learning.
9. Nice to have - Users can chat with an AI tutor for questions and clarifications about certain concepts.
10. App notification to remind users to practice daily.

## Design

Figma link: to be added

## Tech stack

Frontend: React Native, Expo App, Tamagui component library
State management: Redux
Backend: restAPI, Express, Node.js
Database: MongoDb

## Front-end App Flow

### Navigation

Login/Sign-up Screen > Main Screen

Hybrid Tab + Stack Navigation

**Root Level/Main Screen: Tab Navigator (3 tabs)**

1. **Profile Tab** - User account info and settings
2. **Home Tab** - Main learning path, lesson selection
3. **Practice Tab** - Quick exercises, reviews, challenges

**Stack Navigation within Tabs:**
Each tab can push to additional screens as needed:

- **Profile Stack:**
  - Profile Screen (default)
- **Home Stack:**
  - Home/Dashboard Screen (default)
  - → Lesson contents screen
  - →→ AI tutor chat screen
- **Practice Stack:**
  - Practice Dashboard (default)
  - → Target Practice Screen
  - → Misconception Practice Screen
  - → Challenge Practice Screen

### Navigation Libraries

- React Navigation

## Backend Architecture

to be added

## Database

NoSQL MongoDb

// users collection
{
"\_id": ObjectId("507f1f77bcf86cd799439011"),
"username": "Chris",
"email": "Chris@email.com",
"password": "$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy", // hashed
"settings": {
"reminderTime": "19:00",
"soundEnabled": true,
"notificationsEnabled": true,
},
"lessonsCompleted": 3, //enable lesson 4 and lock lesson 5+
"mistakes": [], //list of wrong exercise id
}

// lessons collection
{
"\_id": ObjectId("507f1f77bcf86cd799439016"),
"title": "Visual Perception and Hierarchy",
"description": "Apply Gestalt psychological laws to organize interface elements effectively.",
"number": 1,

// Lesson content
"totalExercises": 6, // main exercise types are "reading", "multiple_choice", "quiz", "fill_in_blank"
"exercises": [
{
"\_id": ObjectId("507f1f77bcf86cd799439017"),
"order": 1,
"type": "reading",
"content": "Gestalt Principles are psychological laws that explain how the brain organizes visual information into a unified whole.",
},
...,
{
"\_id": ObjectId("507f1f77bcf86cd799439017"),
"order": 5,
"type": "multiple_choice",
"question": "How do you say 'Hello' in Spanish?",
"image": "link or filename"
"options": [
{
"id": "a",
"text": "Hola",
"isCorrect": true
},
{
"id": "b",
"text": "Adiós",
"isCorrect": false
},
{
"id": "c",
"text": "Gracias",
"isCorrect": false
},
{
"id": "d",
"text": "Por favor",
"isCorrect": false
}
],
"explanation": "'Hola' is the most common greeting in Spanish",
},
{
"\_id": ObjectId("507f1f77bcf86cd79943901c"),
"order": 6,
"type": "fill_in_blank",
"instruction": "Complete the sentence:",
"text": "**\_** días, ¿cómo estás?",
"correctAnswer": "Buenos",
"acceptedAnswers": ["buenos", "Buenos"],
}
],
}
