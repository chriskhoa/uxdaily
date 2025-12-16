import { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateUserThunk } from "../features/userSlice";
import Typography from "../components/ui/Typography";
import Button from "../components/ui/Button";
import NavBar from "../components/ui/NavBar";
import lessons from "../data/lessons";

function MistakeScreen({ navigation, route }) {
  const { lessonId, exerciseId } = route.params.mistake || {};
  const currentExercise = FindExercise(lessonId, exerciseId);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  // State management
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

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

    // Track mistake if exercise is correct. If so remove.
    if (correct && user) {
      const updates = {
        id: user.id,
        mistakes: user.mistakes.filter(
          (item) => item.exerciseId !== exerciseId
        ),
      };
      await dispatch(updateUserThunk({ user: updates, token: user.jwt }));
    }
  };

  // Handle complete exercise
  const handleComplete = async () => {
    navigation.goBack();
  };

  // Render different exercise types
  const renderExerciseContent = () => {
    switch (currentExercise.type) {
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
      text: "Complete",
      action: handleComplete,
      disabled: false,
    };
  };

  const buttonConfig = getButtonConfig();

  return (
    <View style={styles.container}>
      {/* Header with NavBar */}
      <View style={{ marginTop: 70, width: "100%" }}>
        <NavBar
          title={exerciseId}
          showBorder={false}
          onLeftPress={() => navigation.goBack()}
        />
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
        {(currentExercise.type === "reading" || isAnswerChecked) && (
          <Button
            variant="secondary"
            text="Ask AI"
            onPress={() =>
              navigation.navigate("AI", {
                currentExercise,
              })
            }
          />
        )}
        <Button
          text={buttonConfig.text}
          onPress={buttonConfig.action}
          disabled={buttonConfig.disabled}
        />
      </View>
    </View>
  );
}

function FindExercise(lessonId, exerciseId) {
  const lesson = lessons.find((item) => item.id === lessonId);
  return lesson.exercises.find((item) => item.id === exerciseId);
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

export default MistakeScreen;
