export interface Vector2 {
  x: number;
  y: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'true-false' | 'single-choice' | 'multi-choice';
  options?: string[];
  correctAnswer: boolean | number | number[]; // boolean for T/F, index for choice
  explanation: string;
}

export interface SectionProps {
  isActive: boolean;
  onNext: () => void;
  onPrev: () => void;
}