import { LucideIcon } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  module?: string;
  color?: string; // For the 'author' tags
}

export interface LearnerCharacteristic {
  category: string;
  description: string[]; // Changed to array for bullet points
  icon: LucideIcon;
}

export interface LearningModule {
  id: number;
  title: string;
  owner: string;
  goal: string;
  tlo: string; // Terminal Learning Objective
  icon: LucideIcon;
  color: string;
  ips: string[]; // Information Processing Steps summaries
  tools: string[]; // Tools mentioned (e.g., Eisenhower Matrix, Sammy's CYOA)
}

export interface AssessmentMetric {
  day: string;
  tasksCompleted: number; // 0-5
  breaksTaken: number; // 0-5
}

export interface ProcessStage {
  id: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  artifacts: {
    title: string;
    type: 'draft' | 'final' | 'note';
    content: string;
    author?: string; // Name of the group member
    context?: string; // Explanation of the change/decision
  }[];
}

// Updated Branching CYOA Types based on Schema
export interface CyoaEffect {
  type: 'score' | 'flag';
  key: string;
  delta?: number;
  value?: number | string | boolean;
}

export interface CyoaChoice {
  label: string;
  next: string; // ID of the next node
  effects?: CyoaEffect[];
  feedback?: string; // Immediate feedback text
}

export interface CyoaNode {
  id: string;
  title: string;
  body: string;
  type?: 'decision' | 'outcome';
  image?: string; // Placeholder for asset path
  choices: CyoaChoice[];
}

export interface CyoaStory {
  meta: {
    title: string;
    module: string;
    author: string;
    version: string;
  };
  start_node: string;
  nodes: Record<string, CyoaNode>; // Map ID to Node for easy lookup
}