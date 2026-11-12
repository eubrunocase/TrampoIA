export interface InterviewQuestion {
  id: string;
  question: string;
  intent: string;
  answerStructure: readonly string[];
  simulatedAnswer: string;
  cautions: readonly string[];
}
