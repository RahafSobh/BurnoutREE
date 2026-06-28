import type { TrainingRecord } from '../models/tree.js';
import type { PredictionInput } from '../algorithm/predict.js';

const VALID_TARGETS = [
  'Healthy',
  'Risk of burnout',
  'Vacation required',
  'Critical condition',
];

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isValidWeekends(value: unknown): value is 'Yes' | 'No' {
  return value === 'Yes' || value === 'No';
}

function isValidTarget(value: unknown): boolean {
  return typeof value === 'string' && VALID_TARGETS.includes(value);
}

export function validatePredictionInput(input: unknown): string | null {
  if (typeof input !== 'object' || input === null) {
    return 'Prediction input must be an object.';
  }

  const data = input as Partial<PredictionInput>;

  if (!isNumber(data.sleep) || data.sleep < 0 || data.sleep > 24) {
    return 'Sleep must be a number between 0 and 24.';
  }

  if (!isNumber(data.meetings) || data.meetings < 0 || data.meetings > 20) {
    return 'Meetings must be a number between 0 and 20.';
  }

  if (!isValidWeekends(data.weekends)) {
    return 'Weekends must be either Yes or No.';
  }

  if (!isNumber(data.stress) || data.stress < 1 || data.stress > 10) {
    return 'Stress must be a number between 1 and 10.';
  }

  return null;
}

export function validateTrainingRecords(records: unknown): string | null {
  if (!Array.isArray(records)) {
    return 'Training data must be an array.';
  }

  if (records.length < 2) {
    return 'Training data must contain at least 2 records.';
  }

  for (const [index, record] of records.entries()) {
    const error = validatePredictionInput(record);

    if (error) {
      return `Record ${index + 1}: ${error}`;
    }

    const data = record as Partial<TrainingRecord>;

    if (!isValidTarget(data.target)) {
      return `Record ${index + 1}: target must be a valid burnout class.`;
    }
  }

  return null;
}