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

NoSQL MongoDb to manage users and lessons collection
