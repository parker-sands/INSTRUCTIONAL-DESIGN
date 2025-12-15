import { ScenarioData } from '../types';
import { Mail, Lock, Smartphone, Users, MessageSquare, Video, FileText, Layers, MousePointer, RefreshCw, PlayCircle } from 'lucide-react';

export const scenarios: Record<string, ScenarioData> = {
  '1': {
    id: '1',
    number: 1,
    type: 'Absorb',
    title: 'Eye-2-Eye with ITI: Onboarding Communication Standards',
    problemStatement: 'Innovation and Technology Insight (ITI) is experiencing rapid global expansion. The current onboarding program focuses on technical workflows but lacks depth in company values, ethics, and communication policies. As a result, new Project Managers often fail to consistently apply ITI’s communication standards, leading to misalignment in leadership updates, daily meetings, and one-on-one interactions.',
    targetAudience: 'Newly hired ITI Project Managers (within the past two years) across all global regions. Most hold bachelor’s or master’s degrees, possess strong technical expertise, and operate within multicultural teams in remote or hybrid environments.',
    terminalObjective: 'After completing this learning module, newly hired ITI Project Managers will be able to ***DEMONSTRATE*** effective and policy-aligned communication across multiple workplace contexts when provided with a variety of workplace communication scenarios by selecting and applying the appropriate tone, structure, and response consistent with ITI communication standards in at least four out of five evaluated situations.',
    objectives: [
      {
        id: 1,
        title: 'Weekly Leadership Updates',
        description: 'Newly hired ITI PMs will be able to ***COMMUNICATE*** weekly updates to leadership via email in accordance with ITI’s communication and reporting policies.',
        icon: Mail
      },
      {
        id: 2,
        title: 'Positive Peer Recognition',
        description: 'Newly hired ITI PMs will be able to ***PRAISE*** peers in daily meetings prior to addressing issues, verbally delivering at least one positive kudos before project updates.',
        icon: Users
      },
      {
        id: 3,
        title: 'Active Listening & Professionalism',
        description: 'Newly hired ITI PMs will be able to ***DEMONSTRATE*** active listening and professionalism when meeting one-on-one with team members.',
        icon: MessageSquare
      }
    ],
    activities: [
      {
        id: 1,
        title: 'Narrated Slideshow',
        type: 'Absorb',
        duration: 'Week 1',
        context: 'Top-level managers need consistent information to analyze and decide quickly. This slideshow establishes a baseline for communication standards.',
        learnerActions: [
          'Watch narrated slideshow explaining expectations for frequency, tone, and length.',
          'Review attached weekly update templates.',
          'Identify updates that meet company guidelines in assessment.'
        ],
        deliveryFormat: 'LMS Hosted Slideshow',
        icon: Video
      },
      {
        id: 2,
        title: 'Demonstrated Role-Play Videos',
        type: 'Absorb',
        duration: 'Week 2',
        context: 'A recorded video drama allows new PMs to observe positive and negative examples of workplace recognition to boost morale.',
        learnerActions: [
          'Watch video depicting three PMs leading stand-up meetings.',
          'Observe negative examples (no recognition, superficial praise).',
          'Observe positive examples (specific, work-related recognition).',
          'Complete brief reflection/quiz.'
        ],
        deliveryFormat: 'Pre-recorded Video on LMS',
        icon: PlayCircle
      },
      {
        id: 3,
        title: 'Written Scenarios',
        type: 'Absorb',
        duration: 'Week 3 (15-20 min)',
        context: 'Written examples encourage learners to slow down and reflect on communication habits in one-on-one settings.',
        learnerActions: [
          'Read written conversation scenarios covering conflict and relationships.',
          'Analyze word choice, tone, and empathy.',
          'Identify language demonstrating active listening and professionalism.'
        ],
        deliveryFormat: 'Text-based LMS Activity',
        icon: FileText
      }
    ],
    resourceImplications: [
      'Instructional Design (ID) team leads development.',
      'HR provides verified content on standards.',
      'IT Department assists with LMS hosting.',
      'Activity 2 requires an External Vendor for high-quality video production ($10k).'
    ],
    budget: [
      { role: 'Senior Instructional Designer', annualSalary: 100000, monthlyEquivalent: 8333, percentTime: 100, costForMonth: 8333 },
      { role: 'Associate Instructional Designer', annualSalary: 80000, monthlyEquivalent: 6667, percentTime: 100, costForMonth: 6667 },
      { role: 'Assistant Instructional Designer', annualSalary: 65000, monthlyEquivalent: 5417, percentTime: 100, costForMonth: 5417 },
      { role: 'HR SME', annualSalary: 95000, monthlyEquivalent: 7917, percentTime: 10, costForMonth: 792 },
      { role: 'IT/LMS Support Specialist', annualSalary: 90000, monthlyEquivalent: 7500, percentTime: 10, costForMonth: 750 },
      { role: 'External Vendor (Video Production)', description: '10-minute role-play training video', estimatedCost: 10000 },
      { role: 'TOTAL PROJECT COST', description: '$21,959 Internal + $10,000 External', estimatedCost: 31959, isTotal: true }
    ],
    prototypes: [
      { path: '/demo/onboarding-slides', label: 'Narrated Slideshow', icon: PlayCircle },
      { path: '/demo/roleplay-video', label: 'Role-Play Video', icon: PlayCircle },
      { path: '/demo/written-scenarios', label: 'Written Scenarios', icon: PlayCircle },
    ]
  },
  '2': {
    id: '2',
    number: 2,
    type: 'Do',
    title: 'Moving Forward on the Spectrum of Inclusivity',
    problemStatement: 'Many ITI employees struggle to recognize what inclusive behavior looks like in everyday workplace interactions. HR resources often describe inclusion abstractly. As a result, employees lack clarity on concrete behaviors, leading to inconsistencies in communication, collaboration, and workplace climate.',
    targetAudience: 'All ITI employees. Most hold bachelor’s or master’s degrees, possess strong technical expertise, and operate within multicultural teams in remote or hybrid environments.',
    terminalObjective: 'After completing this module, all ITI employees will be able to ***IDENTIFY*** and ***APPLY*** inclusive workplace practices when presented with realistic workplace scenarios by demonstrating correct responses and earning a minimum score of 90% across all scenario-based activities.',
    objectives: [
      {
        id: 1,
        title: 'Define Inclusive Behavior',
        description: 'Employees will be able to ***DEFINE*** inclusive behavior and explain how it aligns with ITI’s mission statement.',
        icon: FileText
      },
      {
        id: 2,
        title: 'Demonstrate Verbal Responses',
        description: 'Employees will be able to ***DEMONSTRATE*** appropriate and inclusive verbal responses during workplace conversations.',
        icon: MessageSquare
      },
      {
        id: 3,
        title: 'Interpret Scenarios',
        description: 'Employees will be able to ***INTERPRET*** written workplace scenarios and distinguish between inclusive and non-inclusive practices.',
        icon: Layers
      }
    ],
    activities: [
      {
        id: 1,
        title: 'Flashcard Matching + Reflection',
        type: 'Do',
        duration: '10 Minutes',
        context: 'Builds essential background knowledge by clearly defining what inclusive behavior is and is not.',
        learnerActions: [
          'Pair key inclusion terms with definitions via digital flashcards.',
          'Write a brief reflection on observed behaviors in their teams.'
        ],
        deliveryFormat: 'LMS Interactive Widget',
        icon: Layers
      },
      {
        id: 2,
        title: 'Choose-Your-Own-Adventure Sim',
        type: 'Do',
        duration: '30 Minutes',
        context: 'Gives structured practice choosing inclusive responses in realistic, ambiguous conversations.',
        learnerActions: [
          'Navigate branching conversation simulation.',
          'Choose responses to workplace statements.',
          'Experience unique paths/outcomes based on choices.',
          'Categorize verbal strategies.'
        ],
        deliveryFormat: 'Branching Simulation',
        icon: MousePointer
      },
      {
        id: 3,
        title: 'Scenario Sorting + Rewrite Task',
        type: 'Do',
        duration: '20 Minutes',
        context: 'Reinforces learning by having employees analyze real situations and convert non-inclusive interactions.',
        learnerActions: [
          'Drag and drop scenarios into "Inclusive" or "Non-Inclusive".',
          'Rewrite two non-inclusive examples to be models of best practice.',
          'Receive immediate feedback.'
        ],
        deliveryFormat: 'Drag-and-Drop & Text Entry',
        icon: RefreshCw
      }
    ],
    resourceImplications: [
      'Internal ID team designs all activities.',
      'HR/DEI serve as Subject Matter Experts.',
      'Translation Services support global localization.',
      'No external vendors required.'
    ],
    budget: [
      { role: 'Senior Instructional Designer', annualSalary: 100000, monthlyEquivalent: 8333, percentTime: 100, costForMonth: 8333 },
      { role: 'Associate Instructional Designer', annualSalary: 80000, monthlyEquivalent: 6667, percentTime: 100, costForMonth: 6667 },
      { role: 'Assistant Instructional Designer', annualSalary: 65000, monthlyEquivalent: 5417, percentTime: 100, costForMonth: 5417 },
      { role: 'HR SME', annualSalary: 95000, monthlyEquivalent: 7917, percentTime: 5, costForMonth: 396 },
      { role: 'DEI Specialist', annualSalary: 90000, monthlyEquivalent: 7500, percentTime: 10, costForMonth: 750 },
      { role: 'Translation Specialist', annualSalary: 70000, monthlyEquivalent: 5833, percentTime: 10, costForMonth: 583 },
      { role: 'IT/LMS Support Specialist', annualSalary: 90000, monthlyEquivalent: 7500, percentTime: 5, costForMonth: 375 },
      { role: 'TOTAL ESTIMATED VALUE', description: 'Sunken Costs (Internal Labor)', estimatedCost: 22521, isTotal: true }
    ],
    budgetNote: 'All project labor is covered by existing staff (sunken costs). No additional financial expenditure required.',
    prototypes: [
      { path: '/demo/flashcards', label: 'Flashcard Matching', icon: PlayCircle },
      { path: '/demo/conversation-sim', label: 'Conversation Sim', icon: PlayCircle },
      { path: '/demo/scenario-sorting', label: 'Scenario Sorting', icon: PlayCircle },
    ]
  },
  '3': {
    id: '3',
    number: 3,
    type: 'Connect',
    title: 'Digital Security Safety Situational Training',
    problemStatement: 'All ITI employees have completed compliance training but still struggle to apply security principles in specific situations. The gap stems from an inability to apply security principles in real-time contexts like phishing, password creation, and public device usage.',
    targetAudience: 'All ITI Employees. Most hold bachelor’s or master’s degrees, possess strong technical expertise, operate within multicultural teams, and work in remote or hybrid environments.',
    terminalObjective: 'After completing this module, all ITI employees will be able to ***APPLY*** ITI’s digital security standards and procedures when presented with realistic workplace scenarios by demonstrating correct responses and earning a minimum score of 90% across all scenario-based activities.',
    objectives: [
      {
        id: 1,
        title: 'Phishing Awareness',
        description: 'Employees will be able to ***RECOGNIZE*** and ***EVALUATE*** elements of workplace communications that indicate potential phishing attempts across multiple digital platforms (Email, SMS, Slack).',
        icon: Mail
      },
      {
        id: 2,
        title: 'Password Transformation',
        description: 'Employees will be able to ***ANALYZE*** sample passwords and ***ADAPT*** them to meet ITI’s digital security requirements (Length, Complexity, Patterns).',
        icon: Lock
      },
      {
        id: 3,
        title: 'Device Safety',
        description: 'Employees will be able to ***DISTINGUISH*** between secure and insecure device-handling behaviors and ***APPLY*** best practices across different public/shared environments.',
        icon: Smartphone
      }
    ],
    activities: [
      {
        id: 1,
        title: 'Email Phishing Awareness',
        type: 'Connect',
        duration: '20-30 Minutes',
        context: 'Cyber attackers are impersonating real people. Employees must evaluate 10 digital communication samples.',
        learnerActions: [
          'Review samples from Email, SMS, and Slack.',
          'Evaluate if genuine or phishing.',
          'Analyze indicators and select action steps.'
        ],
        deliveryFormat: 'Interactive Evaluation',
        icon: Mail
      },
      {
        id: 2,
        title: 'Password Creation',
        type: 'Connect',
        duration: '10 Minutes',
        context: 'Bridges gap between theory and practice by having users transform base words into complex passphrases.',
        learnerActions: [
          'Generate random base word.',
          'Combine with unrelated words/chars.',
          'Receive real-time strength feedback.'
        ],
        deliveryFormat: 'Interactive Input Tool',
        icon: Lock
      },
      {
        id: 3,
        title: 'Device Safety Scenarios',
        type: 'Connect',
        duration: '15 Minutes',
        context: 'Learners distinguish secure behaviors in real-world environments like coffee shops and airports.',
        learnerActions: [
          'Evaluate advice from coworkers.',
          'Identify insights aligning with policy.',
          'Navigate text-based location scenarios.'
        ],
        deliveryFormat: 'Branching Scenarios',
        icon: Smartphone
      }
    ],
    resourceImplications: [
      'Instructional Design Team designs activities.',
      'IT Security SMEs ensure accuracy.',
      'Translation Services for global localization.',
      'IT Dept for LMS integration.'
    ],
    budget: [
      { role: 'Senior Instructional Designer', annualSalary: 100000, monthlyEquivalent: 8333, percentTime: 100, costForMonth: 8333 },
      { role: 'Associate Instructional Designer', annualSalary: 80000, monthlyEquivalent: 6667, percentTime: 100, costForMonth: 6667 },
      { role: 'Assistant Instructional Designer', annualSalary: 65000, monthlyEquivalent: 5417, percentTime: 100, costForMonth: 5417 },
      { role: 'IT Security SME', annualSalary: 125000, monthlyEquivalent: 10417, percentTime: 10, costForMonth: 1042 },
      { role: 'Translation Specialist', annualSalary: 70000, monthlyEquivalent: 5833, percentTime: 15, costForMonth: 875 },
      { role: 'IT/LMS Support Specialist', annualSalary: 90000, monthlyEquivalent: 7500, percentTime: 10, costForMonth: 750 },
      { role: 'TOTAL ESTIMATED VALUE', description: 'Sunken Costs (Internal Labor)', estimatedCost: 23084, isTotal: true }
    ],
    prototypes: [
      { path: '/demo/phishing', label: 'Launch Phishing Activity', icon: PlayCircle },
      { path: '/demo/password', label: 'Launch Password Tool', icon: PlayCircle },
      { path: '/demo/device', label: 'Launch Device Scenario', icon: PlayCircle },
    ]
  }
};