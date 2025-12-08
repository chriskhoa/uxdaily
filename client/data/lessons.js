const lessons = [
  {
    id: "lesson1",
    title: "Perception",
    description:
      "Learn how users visually process information and organize elements into meaningful groups.",
    number: 1,
    totalExercises: 10,
    exercises: [
      {
        id: "exercise1.1",
        order: 1,
        type: "reading",
        image: null,
        content: `# Your Eyes Have a "Spotlight"

When you look at your phone, only a small area in the center of your vision is sharp and clear—this is your **focal vision**. Everything else around it is **peripheral vision**, where you see motion and shapes but not fine details.

## Why it matters
Place important information (like buttons or text) where users look directly. Don't hide critical details at screen edges where they're harder to see.`,
      },
      {
        id: "exercise1.2",
        order: 2,
        type: "multiple_choice",
        image: "https://example.com/focal-vision-diagram.png",
        question:
          "Where should you place the most critical information on a mobile screen?",
        options: [
          "At the very top edge",
          "In the center where focal vision is sharpest",
          "At the bottom corners",
          "Spread evenly across the entire screen",
        ],
        correctAnswer: ["In the center where focal vision is sharpest"],
      },
      {
        id: "exercise1.3",
        order: 3,
        type: "quiz",
        image: null,
        question:
          "Fill in the blank: Critical information should NOT be placed at screen edges because it falls in _____ vision where details are less clear.",
        correctAnswers: ["peripheral", "Peripheral"],
      },
      {
        id: "exercise1.4",
        order: 4,
        type: "reading",
        image: null,
        content: `# Make Important Things Stand Out

Your brain automatically notices things that are different. When one item has a unique **color**, **size**, or **shape** among similar items, it instantly "pops out"—you spot it without even trying.

## Why it matters
Use contrast to highlight critical elements like:
- Error messages
- Primary buttons
- Notifications

They'll grab attention immediately without forcing users to search.

## Example
A red notification dot on a gray icon. Your eye finds it instantly!`,
      },
      {
        id: "exercise1.5",
        order: 5,
        type: "multiple_choice",
        image: null,
        question:
          "Which element would 'pop out' most effectively in a grid of gray icons?",
        options: [
          "A slightly larger gray icon",
          "A bright red icon",
          "A gray icon with a border",
          "A gray icon in a different position",
        ],
        correctAnswer: ["A bright red icon"],
      },
      {
        id: "exercise1.6",
        order: 6,
        type: "quiz",
        image: null,
        question:
          "When one element differs significantly in color, size, or shape, it 'pops out' and grabs attention immediately. This is called the _____ effect.",
        correctAnswers: ["pop-out", "pop out", "Pop-out", "Pop out"],
      },
      {
        id: "exercise1.7",
        order: 7,
        type: "reading",
        image: null,
        content: `# Your Brain Loves Patterns

Your brain automatically groups things that seem related. This happens through:

## Gestalt Principles

**Proximity:** Items close together feel like a group

**Similarity:** Items that look alike feel related

**Continuity:** Your eye follows lines and paths naturally

**Closure:** You mentally "complete" incomplete shapes

## Why it matters
Group related content using spacing and visual similarity. Users will naturally understand what belongs together without reading instructions.

## Example
Navigation icons grouped at the bottom of an app feel like one menu, even without a border around them.`,
      },
      {
        id: "exercise1.8",
        order: 8,
        type: "multiple_choice",
        image: null,
        question:
          "Which Gestalt principle explains why we see a navigation menu as one group even with space between items?",
        options: ["Similarity", "Proximity", "Closure", "Continuity"],
        correctAnswer: ["Proximity"],
      },
      {
        id: "exercise1.9",
        order: 9,
        type: "multiple_choice",
        image: "https://example.com/spotify-playlist.png",
        question:
          "How does Spotify use Gestalt principles to organize songs in a playlist?",
        options: [
          "By using proximity to group song title, artist, and duration together",
          "By making all text the same color",
          "By using random spacing between songs",
          "By hiding album artwork",
        ],
        correctAnswer: [
          "By using proximity to group song title, artist, and duration together",
        ],
      },
      {
        id: "exercise1.10",
        order: 10,
        type: "quiz",
        image: null,
        question:
          "The Gestalt principle of _____ explains why items that look alike (same color, shape, or size) are perceived as related.",
        correctAnswers: ["similarity", "Similarity"],
      },
    ],
  },
  {
    id: "lesson2",
    title: "Attention",
    description:
      "Understand what captures user focus and how to guide attention effectively.",
    number: 2,
    totalExercises: 10,
    exercises: [
      {
        id: "exercise2.1",
        order: 1,
        type: "reading",
        image: null,
        content: `# Four Factors That Grab Attention

Your attention is limited, so your brain decides what to focus on based on four key factors:

## The Four Factors

**Salience:** How much something stands out visually (bright colors, motion, contrast)

**Expectancy:** Where you expect to find something based on past experience

**Value:** How important or rewarding something seems to you

**Effort:** How easy it is to notice or interact with

## Why it matters
Design interfaces that balance these factors. High-value actions should be salient and low-effort, appearing where users expect them.`,
      },
      {
        id: "exercise2.2",
        order: 2,
        type: "multiple_choice",
        image: null,
        question:
          "A user expects the 'Submit' button to be at the bottom right of a form. This is an example of:",
        options: ["Salience", "Expectancy", "Value", "Effort"],
        correctAnswer: ["Expectancy"],
      },
      {
        id: "exercise2.3",
        order: 3,
        type: "quiz",
        image: null,
        question:
          "A flashing red error message grabs attention because of its high _____ (how much it stands out visually).",
        correctAnswers: ["salience", "Salience"],
      },
      {
        id: "exercise2.4",
        order: 4,
        type: "multiple_choice",
        image: null,
        question:
          "Why would an e-commerce site make the 'Buy Now' button large, bright, and centrally placed?",
        options: [
          "To increase its salience and value while reducing effort",
          "To make the page look colorful",
          "To hide other less important buttons",
          "To follow fashion trends",
        ],
        correctAnswer: [
          "To increase its salience and value while reducing effort",
        ],
      },
      {
        id: "exercise2.5",
        order: 5,
        type: "reading",
        image: null,
        content: `# Two Ways Attention Works

Your attention operates in two different modes:

## Top-Down Attention (Goal-Driven)
You actively search for something specific. You're in control, looking for the search bar, a specific button, or information you need.

**Example:** Scanning a website for the login button

## Bottom-Up Attention (Stimulus-Driven)
Something grabs your attention automatically—motion, bright colors, sudden sounds. You're not in control; your brain reacts to the stimulus.

**Example:** A notification banner slides down unexpectedly

## Why it matters
Use bottom-up cues (motion, color) sparingly for truly important alerts. Don't fight top-down attention—put things where users expect to find them.`,
      },
      {
        id: "exercise2.6",
        order: 6,
        type: "multiple_choice",
        image: null,
        question:
          "You're reading an article when a flashing ad catches your eye. What type of attention is this?",
        options: [
          "Top-down attention",
          "Bottom-up attention",
          "Working memory",
          "Peripheral vision",
        ],
        correctAnswer: ["Bottom-up attention"],
      },
      {
        id: "exercise2.7",
        order: 7,
        type: "quiz",
        image: null,
        question:
          "When you're actively looking for the 'Download' button on a website, you're using _____ attention.",
        correctAnswers: ["top-down", "top down", "Top-down", "Top down"],
      },
      {
        id: "exercise2.8",
        order: 8,
        type: "multiple_choice",
        image: null,
        question:
          "YouTube's autoplay feature uses motion to capture attention for the next video. This is an example of:",
        options: [
          "Top-down attention guiding users to their goal",
          "Bottom-up attention using motion as a stimulus",
          "Working memory overload",
          "Poor UX design",
        ],
        correctAnswer: ["Bottom-up attention using motion as a stimulus"],
      },
      {
        id: "exercise2.9",
        order: 9,
        type: "reading",
        image: null,
        content: `# Why Multitasking Is Hard

## The Multiple Resource Model
Your brain has different "channels" for processing information:
- Visual vs. Auditory
- Spatial vs. Verbal
- Manual vs. Vocal responses

## Why it matters
Tasks that compete for the same mental resources are hard to do simultaneously. Two visual tasks (reading and watching a video) compete for resources, making both harder.

## Design Implication
Don't force users to:
- Read instructions while performing a visual task
- Listen to audio while reading complex text
- Track multiple moving elements at once

**Example:** GPS apps use voice directions so drivers don't have to read while watching the road.`,
      },
      {
        id: "exercise2.10",
        order: 10,
        type: "multiple_choice",
        image: null,
        question:
          "Why is it difficult to read a text message while watching a video?",
        options: [
          "Our eyes are too slow",
          "Both tasks compete for the same visual attention resources",
          "Text and video use different brain regions",
          "It's actually very easy to do both",
        ],
        correctAnswer: [
          "Both tasks compete for the same visual attention resources",
        ],
      },
    ],
  },
  {
    id: "lesson3",
    title: "Memory, Learning, and Individual Differences",
    description:
      "Design interfaces that work with human memory limitations, not against them.",
    number: 3,
    totalExercises: 10,
    exercises: [
      {
        id: "exercise3.1",
        order: 1,
        type: "reading",
        image: null,
        content: `# Your Brain's Temporary Storage

## Working Memory
Working memory is like your brain's scratch pad—it holds information temporarily while you use it. But it has a **very limited capacity**.

## The Magic Number: 7±2
Most people can hold about **5-9 items** in working memory at once. Try to remember more, and the first items start disappearing.

## Why it matters
Don't overwhelm users with too many:
- Menu options at once
- Form fields on one screen  
- Steps to remember
- Choices to compare

**Example:** Phone numbers are broken into chunks (555-123-4567) because that's easier to remember than 5551234567.`,
      },
      {
        id: "exercise3.2",
        order: 2,
        type: "multiple_choice",
        image: null,
        question:
          "How many items can most people hold in working memory at once?",
        options: ["3-5 items", "5-9 items", "10-15 items", "Unlimited items"],
        correctAnswer: ["5-9 items"],
      },
      {
        id: "exercise3.3",
        order: 3,
        type: "quiz",
        image: null,
        question:
          "Breaking information into smaller groups (like phone numbers: 555-123-4567) makes it easier to remember. This technique is called _____.",
        correctAnswers: ["chunking", "Chunking"],
      },
      {
        id: "exercise3.4",
        order: 4,
        type: "multiple_choice",
        image: "https://example.com/dashboard-comparison.png",
        question:
          "A dashboard shows 15 different metrics all at once. What's the main problem with this design?",
        options: [
          "It looks too colorful",
          "It exceeds working memory capacity, causing cognitive overload",
          "Users prefer fewer colors",
          "The fonts are too small",
        ],
        correctAnswer: [
          "It exceeds working memory capacity, causing cognitive overload",
        ],
      },
      {
        id: "exercise3.5",
        order: 5,
        type: "reading",
        image: null,
        content: `# Recognition vs. Recall

Your brain has two ways to retrieve information:

## Recall (Harder)
Retrieving information from memory without cues.

**Example:** "What's your password?" (You have to remember it)

## Recognition (Easier)  
Identifying information when you see it.

**Example:** "Is this your password?" (You just confirm yes/no)

## Why it matters
Design interfaces that rely on **recognition** rather than **recall**:
- Show options in dropdowns instead of requiring users to type from memory
- Use icons with labels instead of icons alone
- Display recently used items instead of making users remember what they did

**Example:** Apps like Instagram keep consistent icon positions in bottom navigation so users recognize them instantly without thinking.`,
      },
      {
        id: "exercise3.6",
        order: 6,
        type: "multiple_choice",
        image: null,
        question:
          "Which design principle takes advantage of recognition being easier than recall?",
        options: [
          "Using bright colors throughout the interface",
          "Showing options in a menu instead of requiring users to remember commands",
          "Adding more text to every page",
          "Making buttons larger",
        ],
        correctAnswer: [
          "Showing options in a menu instead of requiring users to remember commands",
        ],
      },
      {
        id: "exercise3.7",
        order: 7,
        type: "quiz",
        image: null,
        question:
          "Identifying information when you see it is called _____, and it's easier than retrieving information from memory without cues.",
        correctAnswers: ["recognition", "Recognition"],
      },
      {
        id: "exercise3.8",
        order: 8,
        type: "reading",
        image: null,
        content: `# Building Long-Term Memory

## How Information Sticks
Information moves from working memory to **long-term memory** through:

**Repetition:** Seeing or doing something multiple times

**Meaningful connection:** Linking new info to what you already know

**Practice over time:** Spacing out learning (not cramming)

## Why it matters
Help users build familiarity with your interface:
- Keep navigation consistent across screens
- Use repeated patterns for similar actions
- Provide spaced reminders for important features

**Example:** Duolingo uses spaced repetition—reviewing words at increasing intervals. This moves vocabulary from working memory to long-term memory effectively.`,
      },
      {
        id: "exercise3.9",
        order: 9,
        type: "multiple_choice",
        image: null,
        question:
          "Why do apps like Instagram keep consistent icon positions in their bottom navigation?",
        options: [
          "It looks more organized",
          "It helps users build long-term memory of where things are",
          "It's required by app store guidelines",
          "It saves development time",
        ],
        correctAnswer: [
          "It helps users build long-term memory of where things are",
        ],
      },
      {
        id: "exercise3.10",
        order: 10,
        type: "multiple_choice",
        image: null,
        question:
          "You're designing a multi-step checkout flow. How can you reduce memory burden on users?",
        options: [
          "Show all steps at once on one long page",
          "Hide progress so users focus on current step only",
          "Display a progress indicator and allow users to review previous steps",
          "Require users to memorize their order before checking out",
        ],
        correctAnswer: [
          "Display a progress indicator and allow users to review previous steps",
        ],
      },
    ],
  },
  {
    id: "lesson4",
    title: "Thinking, Mental Models, and Affordances",
    description:
      "Create intuitive interfaces by matching user expectations and providing clear interaction cues.",
    number: 4,
    totalExercises: 10,
    exercises: [
      {
        id: "exercise4.1",
        order: 1,
        type: "reading",
        image: null,
        content: `# Mental Models: What Users Expect

## What is a Mental Model?
A mental model is your brain's understanding of how something works, based on past experiences. Users bring these expectations to every interface they encounter.

## Why it matters
When your design matches users' mental models:
- They can predict what will happen
- They feel in control
- They learn faster
- They make fewer errors

When designs violate mental models, users feel confused and frustrated.

**Example:** A shopping cart icon works in e-commerce because it matches users' mental model from physical stores.`,
      },
      {
        id: "exercise4.2",
        order: 2,
        type: "multiple_choice",
        image: null,
        question:
          "When a designer's conceptual model matches the user's mental model:",
        options: [
          "Users feel confused about what to do",
          "Users can predict how things work and feel in control",
          "The design looks prettier but is harder to use",
          "Development takes longer",
        ],
        correctAnswer: [
          "Users can predict how things work and feel in control",
        ],
      },
      {
        id: "exercise4.3",
        order: 3,
        type: "quiz",
        image: null,
        question:
          "A shopping cart icon works well in e-commerce because it matches users' _____ from physical stores.",
        correctAnswers: ["mental model", "Mental model", "mental Model"],
      },
      {
        id: "exercise4.4",
        order: 4,
        type: "multiple_choice",
        image: "https://example.com/toggle-switch.png",
        question:
          "Why do users immediately understand that a toggle switch controls an on/off state?",
        options: [
          "They read the documentation",
          "It mimics physical light switches from the real world",
          "It uses bright colors",
          "It's always labeled 'on/off'",
        ],
        correctAnswer: [
          "It mimics physical light switches from the real world",
        ],
      },
      {
        id: "exercise4.5",
        order: 5,
        type: "reading",
        image: null,
        content: `# Affordances: Clues for Interaction

## What is an Affordance?
An affordance is a visual or functional clue that suggests how to interact with something. Good affordances make interfaces feel intuitive.

## Types of Affordances

**Strong affordances:** Obviously interactive
- Raised buttons that look pressable
- Underlined blue text that looks clickable
- Sliders with visible handles

**Weak affordances:** Not obviously interactive
- Flat text that might be clickable
- Invisible tap areas
- Gesture-only interactions with no visual cues

## Why it matters
Users shouldn't have to guess how to interact with your interface. Strong affordances reduce errors and frustration.`,
      },
      {
        id: "exercise4.6",
        order: 6,
        type: "multiple_choice",
        image: null,
        question: "Which element has the STRONGEST affordance for clicking?",
        options: [
          "Plain black text with no styling",
          "A raised button with shadow and border",
          "Gray text on a gray background",
          "A small icon with no label",
        ],
        correctAnswer: ["A raised button with shadow and border"],
      },
      {
        id: "exercise4.7",
        order: 7,
        type: "quiz",
        image: null,
        question:
          "Blue underlined text affords _____ or _____ because users have learned this convention from years of web browsing.",
        correctAnswers: [
          "clicking tapping",
          "tapping clicking",
          "Clicking Tapping",
          "Tapping Clicking",
          "clicking/tapping",
          "tapping/clicking",
        ],
      },
      {
        id: "exercise4.8",
        order: 8,
        type: "reading",
        image: null,
        content: `# Case Study: Apple's Trash Can

## Strong Mental Model + Clear Affordance

Apple's trash can icon on Mac provides a strong affordance—users immediately know they can "throw away" files here.

## Why it works:
- **Matches mental model:** We understand physical trash cans from real life
- **Clear affordance:** The icon looks like a container that accepts items
- **Consistent behavior:** Dragging files to it behaves as expected
- **Reversible action:** Users can retrieve items from trash, just like real life

## The lesson
When you combine familiar mental models with clear affordances, users don't need instructions. The interface teaches itself.`,
      },
      {
        id: "exercise4.9",
        order: 9,
        type: "multiple_choice",
        image: null,
        question:
          "A user tries to swipe left on cards in your app but nothing happens. What went wrong?",
        options: [
          "The user is holding their phone incorrectly",
          "The cards lack a visible affordance for swiping, so users don't know it's possible",
          "Swiping is outdated and shouldn't be used",
          "The cards are too large",
        ],
        correctAnswer: [
          "The cards lack a visible affordance for swiping, so users don't know it's possible",
        ],
      },
      {
        id: "exercise4.10",
        order: 10,
        type: "multiple_choice",
        image: null,
        question:
          "You're designing a photo gallery. Which design best combines mental models and affordances?",
        options: [
          "No visible controls—users must discover hidden gestures",
          "Thumbnail grid (familiar from physical photo albums) with visible arrows for navigation",
          "A single large photo with no indication that more photos exist",
          "Random photo positions that change each time",
        ],
        correctAnswer: [
          "Thumbnail grid (familiar from physical photo albums) with visible arrows for navigation",
        ],
      },
    ],
  },
  {
    id: "lesson5",
    title: "Response Selection",
    description:
      "Apply interaction laws to design faster, more accurate user interfaces.",
    number: 5,
    totalExercises: 10,
    exercises: [
      {
        id: "exercise5.1",
        order: 1,
        type: "reading",
        image: null,
        content: `# Fitts's Law: Size and Distance Matter

## The Law
The time to click or tap a target depends on:
- **Size:** Larger targets are faster to hit
- **Distance:** Closer targets are faster to reach

**Formula concept:** Time = Distance / Size

## Why it matters
Make important actions:
- **Large:** Bigger tap/click areas
- **Close:** Near where users' cursor or thumb naturally rests

Small or distant targets slow users down and cause errors.

**Example:** Mobile keyboards have large keys because Fitts's Law—small keys would cause constant typos.`,
      },
      {
        id: "exercise5.2",
        order: 2,
        type: "multiple_choice",
        image: null,
        question:
          "According to Fitts's Law, which button is FASTEST to tap on mobile?",
        options: [
          "Small button at screen edge",
          "Large button at screen center",
          "Small button at screen center",
          "They're all the same speed",
        ],
        correctAnswer: ["Large button at screen center"],
      },
      {
        id: "exercise5.3",
        order: 3,
        type: "quiz",
        image: null,
        question:
          "According to Fitts's Law, targets that are _____ and _____ are fastest to select.",
        correctAnswers: [
          "larger closer",
          "closer larger",
          "Larger Closer",
          "Closer Larger",
          "large close",
          "close large",
          "Large Close",
          "Close Large",
        ],
      },
      {
        id: "exercise5.4",
        order: 4,
        type: "multiple_choice",
        image: "https://example.com/mobile-form-tiny-checkboxes.png",
        question:
          "This mobile form has tiny checkboxes that users frequently mis-tap. What change follows Fitts's Law?",
        options: [
          "Make the entire row tappable, not just the small checkbox",
          "Move checkboxes to the top of the screen",
          "Change the checkbox color",
          "Add more checkboxes",
        ],
        correctAnswer: [
          "Make the entire row tappable, not just the small checkbox",
        ],
      },
      {
        id: "exercise5.5",
        order: 5,
        type: "reading",
        image: null,
        content: `# Hick's Law: Too Many Choices Slow Us Down

## The Law
Decision time increases with the number of choices. More options = longer decisions.

**Formula concept:** Time = log₂(n + 1), where n is number of choices

## Why it matters
Reduce choices to speed up decisions:
- Group related options into categories
- Show fewer options at once
- Provide smart defaults
- Progressive disclosure: show advanced options only when needed

**Example:** Netflix doesn't show all 10,000 titles at once—it shows curated rows of 10-20, making choices manageable.`,
      },
      {
        id: "exercise5.6",
        order: 6,
        type: "multiple_choice",
        image: null,
        question:
          "You're designing a settings menu with 30 options. Using Hick's Law, how should you organize them?",
        options: [
          "Display all 30 options in one long list",
          "Group them into 4-5 categories with 5-7 options each",
          "Hide all settings and make users search",
          "Display them in random order",
        ],
        correctAnswer: ["Group them into 4-5 categories with 5-7 options each"],
      },
      {
        id: "exercise5.7",
        order: 7,
        type: "quiz",
        image: null,
        question:
          "According to Hick's Law, more choices lead to _____ decision times.",
        correctAnswers: [
          "longer",
          "Longer",
          "slower",
          "Slower",
          "increased",
          "Increased",
        ],
      },
      {
        id: "exercise5.8",
        order: 8,
        type: "reading",
        image: null,
        content: `# Case Study: Instagram's Simplified Posting

## Limiting Choices to Build Habit

When Instagram launched, it offered:
- Only **square photos** (one aspect ratio)
- Limited to **simple filters** (not hundreds)
- **One-tap** sharing

## Why it worked:
By limiting choices **(Hick's Law)**, Instagram made posting:
- **Faster:** Less time deciding
- **Easier:** Clear constraints
- **More frequent:** Low effort = daily habit

## The lesson
Sometimes constraints make better products. Fewer choices can mean faster, more confident decisions and increased engagement.`,
      },
      {
        id: "exercise5.9",
        order: 9,
        type: "reading",
        image: null,
        content: `# S-R Compatibility: Match Actions to Expectations

## The Principle
Stimulus-Response (S-R) compatibility means controls should behave as users expect. The relationship between a control and its effect should feel natural.

## Examples of Good Compatibility:
- Volume slider moves RIGHT to increase (matches mental model)
- Scrolling DOWN shows older content (natural progression)
- Toggle switches move right for "on" (cultural convention)

## Examples of Poor Compatibility:
- Up arrow that scrolls down
- Red button that means "continue"
- Toggle that moves left for "on"

## Why it matters
Compatible controls feel intuitive. Incompatible controls cause errors and frustration—users must stop and think about every action.`,
      },
      {
        id: "exercise5.10",
        order: 10,
        type: "multiple_choice",
        image: null,
        question:
          "A volume slider that increases volume when moved RIGHT follows which principle?",
        options: [
          "Fitts's Law",
          "Hick's Law",
          "Stimulus-Response compatibility",
          "Gestalt principles",
        ],
        correctAnswer: ["Stimulus-Response compatibility"],
      },
    ],
  },
];

export default lessons;
