class User {
  id = "";
  name = "";
  email = "";
  hashedPassword = "";
  settings = {
    notificationsEnabled: false,
    reminderTime: "00:00",
    soundEnabled: false,
  };
  lessonsCompleted = [];
  mistakes = [];

  constructor(userFields) {
    const id = userFields.id ?? String(Date.now());
    this.updateProperties({ id, ...userFields });
  }

  updateProperties = (userFields) => {
    this.id = userFields.id ?? this.id;
    this.name = userFields.name ?? this.name;
    this.email = userFields.email ?? this.email;
    this.hashedPassword = userFields.hashedPassword ?? this.hashedPassword;

    // Handle settings object - merge with existing settings
    if (userFields.settings) {
      this.settings = {
        ...this.settings,
        ...userFields.settings,
      };
    }

    this.lessonsCompleted =
      userFields.lessonsCompleted ?? this.lessonsCompleted;
    this.mistakes = userFields.mistakes ?? this.mistakes;
  };

  static fromUserDocument = (userDocument) => {
    const id = userDocument._id?.toString();
    if (!id) {
      throw new Error("Could not find _id in user Document");
    }
    delete userDocument._id;
    const user = new User({ id, ...userDocument });
    return user;
  };
}

export { User };
