// Sample user data for quick front-end testing
export default users = [
  {
    id: "user01",
    username: "Chris",
    email: "Chris@email.com",
    password: "passchris",
    settings: {
      notificationsEnabled: true,
      reminderTime: "19:00",
      soundEnabled: true,
    },
    lessonsCompleted: 3, //enable lesson 4 and lock lesson 5+
    mistakes: [], //list of wrong exercise id
  },
  {
    id: "user02",
    username: "Amy",
    email: "Amy@email.com",
    password: "passamy",
    settings: {
      notificationsEnabled: true,
      reminderTime: "19:00",
      soundEnabled: true,
    },
    lessonsCompleted: 0,
    mistakes: [],
  },
  {
    id: "user03",
    username: "John",
    email: "John@email.com",
    password: "passjohn",
    settings: {
      notificationsEnabled: true,
      reminderTime: "19:00",
      soundEnabled: true,
    },
    lessonsCompleted: 0,
    mistakes: [],
  },
];
