export interface TeamMember {
  name: string;
  role: string;
  initial: string;
}

export interface BudgetItem {
  role: string;
  annualSalary?: number;
  monthlyEquivalent?: number;
  percentTime?: number;
  costForMonth?: number;
  description?: string;
  estimatedCost?: number;
  isTotal?: boolean;
}

export interface LearningObjective {
  id: number;
  title: string;
  description: string;
  icon?: any;
}

export interface Activity {
  id: number;
  title: string;
  type: string;
  duration?: string;
  context: string;
  learnerActions: string[];
  deliveryFormat: string;
  icon?: any;
}

export interface ScenarioData {
  id: string;
  number: number;
  type: 'Absorb' | 'Do' | 'Connect';
  title: string;
  problemStatement: string;
  targetAudience: string;
  terminalObjective: string;
  objectives: LearningObjective[];
  activities: Activity[];
  resourceImplications: string[];
  budget: BudgetItem[];
  budgetNote?: string;
  prototypes?: { path: string; label: string; icon: any }[]; // Optional link to demos
}