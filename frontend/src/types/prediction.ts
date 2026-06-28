export type Weekends = 'Yes' | 'No';

export type BurnoutPrediction =
  | 'Healthy'
  | 'Risk of burnout'
  | 'Vacation required'
  | 'Critical condition';

export interface PredictionInput {
  sleep: number;
  meetings: number;
  weekends: Weekends;
  stress: number;
}

export interface PredictionResult {
  prediction: BurnoutPrediction;
  path: string[];
}