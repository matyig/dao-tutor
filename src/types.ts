export interface User {
  id: string;
  name: string;
  email: string;
  badges: string[];
  connections: {
    google: boolean;
    discord: boolean;
    wallet: boolean;
  };
  votingPower: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  enrolled: boolean;
  completed: boolean;
  points: number;
}

export interface Module {
  id: string;
  title: string;
  content: string;
  completed: boolean;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  options: string[];
  votes: Record<string, number[]>;
  votePower: Record<string, number>;
  status: 'active' | 'closed';
  endDate: string;
  type: 'course' | 'event' | 'other';
}