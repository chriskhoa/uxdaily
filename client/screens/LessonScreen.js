import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateUserThunk, addMistakeThunk } from "../features/userSlice";
import Typography from "../components/ui/Typography";
import Button from "../components/ui/Button";
import NavBar from "../components/ui/NavBar";

function LessonScreen({ navigation, route }) {
  const { lesson } = route.params || {};
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  // State management
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!lesson || !lesson.exercises || lesson.exercises.length === 0) {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 70, width: "100%" }}>
          <NavBar
            title="Lesson"
            showBorder={false}
            onLeftPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.errorContainer}>
          <Typography variant="body">No lesson data available</Typography>
        </View>
      </View>
    );
  }

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const totalExercises = lesson.exercises.length;
  const progressPercentage =
    ((currentExerciseIndex + 1) / totalExercises) * 100;

  // Handle answer checking
  const handleCheckAnswer = async () => {
    let correct = false;

    if (currentExercise.type === "multiple_choice") {
      correct = currentExercise.correctAnswer.includes(selectedAnswer);
      setIsCorrect(correct);
      setIsAnswerChecked(true);
    } else if (currentExercise.type === "quiz") {
      correct = currentExercise.correctAnswers.some(
        (answer) =>
          answer.toLowerCase().trim() === textAnswer.toLowerCase().trim()
      );
      setIsCorrect(correct);
      setIsAnswerChecked(true);
    }

    // Track mistake if answer is incorrect
    if (!correct && user) {
      const exerciseId = currentExercise.id;
      const alreadyInMistakes = user.mistakes?.some(
        (mistake) => mistake.exerciseId === exerciseId
      );

      if (!alreadyInMistakes) {
        await dispatch(
          addMistakeThunk({
            userId: user.id,
            exerciseId,
            lessonId: lesson.id,
          })
        );
      }
    }
  };

  // Handle next exercise
  const handleNext = async () => {
    if (currentExerciseIndex < totalExercises - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      resetExerciseState();
    } else {
      // Lesson completed - only update if not already completed
      const isAlreadyCompleted = user?.lessonsCompleted?.includes(lesson.id);

      if (!isAlreadyCompleted && user) {
        const updates = {
          id: user.id,
          lessonsCompleted: [...(user.lessonsCompleted || []), lesson.id],
        };
        await dispatch(updateUserThunk(updates));
      }

      navigation.goBack();
    }
  };

  // Reset state when moving to next exercise
  const resetExerciseState = () => {
    setSelectedAnswer(null);
    setTextAnswer("");
    setIsAnswerChecked(false);
    setIsCorrect(false);
  };

  // Render different exercise types
  const renderExerciseContent = () => {
    switch (currentExercise.type) {
      case "reading":
        return <ReadingExercise content={currentExercise.content} />;

      case "multiple_choice":
        return (
          <MultipleChoiceExercise
            question={currentExercise.question}
            options={currentExercise.options}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={setSelectedAnswer}
            isAnswerChecked={isAnswerChecked}
            correctAnswer={currentExercise.correctAnswer[0]}
          />
        );

      case "quiz":
        return (
          <QuizExercise
            question={currentExercise.question}
            textAnswer={textAnswer}
            onChangeText={setTextAnswer}
            isAnswerChecked={isAnswerChecked}
            isCorrect={isCorrect}
            correctAnswer={currentExercise.correctAnswers[0]}
          />
        );

      default:
        return null;
    }
  };

  // Determine button text and action
  const getButtonConfig = () => {
    if (currentExercise.type === "reading") {
      return {
        text: "Continue",
        action: handleNext,
        disabled: false,
      };
    }

    if (!isAnswerChecked) {
      return {
        text: "Check",
        action: handleCheckAnswer,
        disabled:
          currentExercise.type === "multiple_choice"
            ? !selectedAnswer
            : !textAnswer.trim(),
      };
    }

    return {
      text:
        currentExerciseIndex === totalExercises - 1 ? "Complete" : "Continue",
      action: handleNext,
      disabled: false,
    };
  };

  const buttonConfig = getButtonConfig();

  return (
    <View style={styles.container}>
      {/* Header with NavBar */}
      <View style={{ marginTop: 70, width: "100%" }}>
        <NavBar
          title={lesson.title}
          showBorder={false}
          onLeftPress={() => navigation.goBack()}
        />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${progressPercentage}%` },
            ]}
          />
        </View>
        <Typography variant="caption" style={styles.progressText}>
          {currentExerciseIndex + 1} / {totalExercises}
        </Typography>
      </View>

      {/* Exercise Content */}
      <ScrollView
        style={styles.contentContainer}
        contentContainerStyle={styles.contentContainerInner}
      >
        {renderExerciseContent()}

        {/* Answer Feedback */}
        {isAnswerChecked && (
          <View
            style={[
              styles.feedbackContainer,
              isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect,
            ]}
          >
            <Typography
              variant="body"
              style={isCorrect ? styles.correctText : styles.incorrectText}
            >
              {isCorrect ? "✓ Correct!" : "✗ Incorrect!"}
            </Typography>
          </View>
        )}
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <Button
          variant="secondary"
          text="Ask AI"
          onPress={() => navigation.navigate("AI")}
        />
        <Button
          text={buttonConfig.text}
          onPress={buttonConfig.action}
          disabled={buttonConfig.disabled}
        />
      </View>
    </View>
  );
}

// Reading Exercise Component
function ReadingExercise({ content }) {
  // Render a single line with inline bold text
  const renderLineWithBold = (line, key) => {
    const parts = line.split(/(\*\*.*?\*\*)/g).filter((part) => part !== "");
    return (
      <Text key={key} style={styles.paragraph}>
        {parts.map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <Text key={i} style={styles.inlineBold}>
                {part.replace(/\*\*/g, "")}
              </Text>
            );
          }
          return <Text key={i}>{part}</Text>;
        })}
      </Text>
    );
  };

  // Simple markdown-like rendering
  const renderContent = () => {
    const lines = content.split("\n");
    return lines.map((line, index) => {
      // Headings
      if (line.startsWith("# ")) {
        return (
          <Text key={index} style={styles.heading1}>
            {line.replace("# ", "")}
          </Text>
        );
      } else if (line.startsWith("## ")) {
        return (
          <Text key={index} style={styles.heading2}>
            {line.replace("## ", "")}
          </Text>
        );
      }
      // Bullet points (handle inline bold in bullets)
      else if (line.startsWith("- ")) {
        const bulletText = line.replace("- ", "");
        if (bulletText.includes("**")) {
          const parts = bulletText
            .split(/(\*\*.*?\*\*)/g)
            .filter((part) => part !== "");
          return (
            <Text key={index} style={styles.bulletPoint}>
              {"• "}
              {parts.map((part, i) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return (
                    <Text key={i} style={styles.inlineBold}>
                      {part.replace(/\*\*/g, "")}
                    </Text>
                  );
                }
                return <Text key={i}>{part}</Text>;
              })}
            </Text>
          );
        }
        return (
          <Text key={index} style={styles.bulletPoint}>
            • {bulletText}
          </Text>
        );
      }
      // Empty lines
      else if (line.trim() === "") {
        return <View key={index} style={styles.spacer} />;
      }
      // Lines that are entirely bold
      else if (
        line.startsWith("**") &&
        line.endsWith("**") &&
        !line.slice(2, -2).includes("**")
      ) {
        return (
          <Text key={index} style={styles.bold}>
            {line.replace(/\*\*/g, "")}
          </Text>
        );
      }
      // Regular paragraphs with potential inline bold
      else {
        if (line.includes("**")) {
          return renderLineWithBold(line, index);
        }
        return (
          <Text key={index} style={styles.paragraph}>
            {line}
          </Text>
        );
      }
    });
  };

  return <View style={styles.readingContainer}>{renderContent()}</View>;
}

// Multiple Choice Exercise Component
function MultipleChoiceExercise({
  question,
  options,
  selectedAnswer,
  onSelectAnswer,
  isAnswerChecked,
  correctAnswer,
}) {
  return (
    <View style={styles.quizContainer}>
      <Typography variant="h2" style={styles.questionText}>
        {question}
      </Typography>

      <View style={styles.optionsContainer}>
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrectOption = option === correctAnswer;
          const showCorrect = isAnswerChecked && isCorrectOption;
          const showIncorrect =
            isAnswerChecked && isSelected && !isCorrectOption;

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                isSelected && styles.optionButtonSelected,
                showCorrect && styles.optionButtonCorrect,
                showIncorrect && styles.optionButtonIncorrect,
              ]}
              onPress={() => !isAnswerChecked && onSelectAnswer(option)}
              disabled={isAnswerChecked}
            >
              <Typography
                variant="body"
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                  (showCorrect || showIncorrect) && styles.optionTextBold,
                ]}
              >
                {option}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// Quiz Exercise Component (Fill in the blank)
function QuizExercise({
  question,
  textAnswer,
  onChangeText,
  isAnswerChecked,
  isCorrect,
  correctAnswer,
}) {
  return (
    <View style={styles.quizContainer}>
      <Typography variant="h2" style={styles.questionText}>
        {question}
      </Typography>

      <TextInput
        style={[
          styles.textInput,
          isAnswerChecked &&
            (isCorrect ? styles.textInputCorrect : styles.textInputIncorrect),
        ]}
        value={textAnswer}
        onChangeText={onChangeText}
        placeholder="Type your answer here..."
        editable={!isAnswerChecked}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {isAnswerChecked && (
        <Typography
          style={isCorrect ? styles.correctText : styles.incorrectText}
        >
          {correctAnswer}
        </Typography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: "#E5E5E5",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 4,
  },
  progressText: {
    color: "#666",
    minWidth: 50,
    textAlign: "right",
  },
  contentContainer: {
    flex: 1,
  },
  contentContainerInner: {
    padding: 20,
  },
  readingContainer: {
    gap: 12,
  },
  heading1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1a1a1a",
  },
  heading2: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#333",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    marginBottom: 8,
  },
  bold: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  inlineBold: {
    fontWeight: "bold",
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    marginLeft: 10,
    marginBottom: 4,
  },
  spacer: {
    height: 8,
  },
  quizContainer: {
    gap: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 28,
    color: "#1a1a1a",
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E5E5",
    backgroundColor: "white",
  },
  optionButtonSelected: {
    borderColor: "#2196F3",
    backgroundColor: "#E3F2FD",
  },
  optionButtonCorrect: {
    borderColor: "#4CAF50",
    backgroundColor: "#E8F5E9",
  },
  optionButtonIncorrect: {
    borderColor: "#F44336",
    backgroundColor: "#FFEBEE",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  optionTextSelected: {
    color: "#2196F3",
    fontWeight: "500",
  },
  optionTextBold: {
    fontWeight: "600",
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "white",
  },
  textInputCorrect: {
    borderColor: "#4CAF50",
    backgroundColor: "#E8F5E9",
  },
  textInputIncorrect: {
    borderColor: "#F44336",
    backgroundColor: "#FFEBEE",
  },
  feedbackContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  feedbackCorrect: {
    backgroundColor: "#E8F5E9",
  },
  feedbackIncorrect: {
    backgroundColor: "#FFEBEE",
  },
  correctText: {
    color: "#2E7D32",
    fontWeight: "600",
    fontSize: 16,
  },
  incorrectText: {
    color: "#C62828",
    fontWeight: "600",
    fontSize: 16,
  },
  bottomContainer: {
    padding: 20,
    gap: 10,
  },
});

export default LessonScreen;
