export interface Evaluation {
  id: string;
  score: number;
  project: { id: string; name: string };
  system: { id: string; name: string };
  dataset: { id: string; name: string };
  date: Date;
  accuracy: number;
  helpfulness: number;
  relevancy: number;
  toxicity: number;
}
