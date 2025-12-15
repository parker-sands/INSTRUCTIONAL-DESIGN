import { 
  Brain, 
  Heart, 
  Users, 
  Activity, 
  Moon, 
  Clock, 
  Ban, 
  MessageCircle,
  BarChart3,
  Search,
  PenTool,
  Wrench,
  CheckCircle2,
  Zap
} from "lucide-react";
import { LearnerCharacteristic, LearningModule, TeamMember, AssessmentMetric, ProcessStage, CyoaStory } from "./types";

// Colors mapped to the new palette:
// Parker = Blue -> Sky Blue (#a2d2ff)
// Charlie = Pink -> Baby Pink (#ffafcc)
// Matt = Green -> Mint (#c8f7d4)
// Maggie = Purple -> Thistle (#cdb4db)

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Charlie Stancik", role: "Group Lead & Module 3", module: "Distractions", color: "bg-baby-pink text-slate-900 border-pink-300" },
  { name: "Parker Sands", role: "Instructional Designer", module: "General Health", color: "bg-sky-blue text-slate-900 border-blue-300" },
  { name: "Matt Johnsen", role: "Instructional Designer", module: "Proactive Sociability", color: "bg-mint text-slate-900 border-green-300" },
  { name: "Maggie Brown", role: "Instructional Designer", module: "Time Management", color: "bg-thistle text-slate-900 border-purple-300" },
];

export const LEARNER_ANALYSIS: LearnerCharacteristic[] = [
  {
    category: "Cognitive",
    description: [
      "Self-Disciplined, Adaptable Professionals",
      "Piaget's Formal Operational Stage",
      "High Visual Literacy And Capable Of Complex Reasoning"
    ],
    icon: Brain
  },
  {
    category: "Physiological",
    description: [
      "Generally Healthy Adults (22-55)",
      "Neurodiversity Is Expected",
      "Design Must Be Flexible And Accessible (Captions, Adjustable Playback)"
    ],
    icon: Activity
  },
  {
    category: "Affective",
    description: [
      "Motivated By Work-Life Balance And Career Growth",
      "Value Autonomy",
      "Some Skepticism Due To 'Zoom Fatigue' Is Expected"
    ],
    icon: Heart
  },
  {
    category: "Social",
    description: [
      "Respect Authority But Lean Toward Cooperation",
      "Post-Conventional Moral Reasoning",
      "May Feel Isolated Due To Remote Context"
    ],
    icon: Users
  }
];

export const MODULES: LearningModule[] = [
  {
    id: 1,
    title: "General Health & Well-Being",
    owner: "Parker Sands",
    goal: "Integrate practical routines for sleep and movement.",
    tlo: "Integrate a one-week Sleep + Movement plan to follow at least 5/7 days, making data-driven adjustments.",
    icon: Moon,
    color: "bg-sky-blue text-slate-900 border-blue-200", // Parker's Color
    ips: [
      "Recognize Habits (Bedtime/Wake Time Logs)",
      "Understand Core Sleep Facts (Circadian Rhythm, Caffeine)",
      "Analyze Context (Map Daily Constraints)",
      "Develop Personal Plan (3-Step Evening Cue)",
      "Track Adherence And Alertness",
      "Adapt Based On Data"
    ],
    tools: ["Sammy's Remote Workday (CYOA)", "Sleep + Movement Plan", "7-Day Adherence Log"]
  },
  {
    id: 2,
    title: "Time Management",
    owner: "Maggie Brown",
    goal: "Create sustainable workday schedules to enhance well-being.",
    tlo: "Create an effective schedule using calendars and logs to streamline tasks and increase productivity by 80%.",
    icon: Clock,
    color: "bg-thistle text-slate-900 border-purple-200", // Maggie's Color
    ips: [
      "Record Current Time Use (15-Min Increments)",
      "Categorize Tasks (Eisenhower Matrix)",
      "Implement Trial Schedule (Pomodoro Technique)",
      "Analyze Trial Run (Productivity Survey)"
    ],
    tools: ["Eisenhower Matrix", "Time Tracker Log", "Adherence Rubric"]
  },
  {
    id: 3,
    title: "Home Distractions",
    owner: "Charlie Stancik",
    goal: "Navigate common home distractions by applying minimization strategies.",
    tlo: "Apply strategies to minimize or manage common home distractions with 80% accuracy.",
    icon: Ban,
    color: "bg-baby-pink text-slate-900 border-pink-200", // Charlie's Color
    ips: [
      "Recognize Distraction Sources (Digital, Environmental)",
      "Understand Impact On Focus",
      "Select Effective Strategies",
      "Apply In Realistic Scenarios",
      "Evaluate Effectiveness"
    ],
    tools: ["Distraction Mapping Activity", "4D Distraction Model", "Self-Assessment Log"]
  },
  {
    id: 4,
    title: "Proactive Sociability",
    owner: "Matt Johnsen",
    goal: "Cultivate healthy workplace relationships in remote settings.",
    tlo: "Apply knowledge of positive workplace communication to at least 2 self-diagnosed areas of improvement.",
    icon: MessageCircle,
    color: "bg-mint text-slate-900 border-green-200", // Matt's Color
    ips: [
      "Identify Effective Communication (Active Listening, RACI)",
      "Identify Remote Challenges (Silos, Lack Of Non-Verbal Cues)",
      "Determine Areas Of Improvement",
      "Create Action Plan"
    ],
    tools: ["Communication Self-Assessment", "RACI Matrix", "Action Plan Chart"]
  }
];

export const PROCESS_JOURNEY: ProcessStage[] = [
  {
    id: "analysis",
    title: "1. Analysis",
    icon: Search,
    summary: "Starting with broad brainstorming, we refined our scope based on the ubiquity of remote work challenges and audience needs analysis.",
    artifacts: [
      {
        title: "Brainstorming & Concept",
        type: "draft",
        author: "Parker Sands",
        content: "Initial Concepts:\n- 'Preparing for Surf Camp' (Rejected)\n- 'Vector Training' (Rejected)\n- 'Digital Wellbeing' (Selected)",
        context: "We chose Digital Wellbeing because it addressed a universal pain point for our demographic."
      },
      {
        title: "Learner Analysis Data",
        type: "final",
        content: "Audience Profile: Tech-literate adults (22-55).\nKey Traits: Self-directed but prone to burnout; skeptical of 'busy work'.",
        context: "These traits dictated our choice of micro-learning and asynchronous delivery."
      }
    ]
  },
  {
    id: "design",
    title: "2. Design",
    icon: PenTool,
    summary: "We used Gagne's Nine Events to structure our modules, focusing on specific, measurable behaviors for abstract concepts.",
    artifacts: [
      {
        title: "Task Analysis Evolution",
        type: "note",
        author: "Parker Sands",
        content: "Draft IPS: 'Learn about sleep.'\nRefined IPS: 'Recognize habits' -> 'Analyze context' -> 'Plan routines'.\n\nDesign Decision: Moving from passive learning to active planning.",
        context: "Evolution of the General Health Module structure."
      }
    ]
  },
  {
    id: "development",
    title: "3. Development",
    icon: Wrench,
    summary: "Creating the actual learning materials. We utilized 'Sammy's Remote Workday' (CYOA) to allow consequence-free practice.",
    artifacts: [
      {
        title: "Sammy's CYOA Logic Map",
        type: "draft",
        content: "Decision Node 1 (Evening): \n- Stretch/Read (Green - promotes melatonin)\n- Watch TV (Yellow - delays sleep)\n- Work Late (Red - increases cortisol)",
        context: "We mapped every decision to a specific physiological outcome to ground the fiction in science."
      }
    ]
  },
  {
    id: "implementation",
    title: "4. Implementation",
    icon: Zap,
    summary: "Preparing for launch, including LMS integration and facilitator support materials to ensure smooth delivery.",
    artifacts: [
      {
        title: "Facilitator Guide",
        type: "final",
        content: "Key Discussion Points:\n- How to debrief the CYOA results.\n- Managing privacy concerns during 'Distraction Mapping'.\n- Tech troubleshooting for the interactive rubric.",
        context: "Essential for standardizing the delivery across different cohorts."
      },
      {
        title: "LMS Launch Checklist",
        type: "note",
        content: "- Verify SCORM compliance for interactive modules.\n- Test accessibility features (screen reader compatibility).\n- Set up automated reminder emails.",
      }
    ]
  },
  {
    id: "evaluation",
    title: "5. Evaluation",
    icon: CheckCircle2,
    summary: "Our strategy combines formative feedback during the modules with summative behavioral tracking via 7-day logs.",
    artifacts: [
      {
        title: "Formative Eval Plan",
        type: "final",
        content: "Method: Small group pilot (4-6 users).\nQuestions:\n1. Were scenarios realistic?\n2. Did color-coded feedback make sense?\n3. Did it increase self-awareness?",
        context: "We specifically look for 'Behavioral Relevance'."
      }
    ]
  }
];

// Branching Logic for Sammy's Story
export const SAMMY_CYOA_STORY: CyoaStory = {
  meta: {
    title: "Sammy's Remote Workday",
    module: "Module 1",
    author: "Parker Sands",
    version: "2.0"
  },
  start_node: "node_evening_start",
  nodes: {
    "node_evening_start": {
      id: "node_evening_start",
      title: "The Night Before: 7:00 PM",
      body: "You and your partner have finished dinner. It's been a long, draining day. The rest of your evening is wide open. What do you do?",
      type: "decision",
      choices: [
        {
          label: "Do some light stretching and read a book",
          next: "node_morning_rested",
          effects: [{ type: "score", key: "wellness", delta: 3 }],
          feedback: "Great choice! Gentle stretching calms the nervous system, and reading helps your brain decelerate. This promotes melatonin production for better sleep."
        },
        {
          label: "Watch a new show on the couch",
          next: "node_morning_groggy",
          effects: [{ type: "score", key: "wellness", delta: 2 }],
          feedback: "Relaxing is good, but binge-watching activates dopamine pathways that can override sleep signals. You might stay up later than planned."
        },
        {
          label: "Check work email and power through tasks",
          next: "node_morning_tired",
          effects: [{ type: "score", key: "wellness", delta: 0 }],
          feedback: "Exposure to work stress right before bed increases cortisol, making it harder to fall asleep and disrupting overnight recovery."
        },
        {
          label: "Scroll on your phone in bed",
          next: "node_morning_tired",
          effects: [{ type: "score", key: "wellness", delta: 0 }],
          feedback: "Passive blue light exposure and cognitive overstimulation at the exact time your brain needs to power down. This sabotages your sleep cycle."
        }
      ]
    },
    "node_morning_rested": {
      id: "node_morning_rested",
      title: "The Alarm: 7:00 AM",
      body: "Because you wound down properly, you slept well. The alarm buzzes. You feel decent, though the bed is warm.",
      type: "decision",
      choices: [
        {
          label: "Get up immediately & do a short stretch",
          next: "node_midday_focused",
          effects: [{ type: "score", key: "wellness", delta: 3 }],
          feedback: "Solid move. Waking up with intention activates your body and brain. Morning stretching boosts circulation and lowers cortisol."
        },
        {
          label: "Hit snooze once",
          next: "node_midday_okay",
          effects: [{ type: "score", key: "wellness", delta: 2 }],
          feedback: "Understandable, but fragmented wake-up cycles can leave you slightly groggier (sleep inertia) than if you'd just gotten up."
        }
      ]
    },
    "node_morning_groggy": {
      id: "node_morning_groggy",
      title: "The Alarm: 7:00 AM",
      body: "You stayed up a bit late watching TV. The alarm buzzes, and your head feels heavy. It's a struggle.",
      type: "decision",
      choices: [
        {
          label: "Force yourself up and hydrate",
          next: "node_midday_okay",
          effects: [{ type: "score", key: "wellness", delta: 2 }],
          feedback: "Good recovery. It's hard, but getting up now prevents further sleep inertia."
        },
        {
          label: "Hit snooze repeatedly",
          next: "node_midday_tired",
          effects: [{ type: "score", key: "wellness", delta: 1 }],
          feedback: "Fragmented sleep in the morning increases grogginess. You're starting the day in a reactive state."
        }
      ]
    },
    "node_morning_tired": {
      id: "node_morning_tired",
      title: "The Alarm: 7:00 AM",
      body: "You worked late or scrolled too long. You feel exhausted. The alarm is physically painful.",
      type: "decision",
      choices: [
        {
          label: "Hit snooze and skip morning routine",
          next: "node_midday_tired",
          effects: [{ type: "score", key: "wellness", delta: 0 }],
          feedback: "You're starting the day rushed and tired. This stress will compound."
        },
        {
          label: "Grab phone and scroll in bed to wake up",
          next: "node_midday_tired",
          effects: [{ type: "score", key: "wellness", delta: 0 }],
          feedback: "The 'comfy trap'. Scrolling delays wake system activation and triggers passive consumption mode immediately."
        }
      ]
    },
    "node_midday_focused": {
      id: "node_midday_focused",
      title: "Mid-Morning: 10:30 AM",
      body: "You've been productive, but you've been seated for 3 hours. Your back is tight.",
      type: "decision",
      choices: [
        {
          label: "Take a brisk 10-minute walk outside",
          next: "node_end_great",
          effects: [{ type: "score", key: "wellness", delta: 3 }],
          feedback: "Excellent! Movement and sunlight anchor your circadian rhythm and boost working memory."
        },
        {
          label: "Grab another coffee",
          next: "node_end_good",
          effects: [{ type: "score", key: "wellness", delta: 1 }],
          feedback: "Stimulants mask fatigue but don't fix immobility. You might crash later."
        }
      ]
    },
    "node_midday_okay": {
      id: "node_midday_okay",
      title: "Mid-Morning: 10:30 AM",
      body: "You're getting work done, but focus is drifting. You need a reset.",
      type: "decision",
      choices: [
        {
          label: "Stretch at your desk",
          next: "node_end_good",
          effects: [{ type: "score", key: "wellness", delta: 2 }],
          feedback: "Decent option. It boosts circulation, though leaving the environment would be better."
        },
        {
          label: "Check social media for a 'break'",
          next: "node_end_meh",
          effects: [{ type: "score", key: "wellness", delta: 0 }],
          feedback: "Social scrolling keeps you seated and mentally scattered. It's not a true break."
        }
      ]
    },
    "node_midday_tired": {
      id: "node_midday_tired",
      title: "Mid-Morning: 10:30 AM",
      body: "You're dragging. Brain fog is heavy. You just want to nap.",
      type: "decision",
      choices: [
        {
          label: "Take a 20-minute power nap (timed)",
          next: "node_end_good",
          effects: [{ type: "score", key: "wellness", delta: 2 }],
          feedback: "Strategic napping can help, provided you keep it short to avoid deep sleep inertia."
        },
        {
          label: "Power through with sugar/caffeine",
          next: "node_end_bad",
          effects: [{ type: "score", key: "wellness", delta: 0 }],
          feedback: "A reactive solution that leads to a sugar crash in the afternoon."
        }
      ]
    },
    "node_end_great": {
      id: "node_end_great",
      title: "Day Complete",
      body: "Result: Balanced & Energized. You made consistent, healthy choices that support long-term wellness. You end the day feeling accomplished.",
      type: "outcome",
      choices: []
    },
    "node_end_good": {
      id: "node_end_good",
      title: "Day Complete",
      body: "Result: Mostly on Track. You had a decent day, but a few habits could use fine-tuning to maximize your energy.",
      type: "outcome",
      choices: []
    },
    "node_end_meh": {
      id: "node_end_meh",
      title: "Day Complete",
      body: "Result: Mixed Day. You survived, but you likely feel drained. Try to incorporate more movement breaks tomorrow.",
      type: "outcome",
      choices: []
    },
    "node_end_bad": {
      id: "node_end_bad",
      title: "Day Complete",
      body: "Result: Burned Out. You're running on empty. It's time to reset your sleep and movement priorities before burnout sets in.",
      type: "outcome",
      choices: []
    }
  }
};

// Mock data for the interactive chart visualization
export const MOCK_ADHERENCE_DATA: AssessmentMetric[] = [
  { day: "Mon", tasksCompleted: 3, breaksTaken: 3 },
  { day: "Tue", tasksCompleted: 5, breaksTaken: 3 },
  { day: "Wed", tasksCompleted: 4, breaksTaken: 0 },
  { day: "Thu", tasksCompleted: 5, breaksTaken: 3 },
  { day: "Fri", tasksCompleted: 5, breaksTaken: 3 },
];